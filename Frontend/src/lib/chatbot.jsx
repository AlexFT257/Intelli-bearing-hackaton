import OpenAI from "openai";

// const openai = new OpenAI({
// 	apiKey: process.env.NEXT_PUBLIC_SECRET_OPENAI_API_KEY,
// 	organization: process.env.NEXT_PUBLIC_ORGANIZATION,
// 	dangerouslyAllowBrowser:true
// });

// export function chatBotApi(
// 	userMsg,
// 	historial
// ) {
// 	return new Promise(async (resolve, reject) => {

// 		let messages = [];
// 		let systemContent = `Eres una IA experta en rodamientos de la industria minera. Tu misión es responder las preguntas que te hagan sobre este tema de forma clara y concisa.`;

// 		if (historial.length > 0) {
// 			//console.log(historial);
// 			systemContent = systemContent + '\n\nAhora te daré los registros de la conversación que has tenido a continuación: \n\n';

// 			let maxChats = 6;
// 			let cantMsg = historial.length;
// 			let firstNewMsg = 0;
// 			// Elimina de la lista los mensajes más viejos
// 			if (cantMsg > maxChats) {
// 				firstNewMsg = cantMsg - maxChats;
// 			}

// 			// Formatea el contexto como mensaje
// 			for (let index = firstNewMsg; index < historial.length; index++) {
// 				systemContent = systemContent + historial[index].rol + ": " + historial[index].mensaje + "\n";
// 			}
// 			systemContent = systemContent + '\nEste es el nuevo mensaje que debes responder: \n';
// 		}
// 		else{
// 			systemContent = systemContent + '\nEsta es tu primera pregunta: \n';
// 		}

// 		//Añade información del conexto
// 		messages.push({
// 			role: 'system',
// 			content: systemContent
// 		});

// 		let prompt = userMsg;

// 		//Añade información del msg del usuario
// 		messages.push({
// 			role: 'user',
// 			content: prompt
// 		});

// 		console.log("Enviado al bot " + messages[0].content + '\n' + messages[1].content);

// 		try {
			
// 			let response = await openai.chat.completions.create({
// 				model: 'gpt-3.5-turbo',
// 				messages: messages,
// 				temperature: 0.5,
// 				max_tokens: 700
// 			});
// 			console.log("Dentro de la f de chat", response);

// 			if (response.choices[0].message.content.length > 0) {
// 				resolve(response.choices[0].message.content);
// 			} else {
// 				resolve(null);
// 			}

// 		} catch (error) {
// 			if (error.response) {
// 				console.log(error.response.status);
// 				console.log(error.response.data);
// 			}else{
// 				console.log(error.message);
// 			}
// 		}
// 	});
// }

export function chatBotApi(
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

		resolve("HHola");

	})
}
