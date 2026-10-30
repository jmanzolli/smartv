# ClaudeTV

Tela inicial pessoal para Fire TV. Mostra relógio, clima, agenda do dia, manchetes e fotos de fundo, além dos atalhos para os apps. Tudo é navegado pelo controle remoto e aparece em português, inglês, francês ou espanhol.

## Instalar na TV

Só é preciso fazer uma vez:

1. Na TV, abra **Configurações → Minha Fire TV → Opções do desenvolvedor**.
   Se esse menu não existir, entre em **Minha Fire TV → Sobre** e aperte OK 7 vezes sobre o nome do aparelho.
2. Instale o app **Downloader** (da AFTVnews) pela Amazon Appstore.
3. Em **Opções do desenvolvedor → Instalar apps desconhecidos**, ative o **Downloader**.
4. No Downloader, digite o endereço abaixo e confirme **Instalar**:

   ```
   github.com/jmanzolli/smartv/releases/latest/download/smartv.apk
   ```

5. Abra **ClaudeTV** em **Seus apps**. Para deixá-lo em primeiro lugar, selecione o app, aperte o botão ☰ do controle e escolha **Mover para a frente**.

Para atualizar, repita o passo 4. As configurações são mantidas.

## Usar

A tela inicial mostra só o que vale olhar de relance: relógio, clima, o próximo compromisso, o próximo lembrete e a fileira de apps. O resto fica a um botão de distância.

| Botão do controle | O que faz |
|---|---|
| Setas | Movem o destaque. **↓** a partir dos apps abre o painel **Hoje**; **↑** volta |
| OK | Abre o app ou ativa a opção |
| ☰ (Menu) sobre um app | Abrir, Mover, Remover da fileira ou Adicionar app |
| ☰ sobre um lembrete | Marcar como feito ou Apagar |
| ☰ em outro lugar | Abre e fecha as configurações |
| OK segurado sobre um app | O mesmo que ☰ sobre ele |
| Voltar | Fecha a tela aberta; na tela inicial, volta ao Fire TV |

- **Painel Hoje:** agenda de hoje e amanhã (com horário de término e local), lembretes e notícias. **Próximos 7 dias** abre a semana com uma coluna por dia. Sobre a fonte das notícias, ← → troca entre g1, CBC News, Radio-Canada e El País.
- **Mover um app:** ☰ → **Mover**, depois ← → e OK para soltar. O bloco **+** no fim da fileira adiciona qualquer app instalado na TV. Antes de você mexer na fileira, os apps padrão que não estão instalados ficam de fora.
- **Lembretes:** **Nova nota** cria uma nota com aviso opcional (em 30 min, em 1 hora, hoje às 20:00, amanhã às 8:00), ou com o horário escrito no texto. Na hora marcada, um aviso aparece no meio da tela com **Feito** e **Adiar 10 min**.
- **Proteção de tela:** depois de 5 minutos sem mexer no controle, fica só a foto com o relógio, a temperatura e o próximo compromisso. Qualquer botão volta. Depois de uma hora assim, a TV volta a poder dormir ou mostrar a proteção de tela dela.
- **Modo noturno:** das 22:00 às 7:00 o céu escurece, a foto sai e os apps perdem cor.

### Pelo celular

No painel **Hoje**, na tela **Lembretes** e nas configurações há um QR code e um endereço do tipo `ntfy.sh/claudetv-xxxxxxxx`, criado só para a sua TV. Abra esse endereço no celular (ou no app **ntfy**) e mande uma mensagem:

- **Uma nota:** qualquer texto vira nota em até 30 segundos. Um horário no texto vira aviso, por exemplo `dentista amanhã 9h` ou `ligar pra mãe às 19:30`.
- **A agenda:** `agenda: https://calendar.google.com/...basic.ics` conecta o endereço secreto iCal sem usar o teclado da TV.
- **A cidade do clima:** `cidade: Lisboa`.

O serviço [ntfy.sh](https://ntfy.sh) é gratuito e não pede conta, mas é de terceiros: as mensagens passam por ele e ficam guardadas por umas 12 horas. Quem souber o endereço pode mandar mensagens para a TV. Se a TV ficar desligada mais de 12 horas, as mensagens desse período se perdem. Dá para desligar em **Configurações → Notas pelo celular**.

### Configurações

Engrenagem no canto ou ☰ na tela inicial. Cada linha mostra o valor atual; OK passa para o próximo valor, e Cidade e Agenda abrem um campo para digitar.

- **Geral:** idioma (português, inglês, francês ou espanhol), formato da hora (24 h ou 12 h) e margem da tela, para TVs que cortam as bordas.
- **Informações:** cidade do clima (Montréal por padrão), agenda (o *endereço secreto no formato iCal* do Google Agenda, em **Configurações → (sua agenda) → Integrar agenda**, no computador) e fonte das notícias.
- **Tela:** fotos de fundo (as do Bing das últimas duas semanas, trocadas a cada 2 minutos), modo noturno, notas pelo celular e abrir ao ligar a TV.

## Limites do Fire OS

- **O botão Home sempre volta para a tela da Amazon.** O Fire OS não deixa outro app virar a tela inicial padrão. O ClaudeTV fica em primeiro lugar em *Seus apps*, e a opção *Abrir ao ligar a TV* tenta abri-lo depois que a TV liga. Nas versões mais novas do Fire OS essa abertura automática pode ser bloqueada.
- **Apps que não estão instalados aparecem com a etiqueta "Instalar".** Com OK, a Appstore abre na página do app.

## Apps que vêm na fileira

A fileira inicial é a lista `APPS`, no início de [`web/tv.js`](web/tv.js). Cada um tem nome, cor e os nomes de pacote conhecidos. Se nenhum pacote bater, o app é procurado pelo nome que aparece na TV. Depois que você organiza a fileira pelo controle, vale a sua ordem.

## Como o projeto é organizado

```
web/        A tela (HTML, CSS e JS), que também abre num navegador comum
web/vendor/ qrcode.js, de Kazuhiko Arase (licença MIT), para o QR code das notas
android/    App Android que mostra web/ em tela cheia e faz a ponte com a TV
.github/    Compila o APK e publica uma release a cada push no main
```

A ponte nativa (`window.TVNative`) faz o que uma página web não consegue fazer sozinha: listar e abrir os apps instalados e buscar a agenda, as manchetes e as fotos sem esbarrar nas restrições de CORS dos navegadores.

Para ver a tela no computador (sem a agenda, as manchetes e as fotos, que dependem da ponte):

```bash
cd web && python3 -m http.server 8000
```

Depois abra `http://localhost:8000` e use as setas do teclado.

### Sobre a chave de assinatura

`android/app/smartv.keystore` está no repositório de propósito. Assim, cada APK novo instala por cima do anterior sem apagar as configurações. A contrapartida: qualquer pessoa poderia assinar um APK com a mesma chave. Isso só importa se alguém conseguir instalar algo na sua TV, então para um app pessoal instalado por você o risco é baixo.
