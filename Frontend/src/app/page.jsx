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
    <div className="flex h-full  w-full m-2">
      {/* izquierda */}
      <div className="flex flex-col gap-4 w-full mx-2 my-4">
        {/* arriba */}
        <div className="flex w-full gap-4">
          {/* carta */}
          <CardTable/>
          {/* <CardStats/> */}
        </div>
        {/* abajo */}
        <div className="flex flex-row gap-4">
          <CardAnalysis/>
          {/* <CardAnalysis/> */}
          <CardState/>
        </div>
      </div>
      {/* derecha /chat */}
      <div className="flex w-2/5  h-full mx-2 my-4">
        <Chat/>
      </div>
    </div>
  );
}
