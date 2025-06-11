import React, { useCallback, useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import funnelEmptyIcon from '/lovable-uploads/f16fbb97-c380-4733-9cf6-e95456484135.png';

const FUNNEL_STEPS = [
  {
    id: "/",
    label: "Homepage",
    description: "Users who landed on homepage"
  },
  {
    id: "products",
    label: "Products Page",
    description: "Users who viewed products list"
  },
  {
    id: "details",
    label: "Product Details",
    description: "Users who viewed product details"
  },
  {
    id: "customerInfo",
    label: "Customer Information",
    description: "Users who entered customer info"
  },
  {
    id: "protectionPlan",
    label: "Protection Plan",
    description: "Users who reached protection plan step"
  },
  {
    id: "review",
    label: "Order Review",
    description: "Users who reviewed their order"
  },
  {
    id: "completed",
    label: "Order Completed",
    description: "Users who completed purchase"
  }
];

const REFERRAL_SOURCES = [
  {
    id: "direct",
    label: "Direct Traffic",
    description: "Users who typed URL directly or used bookmarks"
  },
  {
    id: "organic",
    label: "Organic Search",
    description: "Users coming from search engines like Google"
  },
  {
    id: "social",
    label: "Social Media",
    description: "Users coming from social platforms like Facebook, Twitter, etc."
  },
  {
    id: "referral",
    label: "Referral",
    description: "Users coming from other websites"
  },
  {
    id: "email",
    label: "Email",
    description: "Users clicking links in emails"
  },
  {
    id: "paid",
    label: "Paid Ads",
    description: "Users coming from paid advertisements"
  }
];

const calculateDropRates = (data: any[]) => {
  const sortedData = [...data].sort((a, b) => {
    const aIndex = FUNNEL_STEPS.findIndex(step => step.id === a.id);
    const bIndex = FUNNEL_STEPS.findIndex(step => step.id === b.id);
    return aIndex - bIndex;
  });
  
  return sortedData.map((step, index) => {
    if (index === 0) {
      return {
        ...step,
        dropRate: 0,
        percent: 100
      };
    }
    
    const previousValue = sortedData[index - 1].value;
    const dropRate = ((previousValue - step.value) / previousValue) * 100;
    const percent = (step.value / sortedData[0].value) * 100;
    
    return {
      ...step,
      dropRate: Math.round(dropRate),
      percent: Math.round(percent)
    };
  });
};

interface WebsiteFunnelProps {
  dateRange?: { from?: Date; to?: Date };
  deviceFilter: string;
  sourceFilter: string;
  viewType?: 'funnel' | 'referrals';
}

export const WebsiteFunnel: React.FC<WebsiteFunnelProps> = ({ 
  dateRange, 
  deviceFilter, 
  sourceFilter,
  viewType = 'funnel'
}) => {
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [referralData, setReferralData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  
  const fetchFunnelData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsEmpty(false);
    
    try {
      const fromDate = dateRange?.from?.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = dateRange?.to?.toISOString() || new Date().toISOString();
      
      console.log('Fetching funnel data with parameters:', { 
        fromDate, 
        toDate, 
        deviceFilter, 
        sourceFilter 
      });
      
      const { data, error: supabaseError } = await supabase.rpc('get_funnel_data', { 
        from_date: fromDate,
        to_date: toDate,
        device_filter: deviceFilter,
        source_filter: sourceFilter
      });
      
      if (supabaseError) {
        console.error('Error fetching funnel data:', supabaseError);
        setError('Failed to load funnel data. Please try again.');
        const sampleData = getFallbackData(deviceFilter, sourceFilter);
        setFunnelData(sampleData);
      } else if (data && Array.isArray(data) && data.length > 0) {
        console.log('Real funnel data received:', data);
        const processedData = processRealData(data);
        
        const hasData = processedData.some(item => item.value > 0);
        if (!hasData) {
          console.log('No actual data found in the processed results');
          setIsEmpty(true);
        }
        
        setFunnelData(processedData);
      } else {
        console.log('No funnel data found in database');
        setIsEmpty(true);
        const sampleData = getFallbackData(deviceFilter, sourceFilter);
        const emptyData = sampleData.map(item => ({...item, value: 0}));
        setFunnelData(emptyData);
      }
    } catch (err) {
      console.error('Unexpected error fetching funnel data:', err);
      setError('An unexpected error occurred. Please try again.');
      const sampleData = getFallbackData(deviceFilter, sourceFilter);
      setFunnelData(sampleData);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, deviceFilter, sourceFilter]);
  
  const fetchReferralData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsEmpty(false);
    
    try {
      const fromDate = dateRange?.from?.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const toDate = dateRange?.to?.toISOString() || new Date().toISOString();
      
      console.log('Fetching referral data with parameters:', { 
        fromDate, 
        toDate, 
        deviceFilter
      });
      
      const response = await fetch(
        `${process.env.VITE_SUPABASE_URL}/rest/v1/rpc/get_referral_data`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.VITE_SUPABASE_ANON_KEY || '',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token || ''}`
          },
          body: JSON.stringify({ 
            from_date: fromDate,
            to_date: toDate,
            device_filter: deviceFilter
          })
        }
      );
      
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && Array.isArray(data) && data.length > 0) {
        console.log('Real referral data received:', data);
        const processedData = processReferralData(data);
        
        const hasData = processedData.some(item => item.value > 0);
        if (!hasData) {
          console.log('No actual referral data found in the processed results');
          setIsEmpty(true);
        }
        
        setReferralData(processedData);
      } else {
        console.log('No referral data found in database');
        setIsEmpty(true);
        const sampleData = getReferralFallbackData(deviceFilter);
        const emptyData = sampleData.map(item => ({...item, value: 0}));
        setReferralData(emptyData);
      }
    } catch (err) {
      console.error('Unexpected error fetching referral data:', err);
      setError('An unexpected error occurred. Please try again.');
      const sampleData = getReferralFallbackData(deviceFilter);
      setReferralData(sampleData);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, deviceFilter]);
  
  const processRealData = (rawData: any[]) => {
    const dataMap = new Map();
    
    console.log('Processing raw funnel data:', rawData);
    
    rawData.forEach(item => {
      dataMap.set(item.funnel_step, item.user_count);
    });
    
    const result = FUNNEL_STEPS.map(step => {
      const count = dataMap.get(step.id) || 0;
      console.log(`Step ${step.id}: ${count} users`);
      
      return {
        id: step.id,
        label: step.label,
        description: step.description,
        value: count
      };
    });
    
    return result;
  };
  
  const processReferralData = (rawData: any[]) => {
    const dataMap = new Map();
    
    console.log('Processing raw referral data:', rawData);
    
    rawData.forEach(item => {
      dataMap.set(item.traffic_source, item.user_count);
    });
    
    const result = REFERRAL_SOURCES.map(source => {
      const count = dataMap.get(source.id) || 0;
      console.log(`Source ${source.id}: ${count} users`);
      
      return {
        id: source.id,
        label: source.label,
        description: source.description,
        value: count
      };
    });
    
    return result;
  };
  
  useEffect(() => {
    if (viewType === 'funnel') {
      fetchFunnelData();
    } else {
      fetchReferralData();
    }
  }, [fetchFunnelData, fetchReferralData, viewType]);
  
  const getFallbackData = (deviceFilter: string, sourceFilter: string) => {
    const baseData = FUNNEL_STEPS.map((step, index) => {
      const baseValue = 10000 / (index + 1);
      return {
        ...step,
        value: Math.round(baseValue)
      };
    });

    if (deviceFilter !== 'all') {
      const multiplier = deviceFilter === 'desktop' ? 1.2 : 
                        deviceFilter === 'mobile' ? 0.8 : 0.9;
      
      return baseData.map(step => ({
        ...step,
        value: Math.round(step.value * multiplier)
      }));
    }

    if (sourceFilter !== 'all') {
      const multiplier = sourceFilter === 'direct' ? 1.1 : 
                        sourceFilter === 'organic' ? 1.3 : 
                        sourceFilter === 'social' ? 0.7 : 0.9;
      
      return baseData.map(step => ({
        ...step,
        value: Math.round(step.value * multiplier)
      }));
    }

    return baseData;
  };
  
  const getReferralFallbackData = (deviceFilter: string) => {
    const baseData = REFERRAL_SOURCES.map((source, index) => {
      let baseValue;
      switch(source.id) {
        case 'direct':
          baseValue = 3500;
          break;
        case 'organic':
          baseValue = 2800;
          break;
        case 'social':
          baseValue = 1500;
          break;
        case 'referral':
          baseValue = 900;
          break;
        case 'email':
          baseValue = 600;
          break;
        case 'paid':
          baseValue = 1100;
          break;
        default:
          baseValue = 500;
      }
      
      return {
        ...source,
        value: baseValue
      };
    });

    if (deviceFilter !== 'all') {
      const multiplier = deviceFilter === 'desktop' ? 1.2 : 
                        deviceFilter === 'mobile' ? 0.8 : 0.9;
      
      return baseData.map(source => ({
        ...source,
        value: Math.round(source.value * multiplier)
      }));
    }

    return baseData;
  };
  
  const CustomTooltip = useCallback(({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md shadow-md border border-gray-200">
          <p className="font-bold">{data.label}</p>
          <p>Users: {data.value.toLocaleString()}</p>
          {viewType === 'funnel' && (
            <>
              <p>Conversion: {data.percent}% of total</p>
              {data.dropRate > 0 && (
                <p className="text-red-500">Drop-off: {data.dropRate}% from previous</p>
              )}
            </>
          )}
          <p className="text-xs text-gray-500 mt-1">{data.description}</p>
        </div>
      );
    }
    return null;
  }, [viewType]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <img src={funnelEmptyIcon} alt="No data" className="w-16 h-16 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
        <p className="text-gray-500 max-w-md">
          There is no user journey data for the selected filters. Try changing your date range or filters, or wait for more user activity to be recorded.
        </p>
      </div>
    );
  }

  const data = viewType === 'funnel' 
    ? calculateDropRates(funnelData)
    : referralData;

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis 
            type="category" 
            dataKey="label" 
            width={120} 
            tickLine={false} 
            axisLine={false}
          />
          <Tooltip content={CustomTooltip} />
          <Legend />
          <Bar 
            dataKey="value" 
            name="Users" 
            fill="#8884d8" 
            radius={[0, 4, 4, 0]}
            label={(props) => {
              const { x, y, width, value } = props;
              if (width < 50 || value === 0) return null;
              return (
                <text 
                  x={x + width - 10} 
                  y={y + 7} 
                  fill="#fff" 
                  textAnchor="end" 
                  fontSize={12}
                >
                  {value.toLocaleString()}
                </text>
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WebsiteFunnel;
