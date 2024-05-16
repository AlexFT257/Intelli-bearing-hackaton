import ApexCharts from "apexcharts";
import { useRef,useEffect } from "react";

const CardState = () => {
    const chartRef = useRef(null)

  useEffect(() => {
    // Configuración del gráfico
    const options = {
      chart: {
        type: "pie",
        height: 250,
        width: "100%",
      },
      series: [
        44,39,10,7
      ],
      labels:["Optimo","Normal","Desgastado","Critico"],
      legend:{
      },
      legend:{
        style:{
            colors:["#ffffff","#ffffff","#ffffff","#ffffff"]
        }
      }
    };

    // Crear el gráfico
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      // Limpiar el gráfico al desmontar el componente
      chart.destroy();
    };
  }, []);

  


  return (
    <div className=" w-2/5 bg-gray-800 rounded-lg flex flex-col gap-2  p-4 h-[365px] ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">
          Estado
        </h1>
        <span className="text-gray-400">Analisis de estado</span>
      </div>

      <div ref={chartRef} />
    </div>
  );
};

export default CardState;
