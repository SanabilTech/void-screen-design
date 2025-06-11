
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sparkles, TrendingUp, Star, Info } from 'lucide-react';

interface KeyInsightProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: 'positive' | 'negative' | 'neutral';
}

const KeyInsight = ({ title, value, description, icon, trend = 'neutral' }: KeyInsightProps) => {
  const getTrendClass = () => {
    switch (trend) {
      case 'positive':
        return 'text-green-500';
      case 'negative':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="bg-card rounded-lg border p-4 shadow-sm">
      <div className="flex items-center mb-2">
        <div className={`mr-2 ${getTrendClass()}`}>{icon}</div>
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

interface KeyDesirabilityInsightsProps {
  highEndRate: number;
  refurbishedRate: number;
  protectionPlanRate: number;
  topBrand: string;
  topProductType: string;
  avgOrderValue: number;
  totalOrderCount: number;
}

const KeyDesirabilityInsights = ({
  highEndRate,
  refurbishedRate,
  protectionPlanRate,
  topBrand,
  topProductType,
  avgOrderValue,
  totalOrderCount
}: KeyDesirabilityInsightsProps) => {
  // Determine trends based on thresholds (these could be adjusted based on business goals)
  const getHighEndTrend = () => highEndRate > 40 ? 'positive' : highEndRate < 20 ? 'negative' : 'neutral';
  const getRefurbishedTrend = () => refurbishedRate > 30 ? 'positive' : 'neutral';
  const getProtectionTrend = () => protectionPlanRate > 50 ? 'positive' : protectionPlanRate < 25 ? 'negative' : 'neutral';
  
  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Key Desirability Insights</CardTitle>
          </div>
          <CardDescription>
            Critical market preference metrics at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <KeyInsight
              title="High-End Preference"
              value={`${highEndRate.toFixed(1)}%`}
              description="Customers choosing premium devices"
              icon={<TrendingUp className="h-4 w-4" />}
              trend={getHighEndTrend()}
            />
            
            <KeyInsight
              title="Refurbished Adoption"
              value={`${refurbishedRate.toFixed(1)}%`}
              description="Orders with refurbished devices"
              icon={<Info className="h-4 w-4" />}
              trend={getRefurbishedTrend()}
            />
            
            <KeyInsight
              title="Protection Plans"
              value={`${protectionPlanRate.toFixed(1)}%`}
              description="Orders with added protection"
              icon={<Star className="h-4 w-4" />}
              trend={getProtectionTrend()}
            />
            
            <KeyInsight
              title="Top Brand"
              value={topBrand}
              description="Most popular manufacturer"
              icon={<Info className="h-4 w-4" />}
              trend="neutral"
            />
            
            <KeyInsight
              title="Top Product Type"
              value={topProductType}
              description="Most ordered device category"
              icon={<Info className="h-4 w-4" />}
              trend="neutral"
            />
            
            <KeyInsight
              title="Average Order Value"
              value={`SAR ${avgOrderValue.toFixed(2)}`}
              description="Typical customer spend"
              icon={<TrendingUp className="h-4 w-4" />}
              trend={avgOrderValue > 200 ? 'positive' : 'neutral'}
            />
            
            <KeyInsight
              title="Total Orders"
              value={totalOrderCount}
              description="Analyzed transactions"
              icon={<Info className="h-4 w-4" />}
              trend="neutral"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyDesirabilityInsights;
