"use client"
import dynamic from 'next/dynamic';
import Image from "next/image";
import CardTable from "@/components/Cards/CardTable";
import CardAnalysis from "@/components/Cards/CardAnalysis";
import CardState from "@/components/Cards/CardState";
import Chat from "@/components/Chat";
// import CardStats from "@/components/Cards/CardStats";

export default function Home() {
  return (
    <div className="flex h-full flex-col xl:flex-row  w-full m-2">
      {/* izquierda */}
      <div className="flex flex-col gap-4 w-full  xl:mx-2 my-4 ">
        {/* arriba */}
        <div className="flex w-full">
          {/* carta */}
          <CardTable/>
          {/* <CardStats/> */}
        </div>
        {/* abajo */}
        <div className="grid grid-cols-2 grid-rows-1 w-full xl:flex lg:flex-row gap-4">
        <div className="col-span-1  w-full ">
          <CardAnalysis/>
          </div>
          
          {/* <CardAnalysis/> */}
          <div className="col-span-1 col-start-2  w-full ">
          <CardState/>
          </div>
        </div>
      </div>
      {/* derecha /chat */}
      <div className="flex xl:w-2/5  h-full mx-2 my-4">
        <Chat/>
      </div>
    </div>
  );
}
