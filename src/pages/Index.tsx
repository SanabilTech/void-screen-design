import React, { useEffect } from 'react';
import { useFunnelTracking } from '@/hooks/useFunnelTracking';

const IndexPage = () => {
  const { trackFunnelStep } = useFunnelTracking();
  
  useEffect(() => {
    trackFunnelStep('homepage');
  }, [trackFunnelStep]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default IndexPage;
