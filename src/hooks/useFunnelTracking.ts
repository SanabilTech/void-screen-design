
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Load or create a session ID from localStorage
const getSessionId = (): string => {
  const existingSessionId = localStorage.getItem('funnel_session_id');
  if (existingSessionId) return existingSessionId;
  
  const newSessionId = uuidv4();
  localStorage.setItem('funnel_session_id', newSessionId);
  return newSessionId;
};

// Get device type
const getDeviceType = (): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return 'tablet';
  }
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};

// Get traffic source
const getTrafficSource = (): string => {
  const referrer = document.referrer;
  if (!referrer) return 'direct';
  
  // UTM parameters check for campaign tracking
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source');
  const utmMedium = urlParams.get('utm_medium');
  const utmCampaign = urlParams.get('utm_campaign');
  
  // If UTM parameters exist, prioritize them for source identification
  if (utmSource) {
    if (utmMedium === 'cpc' || utmMedium === 'ppc' || utmMedium === 'paidsearch') {
      return 'paid';
    }
    if (utmMedium === 'email' || utmMedium === 'newsletter') {
      return 'email';
    }
    if (utmSource === 'facebook' || utmSource === 'instagram' || utmSource === 'twitter' || 
        utmSource === 'linkedin' || utmMedium === 'social') {
      return 'social';
    }
    // Default to the utm_source if it doesn't match any specific category
    return utmSource;
  }
  
  // If no UTM parameters, analyze the referrer
  if (referrer.includes('google.') || 
      referrer.includes('bing.') || 
      referrer.includes('yahoo.') || 
      referrer.includes('yandex.') || 
      referrer.includes('baidu.')) {
    return 'organic';
  }
  
  if (referrer.includes('facebook.') || 
      referrer.includes('instagram.') || 
      referrer.includes('twitter.') || 
      referrer.includes('linkedin.') || 
      referrer.includes('pinterest.') ||
      referrer.includes('tiktok.') ||
      referrer.includes('youtube.')) {
    return 'social';
  }
  
  // Check if the referrer is from our own domain
  const currentDomain = window.location.hostname;
  if (referrer.includes(currentDomain)) return 'internal';
  
  return 'referral';
};

export const useFunnelTracking = () => {
  const location = useLocation();
  
  const trackFunnelStep = useCallback(async (
    stepName: string, 
    timeSpentSeconds?: number
  ) => {
    try {
      const sessionId = getSessionId();
      const userId = (await supabase.auth.getUser()).data.user?.id;
      const trafficSource = getTrafficSource();
      
      // Track event with edge function
      const { data, error } = await supabase.functions.invoke('track-funnel-event', {
        body: {
          sessionId,
          userId,
          funnelStep: stepName,
          deviceType: getDeviceType(),
          trafficSource,
          ipAddress: null, // Will be captured by the edge function
          userAgent: navigator.userAgent,
          timeSpentSeconds,
          referrer: document.referrer // Store the actual referrer URL
        }
      });
      
      if (error) {
        console.error('Error tracking funnel step:', error);
      }
      
      return { success: !error, data };
    } catch (error) {
      console.error('Unexpected error tracking funnel step:', error);
      return { success: false, error };
    }
  }, [location]);
  
  return { trackFunnelStep };
};
