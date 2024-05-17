import { useState } from "react";
import { chatBotApi } from "@/lib/chatbot";

const Chat = () => {

  const [historial,setHistorial] = useState([])
  const [colorConfButton, setColorButton] = useState(false);
  const [textValue, setTextValue] = useState("");
  
  const changeColorButton = (event) => {
    let inputValue = event.target.value
    setTextValue( inputValue);
    
    setColorButton(inputValue.length > 0);
  };

  const sendButton = async () => {
    let prompt = textValue;
    if (prompt.length>0) {
      let respuesta = await chatBotApi(prompt, historial);
      handleHistorial(prompt, respuesta);
      setTextValue("");
    }
}

  const enterMsg = (event) => {
    if (textValue.length>0) {
      if (event.keyCode === 13 && !event.shiftKey) {
        sendButton();
        //evita enters extra
        event.preventDefault();
      }
    }
    
  };

  const handleHistorial = (userMsg, botMsg) => {
    
    // Maximo de conversaciones almacenadas
    let maxChats = 100;

    if (historial.length >= maxChats) {
      setHistorial((prevLista) => prevLista.slice(2));
    }

    const newUserMsg = { rol: "Usuario", mensaje: userMsg };
    const newBotMsg = { rol: "Asistente", mensaje: botMsg };
    setHistorial((prevLista) => [...prevLista, newUserMsg, newBotMsg]);
  };

  return (
    <div className=" w-full h-5/6 bg-gray-800 rounded-lg flex flex-col gap-2  p-4 ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">Chat</h1>
      </div>

      <div className="flex overflow-scroll h-[700px] justify-between flex-col gap-4">
        {/* chat container */}
        <div>
          {/* ia */}
          <div className="flex items-start gap-2.5 mb-2">
            <div className="flex flex-col w-full leading-1.5 p-4 text-white rounded-e-xl rounded-es-xl bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-lg font-semibold text-white">IA</span>
              </div>
              <p className="text-sm font-normal py-2.5 text-white">
                Hola, no dudes en preguntarme si tienes dudas
              </p>
            </div>
          </div>

          {/* Renderizar cada mensaje en el historial */}
          {historial.map((message, index) => (
            <div
              key={index}
              cd
              className={`flex items-start gap-2.5 mb-2 ${
                message.rol === "Usuario" ? "justify-end" : ""
              }`}
            >
              <div
                className={`flex flex-col w-full leading-1.5 p-4 text-white  ${
                  message.rol === "Usuario"
                    ? "bg-blue-900 rounded-tl-xl rounded-b-xl "
                    : "bg-gray-700 rounded-b-xl rounded-tr-xl "
                }`}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-lg font-semibold text-white">
                    {message.rol}
                  </span>
                </div>
                <p className="text-sm font-normal break-words text-wrap py-2.5 text-white">
                  {message.mensaje}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
        {/* message */}
        <form className="relative">
          <textarea
            name="chat"
            id="chat"
            value={textValue}
            rows={3}
            maxLength={50}
            onChange={changeColorButton}
            onKeyDown={enterMsg}
            placeholder="Envia un mensaje..."
            className="block resize-none p-2 w-full text-sm focus:outline-none rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          ></textarea>

          <button
          type="button"
          onClick={sendButton}
            className={`absolute border-gray-500 right-4 bottom-4 rounded-lg border ${
              colorConfButton ? " bg-green-600 " : "  bg-gray-600 "
            } text-white py-2 px-4 rounded  focus:outline-none focus:shadow-outline`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
            </svg>
          </button>
        </form>
    </div>
  );
};

export default Chat;


// //Funciones de debug
// const showHistorial = () => {
//   let historialCompleto = "";
//   for (let index = 0; index < historial.length; index++) {
//     historialCompleto = historialCompleto + historial[index].rol + ": " + historial[index].mensaje + "\n";
//   }
//   alert(
//     "Tamaño del historial " + historial.length + "\n" + historialCompleto
//   );
// };