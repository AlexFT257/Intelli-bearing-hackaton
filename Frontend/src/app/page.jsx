import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full bg-white w-full m-2">
      {/* izquierda */}
      <div className="flex flex-row w-full">
        {/* arriba */}
        <div className="flex">

        </div>
        {/* abajo */}
        <div className="flex flex-row"></div>
      </div>
      {/* derecha /chat */}
      <div className="flex w-2/5 bg-black h-full">

      </div>
    </div>
  );
}
