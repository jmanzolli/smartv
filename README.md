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

| Botão do controle | O que faz |
|---|---|
| Setas | Movem o destaque |
| OK | Abre o app ou ativa a opção |
| OK segurado sobre um app | Abre **Organizar apps** |
| Esquerda/direita sobre a fonte das manchetes | Troca a fonte |
| ☰ (Menu) | Abre e fecha as configurações |
| Voltar | Fecha a tela aberta; na tela inicial, volta ao Fire TV |

Na tela inicial:

- **Agenda:** os 3 próximos eventos. **Ver agenda completa** mostra os próximos 7 dias, com horário de término e local.
- **Clima:** temperatura, sensação térmica e previsão de 3 dias.
- **Fileira de apps:** o bloco **+** no fim (ou OK segurado sobre um app) abre **Organizar apps**, onde você muda a ordem, remove apps e adiciona qualquer app instalado na TV.
- **Proteção de tela:** depois de 5 minutos sem mexer no controle, fica só a foto com o relógio, o clima e o próximo evento. Qualquer botão volta. Depois de uma hora assim, a TV volta a poder dormir ou mostrar a proteção de tela dela.
- **Modo noturno:** das 22:00 às 7:00 a tela escurece, a foto sai e as manchetes somem.
- **Lembretes:** embaixo da agenda ficam as próximas notas. **+ Nova** cria uma nota com aviso opcional (em 30 min, em 1 hora, hoje às 20:00, amanhã às 8:00). Na hora marcada, um aviso aparece na tela com **Feito** e **Adiar 10 min**.

### Notas pelo celular

Na tela **Lembretes** há um QR code e um endereço do tipo `ntfy.sh/claudetv-xxxxxxxx`, criado só para a sua TV. Abra esse endereço no celular (ou no app **ntfy**) e mande uma mensagem: em até 30 segundos ela vira uma nota na TV. Um horário no texto vira aviso, por exemplo `dentista amanhã 9h` ou `ligar pra mãe às 19:30`.

O serviço [ntfy.sh](https://ntfy.sh) é gratuito e não pede conta, mas é de terceiros: as mensagens passam por ele e ficam guardadas por umas 12 horas. Quem souber o endereço pode mandar notas para a TV. Se a TV ficar desligada mais de 12 horas, as mensagens desse período se perdem. Dá para desligar em **Configurações → Notas pelo celular**.

Nas configurações (engrenagem no canto ou botão ☰) você escolhe:

- **Idioma:** português, inglês, francês ou espanhol.
- **Formato da hora:** 24 h ou 12 h.
- **Cidade do clima:** Montréal por padrão.
- **Agenda:** cole o *endereço secreto no formato iCal* do Google Agenda. Ele fica em **Configurações → (sua agenda) → Integrar agenda**, no computador. Para colar com facilidade, use o teclado do app **Amazon Fire TV** no celular.
- **Fonte das manchetes:** g1, CBC News, Radio-Canada ou El País. Por padrão segue o idioma.
- **Fotos de fundo:** as fotos do dia do Bing das últimas duas semanas, trocadas a cada 2 minutos.
- **Margem da tela:** para TVs que cortam as bordas.
- **Notas pelo celular:** ligado ou desligado, com o endereço da sua TV.
- **Modo noturno:** ligado ou desligado.
- **Abrir ao ligar a TV.**

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
