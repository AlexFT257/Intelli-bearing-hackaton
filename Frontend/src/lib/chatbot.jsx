import OpenAI from "openai";

//const openai = new OpenAI();

export function testingBot(
	userMsg,
	historial
) {
	return new Promise(async (resolve, reject) => {

		let messages = [];
		let systemContent = `[Contexto]`;

		if (historial.length > 0) {
			//console.log(historial);
			systemContent = systemContent + '\n\nAhora te daré los registros de la conversación que has tenido a continuación: \n\n';

			let maxChats = 6;
			let cantMsg = historial.length;
			let firstNewMsg = 0;
			// Elimina de la lista los mensajes más viejos
			if (cantMsg > maxChats) {
				firstNewMsg = cantMsg - maxChats;
			}

			// Formatea el contexto como mensaje
			for (let index = firstNewMsg; index < historial.length; index++) {
				systemContent = systemContent + historial[index].rol + ": " + historial[index].mensaje + "\n";
			}
			systemContent = systemContent + '\nEste es el nuevo mensaje que debes responder: \n';
		}

		//Añade información del conexto
		messages.push({
			role: 'system',
			content: systemContent
		});

		let prompt = userMsg;

		//Añade información del msg del usuario
		messages.push({
			role: 'user',
			content: prompt
		});

		console.log("Enviado al bot " + messages[0].content + '\n' + messages[1].content);

		resolve("Te he respondido");

	})
}
// export function testingBot(
//     prompt,
//     historial
// ){
//     return new Promise (async (resolve, reject) => {

//         let messages = [];
//         let systemContent = '[Contexto inicial]';

//         systemContent = systemContent + '\n Probando';

//         messages.push({
//             role: 'user',
//             content: systemContent
//         });

//         console.log(messages);
//         console.log(messages.content);

//         resolve("Hola");
//     })
// }
