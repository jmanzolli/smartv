// Minimal iCalendar (.ics) reader: single events, common repeat rules, exceptions and moved instances.
// Exposes window.Calendar.parse(text) and window.Calendar.between(events, from, to).

(function () {
  const DAY = 86400000;
  const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  function unescapeText(s) {
    return s.replace(/\\n/gi, ' ').replace(/\\([,;\\])/g, '$1').trim();
  }

  // Wall-clock time in an IANA zone → Date.
  function zoned(y, mo, d, h, mi, s, tz) {
    const guess = Date.UTC(y, mo, d, h, mi, s);
    try {
      const fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, hourCycle: 'h23',
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
      });
      const p = {};
      fmt.formatToParts(new Date(guess)).forEach((x) => { p[x.type] = x.value; });
      const seen = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
      return new Date(guess - (seen - guess));
    } catch (e) {
      return new Date(y, mo, d, h, mi, s);
    }
  }

  // Parse a DATE or DATE-TIME value into wall-clock parts plus how to read them.
  function parseStamp(value, params) {
    const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
    if (!m) return null;
    const parts = { y: +m[1], mo: +m[2] - 1, d: +m[3], h: +(m[4] || 0), mi: +(m[5] || 0), s: +(m[6] || 0) };
    if (!m[4] || params.VALUE === 'DATE') return { parts, kind: 'date' };
    if (m[7]) return { parts, kind: 'utc' };
    if (params.TZID) return { parts, kind: 'tz', tz: params.TZID.replace(/^"|"$/g, '') };
    return { parts, kind: 'local' };
  }

  function toDate(p, kind, tz) {
    if (kind === 'utc') return new Date(Date.UTC(p.y, p.mo, p.d, p.h, p.mi, p.s));
    if (kind === 'tz') return zoned(p.y, p.mo, p.d, p.h, p.mi, p.s, tz);
    return new Date(p.y, p.mo, p.d, p.h, p.mi, p.s);
  }

  function parseRule(value) {
    const rule = {};
    value.split(';').forEach((pair) => {
      const [k, v] = pair.split('=');
      rule[k] = v;
    });
    return {
      freq: rule.FREQ,
      interval: Math.max(1, +(rule.INTERVAL || 1)),
      count: rule.COUNT ? +rule.COUNT : null,
      until: rule.UNTIL ? parseStamp(rule.UNTIL, {}) : null,
      byday: rule.BYDAY ? rule.BYDAY.split(',') : null,
      bymonthday: rule.BYMONTHDAY ? rule.BYMONTHDAY.split(',').map(Number) : null,
      bymonth: rule.BYMONTH ? rule.BYMONTH.split(',').map(Number) : null,
    };
  }

  function parse(text) {
    const lines = text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
    const events = [];
    let ev = null;

    for (const line of lines) {
      if (line === 'BEGIN:VEVENT') { ev = { exdates: [] }; continue; }
      if (line === 'END:VEVENT') {
        if (ev && ev.start) events.push(ev);
        ev = null;
        continue;
      }
      if (!ev) continue;

      const m = line.match(/^([A-Z-]+)((?:;[^:]*)?):(.*)$/);
      if (!m) continue;
      const name = m[1];
      const value = m[3];
      const params = {};
      m[2].split(';').slice(1).forEach((p) => {
        const i = p.indexOf('=');
        params[p.slice(0, i)] = p.slice(i + 1);
      });

      if (name === 'SUMMARY') ev.title = unescapeText(value);
      else if (name === 'LOCATION') ev.location = unescapeText(value);
      else if (name === 'UID') ev.uid = value;
      else if (name === 'STATUS') ev.cancelled = value === 'CANCELLED';
      else if (name === 'RRULE') ev.rule = parseRule(value);
      else if (name === 'DTSTART') ev.start = parseStamp(value, params);
      else if (name === 'DTEND') ev.end = parseStamp(value, params);
      else if (name === 'RECURRENCE-ID') {
        const r = parseStamp(value, params);
        if (r) ev.recurrenceId = toDate(r.parts, r.kind, r.tz).getTime();
      } else if (name === 'EXDATE') {
        value.split(',').forEach((v) => {
          const r = parseStamp(v, params);
          if (r) ev.exdates.push(toDate(r.parts, r.kind, r.tz).getTime());
        });
      }
    }

    return events.filter((e) => e.start).map((e) => {
      const start = toDate(e.start.parts, e.start.kind, e.start.tz);
      const allDay = e.start.kind === 'date';
      let duration = allDay ? DAY : 0;
      if (e.end) duration = toDate(e.end.parts, e.end.kind, e.end.tz) - start;
      return {
        uid: e.uid, title: e.title || '', location: e.location || '', allDay, cancelled: !!e.cancelled,
        startInfo: e.start, start, duration, rule: e.rule || null,
        exdates: e.exdates, recurrenceId: e.recurrenceId || null,
      };
    });
  }

  // ---------- Repeat rules ----------

  const dayNumber = (y, mo, d) => Math.round(Date.UTC(y, mo, d) / DAY);

  function matchesByDay(rule, y, mo, d, weekday) {
    return rule.byday.some((code) => {
      const m = code.match(/^([+-]?\d+)?([A-Z]{2})$/);
      if (!m || WEEKDAYS.indexOf(m[2]) !== weekday) return false;
      if (!m[1]) return true;
      const n = +m[1];
      if (n > 0) return Math.ceil(d / 7) === n;
      const daysInMonth = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
      return Math.ceil((daysInMonth - d + 1) / 7) === -n;
    });
  }

  function matchesMonthDay(list, y, mo, d) {
    const daysInMonth = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
    return list.some((n) => (n > 0 ? n === d : daysInMonth + n + 1 === d));
  }

  // Does day (y, mo, d) carry an occurrence of the rule that starts on startParts?
  function occursOn(rule, sp, y, mo, d) {
    const startDay = dayNumber(sp.y, sp.mo, sp.d);
    const day = dayNumber(y, mo, d);
    if (day < startDay) return false;
    const weekday = new Date(Date.UTC(y, mo, d)).getUTCDay();
    const months = (y - sp.y) * 12 + (mo - sp.mo);

    if (rule.bymonth && rule.bymonth.indexOf(mo + 1) < 0) return false;

    switch (rule.freq) {
      case 'DAILY':
        if ((day - startDay) % rule.interval) return false;
        return rule.byday ? matchesByDay(rule, y, mo, d, weekday) : true;
      case 'WEEKLY': {
        const startWeekday = new Date(Date.UTC(sp.y, sp.mo, sp.d)).getUTCDay();
        const weekStart = startDay - ((startWeekday + 6) % 7);
        if (Math.floor((day - weekStart) / 7) % rule.interval) return false;
        return rule.byday ? matchesByDay(rule, y, mo, d, weekday) : weekday === startWeekday;
      }
      case 'MONTHLY':
        if (months % rule.interval) return false;
        if (rule.byday) return matchesByDay(rule, y, mo, d, weekday);
        if (rule.bymonthday) return matchesMonthDay(rule.bymonthday, y, mo, d);
        return d === sp.d;
      case 'YEARLY':
        if ((y - sp.y) % rule.interval) return false;
        if (rule.byday) return matchesByDay(rule, y, mo, d, weekday) && (rule.bymonth || mo === sp.mo);
        if (rule.bymonthday) return matchesMonthDay(rule.bymonthday, y, mo, d) && (rule.bymonth || mo === sp.mo);
        return mo === sp.mo && d === sp.d;
      default:
        return false;
    }
  }

  function expand(ev, from, to, moved) {
    const out = [];
    const info = ev.startInfo;
    const sp = info.parts;
    const rule = ev.rule;
    const until = rule.until ? toDate(rule.until.parts, rule.until.kind, rule.until.tz).getTime() : Infinity;

    // Without COUNT we can jump close to the window; with COUNT every occurrence since the start counts.
    let cursor = Date.UTC(sp.y, sp.mo, sp.d);
    if (rule.count === null) cursor = Math.max(cursor, from.getTime() - 2 * DAY - ev.duration);
    const stop = to.getTime() + DAY;
    let seen = 0;

    for (; cursor <= stop; cursor += DAY) {
      const c = new Date(cursor);
      const y = c.getUTCFullYear();
      const mo = c.getUTCMonth();
      const d = c.getUTCDate();
      if (!occursOn(rule, sp, y, mo, d)) continue;

      const start = toDate({ y, mo, d, h: sp.h, mi: sp.mi, s: sp.s }, info.kind, info.tz);
      if (start.getTime() > until) break;
      seen += 1;
      if (rule.count !== null && seen > rule.count) break;
      if (ev.exdates.indexOf(start.getTime()) >= 0) continue;
      if (moved[ev.uid] && moved[ev.uid].indexOf(start.getTime()) >= 0) continue;
      out.push({ title: ev.title, location: ev.location, allDay: ev.allDay, start, end: new Date(start.getTime() + ev.duration) });
    }
    return out;
  }

  // All occurrences overlapping [from, to), sorted by start.
  function between(events, from, to) {
    const moved = {};
    events.forEach((e) => {
      if (e.recurrenceId) (moved[e.uid] = moved[e.uid] || []).push(e.recurrenceId);
    });

    let list = [];
    events.forEach((e) => {
      if (e.rule && !e.recurrenceId) {
        if (!e.cancelled) list = list.concat(expand(e, from, to, moved));
      } else if (!e.cancelled) {
        list.push({ title: e.title, location: e.location, allDay: e.allDay, start: e.start, end: new Date(e.start.getTime() + e.duration) });
      }
    });

    return list
      .filter((o) => o.end > from && o.start < to)
      .sort((a, b) => a.start - b.start); // all-day events start at local midnight, so they lead their day
  }

  window.Calendar = { parse, between };
})();
