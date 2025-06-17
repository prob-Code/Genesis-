import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Stage } from '@react-three/drei';
import { Suspense, useState } from 'react';

interface TwinProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
  onError?: () => void;
}

function Twin({ url, position = [0, 0, 0], scale = 1.5, onError }: TwinProps) {
  try {
    const { scene } = useGLTF(url);
    return (
      <primitive 
        object={scene} 
        scale={scale} 
        position={position}
        rotation={[0, Math.PI, 0]} // Face forward
      />
    );
  } catch (e) {
    if (onError) onError();
    return null;
  }
}

interface AvatarViewerProps {
  avatarUrl: string;
  className?: string;
  scale?: number;
}

export default function AvatarViewer({ 
  avatarUrl = '/assets/avatars/user-avatar.glb', 
  className = "w-full h-64",
  scale = 1.5 
}: AvatarViewerProps) {
  const [loadError, setLoadError] = useState(false);

  return (
    <div className={`${className} bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center`}>
      {loadError ? (
        <img src="/assets/vr-avatar-placeholder.png" alt="Avatar Placeholder" className="h-full mx-auto" />
      ) : (
        <Canvas 
          camera={{ 
            position: [0, 0, 2.5],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          dpr={[1, 2]} // Optimize for different screen densities
        >
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Twin url={avatarUrl} scale={scale} onError={() => setLoadError(true)} />
            </Stage>
            <OrbitControls 
              enablePan={false}
              minPolarAngle={Math.PI / 4} // Limit vertical rotation
              maxPolarAngle={Math.PI * 3/4}
              minDistance={1.5}
              maxDistance={4}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
} 