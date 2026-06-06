import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createTextTexture(text) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "bold 60px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 1;
  texture.needsUpdate = true;
  return texture;
}

export default function Cube() {
  const ref = useRef();

  const materials = useMemo(() => {
    const texts = ["JS", "REACT", "NEXT", "HTML", "CSS", "NODE"];

    return texts.map(
      (t) =>
        new THREE.MeshLambertMaterial({
          map: createTextTexture(t),
        }),
    );
  }, []);

  useEffect(() => {
    return () => {
      materials.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
    };
  }, [materials]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.25;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[2.2, 2.2, 2.2]} />
      {materials.map((mat, i) => (
        <primitive key={i} object={mat} attach={`material-${i}`} />
      ))}
    </mesh>
  );
}
