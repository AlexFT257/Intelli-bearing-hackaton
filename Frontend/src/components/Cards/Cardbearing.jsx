"use client"
import { BearingRenderer } from "../BearingRenderer";

const CardBearing = () => {
  return (
    <div className=" bg-gray-800 rounded-lg flex flex-col gap-2  p-4 h-fit ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">
          Rodamiento
        </h1>
        <span className="text-gray-400">Representacion visual</span>
      </div>

      <div className=" ">
        <BearingRenderer/>
      </div>
    </div>
  );
};



export default CardBearing