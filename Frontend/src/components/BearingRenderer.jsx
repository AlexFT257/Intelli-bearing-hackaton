import { Canvas } from "@react-three/fiber";
import { Bearing } from "./Bearingv2";
import { OrbitControls } from "@react-three/drei";

export function BearingRenderer() {
  const canvasSize = 260;
  return (
    <div style={{ with: canvasSize, height: canvasSize }}>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 3, 0]} intensity={1} />
        <directionalLight position={[0, -3, 0]} intensity={1} />
        <directionalLight position={[3, 0, 0]} intensity={1} />
        <directionalLight position={[-3, 0, 0]} intensity={1} />
        <directionalLight position={[0, 0, 3]} intensity={1} />
        <directionalLight position={[0, 0, -3]} intensity={1} />
        <OrbitControls  autoRotateSpeed={4} />
        <Bearing />
      </Canvas>
    </div>
  );
}
