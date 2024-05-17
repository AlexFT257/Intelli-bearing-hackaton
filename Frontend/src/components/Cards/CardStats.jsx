import ApexCharts from "apexcharts";
import { useRef,useEffect } from "react";

const CardStats = () => {
   const fakeStats = {
    rpm: 2460,
    temp:38,
    torque:1,
    fuerza:4000, 
    vidaUtil:5,// años
   }
   
  


  return (
    <div className=" w-2/5 bg-gray-800 rounded-lg flex flex-col gap-2  p-4 h-full  ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">
          Detalles
        </h1>
        <span className="text-gray-400">Ficha tecnica del rodamiento</span>
      </div>

      <div className="">
        <ul className="flex flex-col justify-evenly text-white gap-2 list-disc list-inside space-y-1 ps-5 mt-2 text-lg">
            <li><span className="font-bold text-xl">Revoluciones</span>: {fakeStats.rpm} rpm</li>
            <li><span className="font-bold text-xl">Temperatura:</span> {fakeStats.temp} °C</li>
            <li><span className="font-bold text-xl">Torque:</span> {fakeStats.torque} N/m</li>
            <li><span className="font-bold text-xl">Fuerza:</span> {fakeStats.fuerza} N</li>

        </ul>
      </div>

    </div>
  );
};

export default CardStats;
