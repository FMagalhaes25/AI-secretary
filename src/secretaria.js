import {GoogleGenAI} from '@google/genai';
import { allFunctions as calendarFunctions} from './tools/calendar.js';
import { allFunctions as emailFunctions} from './tools/email.js';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

const allFunctions = calendarFunctions.concat(emailFunctions);

const contents = [
    {
        role: "user",
        parts: [{ text: "Marque um evento novo para o dia 31/12/2036, chamado Casamento com a Manu às 22h" }]
    }
];

var response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
        tools: [
            {
                functionDeclarations: allFunctions
            }
        ]
    }
});

console.log(response.candidates[0].content.parts[0]);