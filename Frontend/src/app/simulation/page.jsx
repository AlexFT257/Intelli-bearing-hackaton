"use client"
import Image from "next/image";
import CardTable from "@/components/Cards/CardTable";
import CardAnalysis from "@/components/Cards/CardAnalysis";
// import CardState from "@/components/Cards/CardState";
import Chat from "@/components/Chat";
import CardBearing from "@/components/Cards/Cardbearing";
import CardRUL from "@/components/Cards/CardRUL";
// import { BearingRenderer } from "@/components/BearingRenderer";
import CardControls from "@/components/Cards/CardControls";

export default function Home() {
  return (
    <div className="flex h-full flex-col xl:flex-row  w-full m-2">
      {/* izquierda */}
      <div className="flex flex-col gap-4 w-full  xl:mx-2 my-4 ">
        {/* arriba */}
        <div className="flex w-full">
          {/* carta */}
          <CardTable />
        </div>
        {/* abajo */}
        <div className="grid grid-cols-2 grid-rows-2 w-full xl:flex lg:flex-row gap-4">
          {/* <CardAnalysis/> */}
          {/* <CardAnalysis/> */}
          {/* <CardState/> */}
          <div className="col-span-1 row-span-1 xl:block w-full xl:w-1/5">
          <CardBearing />
          </div>
          <div className="col-span-1 row-span-1 xl:block w-full xl:w-1/5">
          <CardControls />
          </div>
          <div className="col-span-2 row-span-2 xl:block w-full xl:w-3/5">
          <CardRUL />
          </div>
        </div>
      </div>
      {/* derecha /chat */}
      <div className="flex xl:w-2/5  h-full mx-2 my-4">
        <Chat />
      </div>
    </div>
  );
}
