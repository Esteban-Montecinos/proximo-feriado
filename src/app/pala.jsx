"use client";
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function Pala() {
  return <Suspense  fallback={<span>loading...</span>}>
  <div className='flex w-full h-[55vh] mt-2'>
    
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
}

function Model({ url, ...props }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} {...props} />
  }
  function Rotate(props) {
    const ref = useRef()
    useFrame((state) => (ref.current.rotation.y = state.clock.elapsedTime))
    return <group ref={ref} {...props} />
  }