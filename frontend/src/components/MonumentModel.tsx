import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'
import { Suspense } from 'react'

interface GLBModelProps {
  modelPath: string;
  scale: number | { before: number; after: number };
}

function GLBModel({ modelPath, scale }: GLBModelProps) {
  if (!modelPath) return null;
  const { scene } = useGLTF(modelPath) as any;
  // Restore scale prop
  return <primitive object={scene} scale={typeof scale === 'number' ? scale : 1} />
}

interface MonumentModelProps {
  modelPath: string;
  scale?: number | { before: number; after: number };
  scrollProgress?: number;

}

export default function MonumentModel({
  modelPath,
  scale = 1,
  scrollProgress = 1,

}: MonumentModelProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 12, 8], fov: 45 }} // Adjusted camera
        dpr={[1, 2]}
      >
        {/* Consistent Multi-directional Lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[5, 10, -5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, 10, -5]} intensity={1.5} castShadow />

        <Suspense fallback={null}>
          <group position={[0, -2, 0]}>
          <Center top>
            <GLBModel
              modelPath={modelPath}
              scale={scale}
            />
          </Center>
          </group>
        </Suspense>

        <OrbitControls
          makeDefault
          enableZoom
          enablePan={true} // Enable pan to help find model
          autoRotate
          autoRotateSpeed={1.0}
        />
      </Canvas>
    </div>
  )
}