import { useState } from "react";

const Chat = () => {
    const [historial,setHistorial] = useState([])

  const colorConfButton = useState(false);
  return (
    <div className=" w-full h-5/6 bg-gray-800 rounded-lg flex flex-col gap-2  p-4 ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">Chat</h1>
      </div>

      <div className="flex overflow-scroll h-[700px] justify-between flex-col gap-4">
        {/* chat container */}
        <div>
          {/* ia */}
          <div className="flex items-start gap-2.5">
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
                <p className="text-sm font-normal text-wrap py-2.5 text-white">
                  {message.mensaje}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* message */}
        <form className="relative">
          <textarea
            name="chat"
            id="chat"
            rows={3}
            maxLength={100}
            placeholder="Envia un mensaje..."
            className="block resize-none p-2 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          ></textarea>

          <button
            className={`absolute border-gray-500 right-4 bottom-4 rounded-lg border ${
              colorConfButton ? " bg-gray-600 " : "  bg-green-600 "
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
    </div>
  );
};

export default Chat;

// /*
// return (
//     <div className="w-full mr-6   p-4 md:p-6 rounded-lg shadow flex flex-col justify-between bg-gray-800">
//       <div className="flex overflow-scroll h-[650px]  flex-col gap-4">
//         <h1 className="text-4xl font-extrabold pb-2 text-white">Chat</h1>
//         {/* ai */}
//         <div className="flex items-start gap-2.5">
//           <div className="flex flex-col w-full leading-1.5 p-4 text-white rounded-e-xl rounded-es-xl bg-gray-700">
//             <div className="flex items-center space-x-2 rtl:space-x-reverse">
//               <span className="text-lg font-semibold text-white">IA</span>
//             </div>
//             <p className="text-sm font-normal py-2.5 text-white">
//               Hola, no dudes en preguntarme si tienes dudas
//             </p>
//           </div>
//         </div>

//         {/* Renderizar cada mensaje en el historial */}
//         {historial.map((message, index) => (
//           <div
//             key={index}cd
//             className={`flex items-start gap-2.5 mb-2 ${
//               message.rol === "Usuario" ? "justify-end" : ""
//             }`}
//           >
//             <div
//               className={`flex flex-col w-full leading-1.5 p-4 text-white  ${
//                 message.rol === "Usuario" ? "bg-blue-900 rounded-tl-xl rounded-b-xl " : "bg-gray-700 rounded-b-xl rounded-tr-xl "
//               }`}
//             >
//               <div className="flex items-center space-x-2 rtl:space-x-reverse">
//                 <span className="text-lg font-semibold text-white">
//                   {message.rol}
//                 </span>
//               </div>
//               <p className="text-sm font-normal text-wrap py-2.5 text-white">
//                 {message.mensaje}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <form className="relative">
//         <textarea
//           id="message"

//           rows="3"
//           value={textValue}
//           className="block resize-none p-2 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
//           placeholder="Envía un mensaje..."
//           maxLength="100"
//           onChange={changeColorButton}
//           onKeyDown={enterMsg}
//         ></textarea>

//         <button
//           type="button"
//           onClick={sendButton}
//           className={`absolute right-4 bottom-4 rounded-lg border ${
//             colorConfButton ? "bg-green-600 " : "bg-gray"
//           } border-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
//         >
//           ▶
//         </button>
//       </form>
//     </div>
//   );
// };

// */
