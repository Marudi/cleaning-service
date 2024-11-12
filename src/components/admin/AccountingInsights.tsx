import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionItems: string[];
}

export default function AccountingInsights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulated insights while API endpoint is being developed
      const mockInsights: Insight[] = [
        {
          id: '1',
          type: 'opportunity',
          title: 'Optimize Service Pricing',
          description: 'Deep cleaning services show 15% higher margins. Consider adjusting basic cleaning prices to improve profitability.',
          impact: 'high',
          actionItems: [
            'Review current pricing structure',
            'Analyze competitor pricing',
            'Calculate new price points'
          ]
        },
        {
          id: '2',
          type: 'trend',
          title: 'Seasonal Revenue Pattern',
          description: 'Revenue peaks during spring months. Plan resources and marketing accordingly.',
          impact: 'medium',
          actionItems: [
            'Prepare spring marketing campaign',
            'Adjust staffing levels',
            'Stock up on supplies'
          ]
        },
        {
          id: '3',
          type: 'risk',
          title: 'Supply Cost Increase',
          description: 'Cleaning supply costs have increased 8% this quarter. Consider bulk purchasing or alternative suppliers.',
          impact: 'high',
          actionItems: [
            'Negotiate with current suppliers',
            'Research alternative suppliers',
            'Consider bulk purchases'
          ]
        }
      ];

      setInsights(mockInsights);
    } catch (err) {
      setError('Failed to fetch insights. Please try again later.');
      console.error('Error fetching insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'risk':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'trend':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getImpactBadgeColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          <p className="mt-2 text-gray-600">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-center text-red-600">
          <AlertCircle className="h-6 w-6 mr-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">AI Insights</h2>
        </div>
        <button
          onClick={() => fetchInsights()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <TrendingUp className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{insight.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactBadgeColor(insight.impact)}`}>
                {insight.impact} impact
              </span>
            </div>
            <p className="text-sm mb-3">{insight.description}</p>
            <div className="space-y-2">
              {insight.actionItems.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-current mr-2" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}