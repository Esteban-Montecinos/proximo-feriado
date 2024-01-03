'use client'
import {Suspense, useRef} from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

export default function ModeloPala() {
  return (
    <div className="flex w-full h-[55vh]">
        <Canvas dpr={[1, 2]} camera={{ position: [-4, 15, -20], fov: 5 }}>
          <OrbitControls/>
          <directionalLight position={[1, 2, 2]} intensity={2.5} />
          <ambientLight intensity={5.5} />
          <Rotate position-y={1} scale={2}>
            <Suspense fallback={<Model url="/old_shovel.glb" />}>
              <Model url="/old_shovel.glb" />
            </Suspense>
          </Rotate>
        </Canvas>
      </div>
  )
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
