import { Canvas } from "@react-three/fiber";
import { Bearing } from "./Bearingv2";
import { OrbitControls } from "@react-three/drei";

export function BearingRenderer() {

  
  const canvasSize = 260;
  return (
    <div style={{ with: canvasSize, height: canvasSize }}>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 2]} intensity={1} />
        <OrbitControls autoRotate autoRotateSpeed={4} />
        <Bearing />
      </Canvas>
    </div>
  );
}
