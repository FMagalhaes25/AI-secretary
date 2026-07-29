// Consultar data
// Consultar calendário
// Agendar novo compromisso
// Remarcar compromisso

const calendar = {
    "2026-07-27": [
        {
        "title": "Reunião de planejamento",
        "time": "09:30",
        "attendees": [
            "Ana",
            "Carlos",
            "Felipe"
        ]
        }
    ],
    "2026-07-28": [
        {
        "title": "Revisão de sprint",
        "time": "15:00",
        "attendees": [
            "Marina",
            "João"
        ]
        }
    ],
    "2026-07-29": [
        {
        "title": "Almoço com cliente",
        "time": "12:30"
        },
        {
        "title": "Reunião de alinhamento",
        "time": "15:30",
        "attendees": [
            "Equipe de Produto",
            "Equipe de Desenvolvimento"
        ]
        }
    ],
    "2026-07-30": [
        {
        "title": "Workshop de UX",
        "time": "10:00",
        "attendees": [
            "Lucas",
            "Patrícia",
            "Rafael",
            "Bianca"
        ]
        }
    ],
    "2026-07-31": [
        {
        "title": "Apresentação do projeto",
        "time": "16:00",
        "attendees": [
            "Equipe A",
            "Cliente"
        ]
        }
    ],
    "2026-08-01": [
        {
        "title": "Treinamento interno",
        "time": "14:00"
        }
    ],
    "2026-08-02": [
        {
        "title": "Happy Hour",
        "time": "18:30",
        "attendees": [
            "Equipe de Desenvolvimento",
            "Equipe de Produto"
        ]
        }
    ]
}

const getTodayDate = {
    function: () => {
        return "2026/07/29";
    },
    declaration: {
        name: "getTodayDate", 
        description: "Retorna a data de hoje no formato yyyy-mm-dd"
    }
}


const getEvents = {
    function: ({ date }) => {
        return calendar[date] ?? [];
    },
    declaration: {
        name: "getEvents",
        description: "Retorna os eventos do calendário para um determinado dia",
        parameters: {
            type: "OBJECT",
            properties: {
                date: {
                    type: "STRING",
                    description: "A data para qual queremos retornar os eventos, no formato yyyy-mm-dd"
                }
            },
            required: ["date"]
        }
    }
}

const scheduleEvents = {
    function: ({ title, date, time, attendees }) => {
        const eventList = calendar[date] ?? [];
        eventList.push({
            title: title,
            time: time,
            attendees: attendees ?? []
        })

        calendar[date] = eventList

        return "Evento adicionado com sucesso!";
    },
    declaration: {
        name: "scheduleEvent",
        description: "Marca um novo evento na agenda",
        parameters: {
            type: "OBJECT",
            properties: {
                title: {
                    type: "STRING",
                    description: "O título do evento"
                },
                date: {
                    type: "STRING",
                    description: "A data do evento, no formato yyyy-mm-dd"
                },
                time: {
                    type: "STRING",
                    description: "A hora do evento, no formato HH:MM"
                },
                attendees: {
                    type: "ARRAY",
                    items: { type : "String" },
                    description: "Lista de nomes dos convidados para o evento"
                }
            },
            required: ["title", "date", "time"]
        }
    }
}

const reScheduleEvents = {
    function: ({ title, date, newTime }) => {
        const eventList = calendar[date] ?? [];
        
        if (eventList === null) {
            return "Evento não encontrado";
        }

        const eventIndex = eventList.findIndex(obj => obj.title === title);

        calendar[date][eventIndex].time = newTime;

        return "Evento alterado com sucesso!";
    },
    declaration: {
        name: "reScheduleEvent",
        description: "Remarca um evento na agenda para um novo horário",
        parameters: {
            type: "OBJECT",
            properties: {
                title: {
                    type: "STRING",
                    description: "O título do evento para remarcar"
                },
                date: {
                    type: "STRING",
                    description: "A data do evento, no formato yyyy-mm-dd"
                },
                newTime: {
                    type: "STRING",
                    description: "A nova hora do evento, no formato HH:MM"
                }
            },
            required: ["title", "date", "newTime"]
        }
    }
}

const allFunctions = [getTodayDate, getEvents, scheduleEvents, reScheduleEvents]

export{allFunctions}