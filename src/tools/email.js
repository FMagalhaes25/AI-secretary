// Consultar emails
// Enviar emails

const inbox = [
  {
    sender: "GitHub",
    message: "Your pull request #42 has been merged into the main branch."
  },
  {
    sender: "Amazon",
    message: "Your order has been shipped and is expected to arrive tomorrow."
  },
  {
    sender: "Spotify",
    message: "Your Premium subscription has been successfully renewed."
  },
  {
    sender: "LinkedIn",
    message: "Maria Silva viewed your profile."
  },
  {
    sender: "Google",
    message: "A new sign-in to your Google Account was detected."
  },
  {
    sender: "Netflix",
    message: "New movies and series have just been added to your watchlist."
  },
  {
    sender: "Banco Inter",
    message: "A PIX transfer of R$ 125,00 has been received."
  },
  {
    sender: "Steam",
    message: "A game on your wishlist is now on sale."
  },
  {
    sender: "Notion",
    message: "João mentioned you in the project roadmap."
  },
  {
    sender: "Discord",
    message: "You have 3 unread messages in the #general channel."
  }
];


const getEmails = {
    function: () => {
        return inbox;
    },
    declaration: {
        name: "getEmails",
        description: "Retorna todo os emails na caixa de entrada"
    }
}

const sendEmail = {
    function: ({ contact, message }) => {
        console.log(`**Email enviado para ${contact}: ${message}`)
    },
    declaration: {
        name: "sendEmail",
        description: "Envia um email para um contato",
        parameters: {
            type: "OBJECT",
            properties: {
                contact: {
                    type: "STRING",
                    description: "O nome do contato para enviar a mensagem"
                },
                message: {
                    type: "STRING",
                    description: "Mensagem que será enviada no corpo do email"
                }
            },
            required: ["contact", "message"]
        }
    }
}

const allFunctions = [getEmails, sendEmail]

export{allFunctions}