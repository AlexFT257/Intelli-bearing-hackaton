
import { BearingContext, TwinsContext } from "@/app/layout";
import { useContext, useEffect, useState } from "react";


const CardControls = () => {
  const [rpm, setRpm] = useState(2460)
  const [temp, setTemp] = useState(38)
  const [torque, setTorque] = useState(0.5)

  const { twins, setTwins } = useContext(TwinsContext)
  const { bearing } = useContext(BearingContext)



  useEffect(() => {
    setTwins({
      simRpm: rpm,
      simTemp: temp,
      simTorque: torque
    })
  }, [rpm, torque, temp])

  useEffect(() => {
    if (bearing == null) {
      return
    }

    
    setRpm(bearing.rpm)
    setTemp(bearing.temp)
    setTorque(bearing.torque)
  }, [bearing])


  return (
    <div className=" bg-gray-800 rounded-lg flex flex-col gap-2  p-4 h-full ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">
          Controles
        </h1>
        <span className="text-gray-400">Controles de simulacion</span>
      </div>

      <div className=" flex  flex-col justify-evenly h-full">
        <div>
          <label for="rpm" className="block mb-2 text-sm font-medium text-white">
            Revoluciones: {rpm} Rpm
          </label>
          <input
            id="rpm"
            type="range"
            value={rpm}
            onChange={(e) => setRpm(e.target.value)}
            max={11000}
            min={0}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
          ></input>
        </div>
        <div>
          <label for="temp" className="block mb-2 text-sm font-medium text-white">
            Temperatura: {temp} °C
          </label>
          <input
            id="temp"
            type="range"
            value={temp}
            max={200}
            min={0}
            onChange={(e) => setTemp(e.target.value)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
          ></input>
        </div>
        <div>
          <label for="torque" className="block mb-2 text-sm font-medium text-white">
            Torque: {torque} N/m
          </label>
          <input
            id="torque"
            type="range"
            value={torque}
            max={-1}
            min={1}
            onChange={(e) => setTorque(e.target.value)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default CardControls;
