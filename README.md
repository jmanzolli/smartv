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
| ☰ (Menu) | Abre e fecha as configurações |
| Voltar | Fecha as configurações; na tela inicial, volta ao Fire TV |

Nas configurações (engrenagem no canto ou botão ☰) você escolhe:

- **Idioma:** português, inglês, francês ou espanhol.
- **Formato da hora:** 24 h ou 12 h.
- **Cidade do clima:** Montréal por padrão.
- **Agenda:** cole o *endereço secreto no formato iCal* do Google Agenda. Ele fica em **Configurações → (sua agenda) → Integrar agenda**, no computador. Para colar com facilidade, use o teclado do app **Amazon Fire TV** no celular.
- **Fonte das manchetes:** g1, CBC News, Radio-Canada ou El País. Por padrão segue o idioma.
- **Fotos de fundo:** as fotos do dia do Bing das últimas duas semanas, trocadas a cada 2 minutos.
- **Abrir ao ligar a TV.**

## Limites do Fire OS

- **O botão Home sempre volta para a tela da Amazon.** O Fire OS não deixa outro app virar a tela inicial padrão. O ClaudeTV fica em primeiro lugar em *Seus apps*, e a opção *Abrir ao ligar a TV* tenta abri-lo depois que a TV liga. Nas versões mais novas do Fire OS essa abertura automática pode ser bloqueada.
- **Apps que não estão instalados aparecem com a etiqueta "Instalar".** Com OK, a Appstore abre na página do app.

## Mudar os apps da fileira

Os apps ficam na lista `APPS`, no início de [`web/tv.js`](web/tv.js). Cada um tem nome, cor e os nomes de pacote conhecidos. Se nenhum pacote bater, o app é procurado pelo nome que aparece na TV.

## Como o projeto é organizado

```
web/        A tela (HTML, CSS e JS), que também abre num navegador comum
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
