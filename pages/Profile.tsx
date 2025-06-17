import { useEffect, useState } from 'react';
import AvatarViewer from '../components/AvatarViewer';

interface ProfileProps {
  userId: string;
}

export default function Profile({ userId }: ProfileProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("/assets/avatars/user-avatar.glb");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'v1.avatar.exported') {
        const url = event.data.data.url;
        setAvatarUrl(url);
        setIsLoading(false);
        // TODO: Save to Firebase
        // saveToFirebase(userId, url);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [userId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Digital Twin</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Create Your Avatar</h2>
            <iframe
              src="https://readyplayer.me/avatar?frameApi"
              id="rpm-frame"
              className="w-full h-[600px] border-0 rounded-xl"
              allow="camera; microphone"
            />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your 3D Avatar</h2>
            {isLoading ? (
              <div className="h-[600px] flex items-center justify-center bg-gray-900 rounded-xl">
                <div className="text-white">Loading your avatar...</div>
              </div>
            ) : (
              <AvatarViewer 
                avatarUrl={avatarUrl} 
                className="h-[600px]"
                scale={2}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 