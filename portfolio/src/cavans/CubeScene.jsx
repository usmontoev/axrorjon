import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "../components/Cube";

export default function CubeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]}  intensity={1.4} color="#ffffff" />
      <pointLight      position={[-4, -2, 3]} intensity={1.2} color="#ff952b" />
      <pointLight      position={[3,  3, -4]} intensity={0.6} color="#6688ff" />

      <Cube />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={true}
        autoRotateSpeed={2.8}
      />
    </Canvas>
  );
}
