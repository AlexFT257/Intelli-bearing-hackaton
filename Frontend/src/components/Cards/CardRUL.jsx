import ApexCharts from "apexcharts";
import { useRef,useEffect } from "react";

const CardRUL = () => {
    const chartRef = useRef(null)

    const generateExponentialSeries = (length, base) => {
        const series = [];
        for (let i = 0; i < length; i++) {
          const value = Math.pow(base, i); // Genera el valor exponencial
          series.push(value);
        }
        // Normaliza los valores para que estén en el rango de 0 a 1
        const max = Math.max(...series);
        const min = Math.min(...series);
        return series.map((value) => (value - min) / (max - min));
      };
      
      // Ejemplo de uso
      const seriesLength = 10;
      const base = 2; // Puedes ajustar este valor según la tasa de crecimiento deseada
      const exponentialSeries = generateExponentialSeries(seriesLength, base);
    //   console.log(exponentialSeries);
      
  useEffect(() => {
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
          data: exponentialSeries
        },
      ],
      yaxis:{
        labels:{
            formatter: function(value){
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
    // TODO: agregar la dependencia de la llamada al back
  }, []);

  


  return (
    <div className=" w-3/5 bg-gray-800 rounded-lg flex flex-col gap-2  p-4 h-fit ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">
          Analisis RUL
        </h1>
        <span className="text-gray-400">Grafico de la prediccion RUL</span>
      </div>

      <div ref={chartRef} />
    </div>
  );
};

export default CardRUL;
