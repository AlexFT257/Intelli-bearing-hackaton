"use client"
import { BearingContext } from "@/app/layout";
import ApexCharts from "apexcharts";
import { useRef, useEffect, useContext, useState } from "react";
import dynamic from 'next/dynamic';

// const ApexCharts = dynamic(() => import('apexcharts'), { ssr: false });

function CardAnalysis()  {
  const [isClient, setIsClient] = useState(false)
  const { bearing } = useContext(BearingContext)
  const chartRef = useRef(null)

  const generateRandomArray = (length) => {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.random() * 12 - 6; // Genera números entre -6 y 6
      randomArray.push(randomNumber);
    }
    return randomArray;
  };

  useEffect(()=>{
    setIsClient(true)
  },[])

  //   TODO: cambiar cuando tenga el backend
  useEffect(()=>  {
    if (isClient && chartRef.current && typeof window !== "undefined") {
      let fakeX = generateRandomArray(20);
      let fakeY = generateRandomArray(20);
      // Configuración del gráfico
      const options = {
        chart: {
          type: "line",
          height: 250,
          width: "100%",
        },
        series: [
          {
            name: "Amplitud eje X",
            data: fakeX
          },
          {
            name: "Amplitud eje Y",
            data: fakeY
          },
        ],
        yaxis: {
          labels: {
            formatter: function (value) {
              return value.toFixed(2);
            }
          }
        },
        xaxis: {
          categories: Array.from({ length: 20 }, (_, i) => i + 1), // Categorías de X
        },
      };

      // Crear el gráfico
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        // Limpiar el gráfico al desmontar el componente
        chart.destroy();
      };
    }
  }, [bearing,isClient]);

  if(!isClient){
    return null; // placeholder for loading
  }


  return (
    <div className=" bg-gray-800 rounded-lg flex flex-col gap-2  p-4 h-fit ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">
          Analisis de Vibraciones
        </h1>
        <span className="text-gray-400">Grafico de las ultimas 24 horas</span>
      </div>

      <div ref={chartRef} />
    </div>
  );
};

export default CardAnalysis;
// export default dynamic(() => Promise.resolve(CardAnalysis), { ssr: false });

