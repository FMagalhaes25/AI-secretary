# SecretarIA

SecretarIA é um assistente pessoal em linha de comando feito em Node.js que conversa com o Gemini e consegue acionar ferramentas de calendário e e-mail durante a interação.

## Funcionalidades

- Conversa em tempo real via terminal
- Integração com a API do Gemini
- Leitura de eventos do calendário
- Agendamento e remarcação de compromissos
- Consulta de caixa de entrada
- Envio de e-mails
- Dados mockados!

## Requisitos

- Node.js 14 ou superior
- npm 6 ou superior
- Uma chave de API do Google Gemini

## Instalação

```bash
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com a sua chave:

```env
GOOGLE_GEN_AI_API_KEY=sua_chave_aqui
```

## Como executar

```bash
npm run dev
```

Depois disso, basta digitar suas mensagens no terminal. O assistente vai responder e, quando necessário, chamar as funções disponíveis de calendário e e-mail.

## Estrutura do projeto

```text
src/
  secretaria.js
  tools/
    calendar.js
    email.js
```

## Ferramentas disponíveis

### Calendário

- Consultar a data atual
- Buscar eventos de um dia específico
- Criar novos eventos
- Remarcar compromissos existentes

### E-mail

- Listar mensagens recebidas
- Enviar e-mails para contatos

## Exemplo de uso

```text
Você: Veja meus eventos de hoje
IA: ...
```

## Observações

- O projeto usa `gemini-2.5-flash-lite` como modelo principal.
- As respostas podem acionar funções automaticamente quando a IA identificar a necessidade.

## Licença

AGPL-3.0
