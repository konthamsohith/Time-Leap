import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

interface GLBModelProps {
  modelPath: string;
  scale: number | { before: number; after: number };
}

function GLBModel({ modelPath, scale }: GLBModelProps) {
  const { scene } = useGLTF(modelPath) as any;
  return <primitive object={scene} scale={scale} />
}

interface MonumentModelProps {
  modelPath: string;
  scale?: number | { before: number; after: number };
  scrollProgress?: number;
}

export default function MonumentModel({
  modelPath,
  scale = 1,
  scrollProgress = 1
}: MonumentModelProps) {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="relative w-[520px] h-[520px] transition-all duration-700 ease-out">

        {/* Canvas Wrapper */}
        <div className="relative w-full max-w-lg aspect-square perspective-1000">
          <div className="relative w-full max-w-3xl aspect-square">

            <Canvas
              className="w-full h-full"
              camera={{ position: [0, 0, 5], fov: 50 }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[5, 5, 5]} intensity={2} />

              <Suspense fallback={null}>
                <GLBModel
                  modelPath={modelPath}
                  scale={scale}
                />
              </Suspense>

              <OrbitControls
                enableZoom
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.5}
              />
            </Canvas>

          </div>
        </div>

      </div>
    </div>
  )
}
