import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { Card } from './ui/card';

interface ModelViewerProps {
  modelData: string; // base64 encoded GLB
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2} />;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({ modelData }) => {
  // Convert base64 to blob URL
  const modelUrl = React.useMemo(() => {
    const binaryString = atob(modelData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'model/gltf-binary' });
    return URL.createObjectURL(blob);
  }, [modelData]);

  return (
    <Card className="w-full h-[600px] bg-[#1A1A1A] border-white/10 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: '#0a0a0a' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <Model url={modelUrl} />
          </PresentationControls>

          <Environment preset="city" />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
        <p className="text-xs text-white/70">🖱️ Drag to rotate • Scroll to zoom</p>
      </div>
    </Card>
  );
};