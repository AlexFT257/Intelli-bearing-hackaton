import { useContext, useState } from "react";
import { BearingContext } from "@/app/layout";

const fakedata = [
  {
    id: 0,
    name: "rod1",
    lastState: "Bueno",
    installDate: "12/12/1212",
    lifeExpectancy: 4,
    rpm: 12000,
    temp: 30,
    torque: 0.5
  },
  {
    id: 1,
    name: "rod2",
    lastState: "Bueno",
    installDate: "12/12/1212",
    lifeExpectancy: 4,
    rpm: 1200,
    temp: 28,
    torque: 3.5
  },

  {
    id: 2,
    name: "rod3",
    lastState: "Bueno",
    installDate: "12/12/1212",
    lifeExpectancy: 4,
    rpm: 10000,
    temp: 48,
    torque: 1
  },
  {
    id: 3,
    name: "rod4",
    lastState: "Bueno",
    installDate: "12/12/1212",
    lifeExpectancy: 4,
    rpm: 7000,
    temp: 32,
    torque: 2
  },

  {
    id: 4,
    name: "rod5",
    lastState: "Bueno",
    installDate: "12/12/1212",
    lifeExpectancy: 4,
    rpm: 8290,
    temp: 22,
    torque: 1.2
  },
  
  {
    id: 5,
    name: "rod5",
    lastState: "Bueno",
    installDate: "12/12/1212",
    lifeExpectancy: 4,
    rpm: 9460,
    temp: 39,
    torque: 1.4
  },
];

const CardTable = () => {
  const {bearing, setBearing} = useContext(BearingContext)


  const onBearingChange = (bearing) =>{
    console.log()
    console.log("onBearingChange",bearing)
    setBearing(bearing)
    
  }


  const TableRow = ({ data }) => (
    <tr className="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap text-white"
      >
        {data.name}
      </th>
      <td className="px-6 py-4">{data.lastState}</td>
      <td className="px-6 py-4">{data.installDate}</td>
      <td className="px-6 py-4">{data.lifeExpectancy}</td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={()=>onBearingChange(data)}
        >
          Ver
        </a>
      </td>
    </tr>
  );

  return (
    <div className=" w-full bg-gray-800 rounded-lg flex flex-col gap-2  p-4 h-fit ">
      <div>
        <h1 className=" text-white text-3xl font-bold tracking-tight">
          Rodamientos
        </h1>
        <span className="text-gray-400">Selecciona un rodamiento</span>
      </div>

      <div className=" max-h-[305px] overflow-y-scroll rounded-lg ">
        <table className="w-full  text-sm text-left text-gray-400">
          <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rodamiento
              </th>
              <th scope="col" className="px-6 py-3">
                Estado
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de instalacion
              </th>
              <th scope="col" className="px-6 py-3">
                Estimacion de vida util
              </th>
              <th scope="col" className="px-6 py-3">
                Accion
              </th>
            </tr>
          </thead>
          <tbody className="h-[264px] overflow-y-scroll">
            {/* reemplazar por list */}
            {fakedata.map((item) => (
              
              <TableRow key={item.id} data={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardTable;
