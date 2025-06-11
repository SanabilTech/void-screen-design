
import { useCallback } from 'react';
import { useFunnelTracking } from './useFunnelTracking';

export const useOrderCompletion = () => {
  const { trackFunnelStep } = useFunnelTracking();
  
  const trackOrderCompletion = useCallback(() => {
    // Track the final step in the funnel
    trackFunnelStep('completed');
  }, [trackFunnelStep]);
  
  return { trackOrderCompletion };
};
