import { BearingContext } from "@/app/layout";
import ApexCharts from "apexcharts";
import { useRef, useEffect, useContext } from "react";

const CardState = () => {
  const chartRef = useRef(null)
  const {bearing} = useContext(BearingContext)


  const generateRandomPercentages = (numCategories) => {
    const percentages = [];
    let sum = 0;

    for (let i = 0; i < numCategories - 1; i++) {
      const randomPercentage = Math.random() * (100 - sum);
      percentages.push(randomPercentage);
      sum += randomPercentage;
    }

    percentages.push(100 - sum); // Ensure the sum is 100

    // Round percentages to one decimal place and adjust the last one to ensure the total sum is 100
    const roundedPercentages = percentages.map((percentage, index) =>
      index === numCategories - 1
        ? (100 - percentages.slice(0, -1).reduce((acc, val) => acc + val, 0)).toFixed(1)
        : percentage.toFixed(1)
    );

    return roundedPercentages.map(Number); // Convert strings back to numbers
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      let randomPercentages = generateRandomPercentages(4)
      // Configuración del gráfico
      const options = {
        chart: {
          type: "pie",
          height: 250,
          width: "100%",
        },
        series: randomPercentages,
        labels: ["Optimo", "Normal", "Desgastado", "Critico"],
        legend: {
        },
        legend: {
          style: {
            colors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"]
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
    }
  }, [bearing]);




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
