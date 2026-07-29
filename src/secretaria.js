import {GoogleGenAI} from '@google/genai';
import { allDefinitions as calendarDefinitions} from './tools/calendar.js';
import { allDefinitions as emailDefinitions} from './tools/email.js';
import readline from "readline";
import { resolve } from 'dns';


const allDefinitions = calendarDefinitions.concat(emailDefinitions);
const allDeclarations = allDefinitions.map(def => def.declaration);
const allFunctions = Object.fromEntries(allDefinitions.map(def => [def.declaration.name, def.function]));

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEN_AI_API_KEY });

const contents = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

while(true) {
    const query = await new Promise(resolve => {
        rl.question("Você: ", resolve)
    });

    contents.push({
        role: "user",
        parts: [{ text: query }]
    });

    var response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: contents,
        config: {
            tools: [
                {
                    functionDeclarations: allDeclarations
                }
            ]
        }
    });

    while(response.functionCalls) {
        const functionCall = response.candidates[0].content.parts[0].functionCall;

        const functionToExecute = functionCall.name;
        const functionParameters = functionCall.args;

        console.log(`**Chamando função ${functionToExecute} com argumentos ${functionParameters}**`)

        const fn = allFunctions[functionToExecute];

        const result = fn(functionParameters);

        console.log(`**Resultado da função ${result}**`)

        const functionResponse = {
            role: "user",
            parts: [{
                functionResponse: {
                    name: functionToExecute,
                    response: {result: result}
                }
            }],
        };
        contents.push(functionResponse);

        response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: contents,
            config: {
                tools: [
                    {
                        functionDeclarations: allDeclarations
                    }
                ]
            }
        });
    }

    console.log("IA: ", response.candidates[0].content.parts[0].text);
}

