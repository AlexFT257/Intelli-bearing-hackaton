// import { Inter } from "next/font/google";
"use client";
import { createContext } from "react";
import Image from "next/image";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const BearingContext = createContext(null);
export const TwinsContext = createContext(null);
export const ChatContext = createContext(null);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <BearingContext.Provider>
        <TwinsContext.Provider>
          <ChatContext.Provider>
            <body className="h-dvh overflow-hidden ">
              <main className="flex flex-col m-2 h-full">
                <header className="w-full flex-col m-2 h-full">
                  <div className="flex flex-row gap-4  align-middle items-center ">
                    <Image
                      src="/logo-intelli.png"
                      className="h-12"
                      width={48}
                      height={48}
                    />
                    <h1 className="scroll-m-20 text-white text-3xl font-bold tracking-tight">
                      Intelli-Bearing
                    </h1>
                  </div>
                  {/* container parte baja */}
                  <div className="flex flex-row h-full">
                    {/* container parte izq  */}
                    <div className="flex flex-col m-3 flex-1 h-full bg-black">
                      <a href="/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#ffffff"
                        >
                          <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
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
