// import { Inter } from "next/font/google";
"use client";
import { createContext, useState } from "react";
import Image from "next/image";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const BearingContext = createContext(null);
export const TwinsContext = createContext(null);
export const ChatContext = createContext(null);

export default function RootLayout({ children }) {
  const [bearing,setBearing] = useState(null)
  const [twins,setTwins] = useState(null)
  const [chat,setChat] = useState(null)

  return (
    <html lang="en">
      <BearingContext.Provider value={{bearing,setBearing}}>
        <TwinsContext.Provider value={{twins,setTwins}}>
          <ChatContext.Provider value={{chat,setChat}}>
            <body className="  ">
              <main className="flex flex-col m-2 h-full">
                <header className="w-full flex-col m-2 h-full">
                  <div className="flex flex-row gap-4  align-middle items-center ">
                    <Image
                      src="/logo-intelli.png"
                      className="h-12"
                      width={48}
                      height={48}
                      alt="Logo"
                    />
                    <h1 className="scroll-m-20 text-white text-4xl font-bold tracking-tight">
                      Intelli-Bearing
                    </h1>
                  </div>
                  {/* container parte baja */}
                  <div className="flex flex-row h-full">
                    {/* container parte izq  */}
                    <div className="flex flex-col m-2 flex-1 h-full my-6 gap-10 ">
                      <a href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="32px"
                          width="32px"
                          viewBox="0 -960 960 960"
                          fill="#ffffff"
                        >
                          <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
                        </svg>
                      </a>
                      <a href="/simulation">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="32px"
                          width="32px"
                          viewBox="0 -960 960 960"
                          fill="#ffffff"
                        >
                          <path d="m234-480-12-60q-12-5-22.5-10.5T178-564l-58 18-40-68 46-40q-2-13-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T222-820l12-60h80l12 60q12 5 22.5 10.5T370-796l58-18 40 68-46 40q2 13 2 26t-2 26l46 40-40 68-58-18q-11 8-21.5 13.5T326-540l-12 60h-80Zm40-120q33 0 56.5-23.5T354-680q0-33-23.5-56.5T274-760q-33 0-56.5 23.5T194-680q0 33 23.5 56.5T274-600ZM592-40l-18-84q-17-6-31.5-14.5T514-158l-80 26-56-96 64-56q-2-18-2-36t2-36l-64-56 56-96 80 26q14-11 28.5-19.5T574-516l18-84h112l18 84q17 6 31.5 14.5T782-482l80-26 56 96-64 56q2 18 2 36t-2 36l64 56-56 96-80-26q-14 11-28.5 19.5T722-124l-18 84H592Zm56-160q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
                        </svg>
                      </a>
                    </div>
                    {children}
                  </div>
                </header>
              </main>
            </body>
          </ChatContext.Provider>
        </TwinsContext.Provider>
      </BearingContext.Provider>
    </html>
  );
}
