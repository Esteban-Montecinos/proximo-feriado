"use client";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Pala() {
  return (
    <Suspense
      fallback={
        <span className="flex text-xl text-salte-950 items-center justify-center w-full h-60">
          <svg
            version="1.1"
            id="L9"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            className="animate-spin h-5 w-5 mr-3"
          >
            <path
              fill="#fff"
              d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
            >
            </path>
          </svg>
          Cargando...
        </span>
      }
    >
      <div className="flex w-full h-[55vh]">
        <Canvas dpr={[1, 2]} camera={{ position: [-4, 15, -20], fov: 5 }}>
          <directionalLight position={[10, 10, 0]} intensity={2.5} />
          <directionalLight position={[-10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, 20, 0]} intensity={2.5} />
          <directionalLight position={[0, -10, 0]} intensity={0.5} />
          <Rotate position-y={1} scale={2}>
            <Suspense fallback={<Model url="/old_shovel.glb" />}>
              <Model url="/old_shovel.glb" />
            </Suspense>
          </Rotate>
        </Canvas>
      </div>
    </Suspense>
  );
}

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} {...props} />;
}
function Rotate(props) {
  const ref = useRef();
  useFrame((state) => (ref.current.rotation.y = state.clock.elapsedTime));
  return <group ref={ref} {...props} />;
}
