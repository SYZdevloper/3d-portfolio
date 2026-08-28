import { Float, OrbitControls, useGLTF, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, Suspense, useMemo } from "react";
import * as THREE from "three";

const TechModel = ({ model }) => {
  const scene = useGLTF(model.modelPath);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      scene.scene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [scene, model.name]);

  return (
    <group scale={model.scale} rotation={model.rotation}>
      <primitive object={scene.scene} />
    </group>
  );
};

const TechIconCardExperience = ({ model }) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      frameloop="demand"
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
          <TechModel model={model} />
        </Float>
        <Preload all />
      </Suspense>

      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default TechIconCardExperience;
