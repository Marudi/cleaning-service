import React, { useState, useCallback, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { 
  DollarSign, TrendingUp, TrendingDown, Users, 
  AlertCircle, ArrowUpRight, ArrowDownRight, Target
} from 'lucide-react';
import AccountingInsights from './AccountingInsights';
import { mockData } from '../../data/mockData';
import { startOfMonth, subMonths, startOfQuarter, startOfYear, format } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AccountingDashboard() {
  const [timeframe, setTimeframe] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Filter data based on timeframe
  const filteredData = useMemo(() => {
    const now = new Date();
    let startDate;

    switch (timeframe) {
      case 'month':
        startDate = startOfMonth(now);
        break;
      case 'quarter':
        startDate = startOfQuarter(now);
        break;
      case 'year':
        startDate = startOfYear(now);
        break;
      default:
        startDate = startOfMonth(now);
    }

    // Filter revenue data
    const filteredRevenue = mockData.revenueData.filter(item => {
      const itemDate = new Date(2024, mockData.revenueData.findIndex(d => d.month === item.month));
      return itemDate >= startDate;
    });

    // Calculate totals and metrics
    const totals = filteredRevenue.reduce((acc, curr) => ({
      revenue: acc.revenue + curr.revenue,
      expenses: acc.expenses + curr.expenses,
      profit: acc.profit + curr.profit
    }), { revenue: 0, expenses: 0, profit: 0 });

    // Calculate growth rates
    const previousPeriodRevenue = filteredRevenue[0]?.revenue || 0;
    const currentPeriodRevenue = filteredRevenue[filteredRevenue.length - 1]?.revenue || 0;
    const revenueGrowth = previousPeriodRevenue ? 
      ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 : 0;

    return {
      revenueData: filteredRevenue,
      totals,
      growth: {
        revenue: revenueGrowth
      }
    };
  }, [timeframe]);

  // Filter service performance data
  const filteredServiceData = useMemo(() => {
    return mockData.servicePerformance.map(service => ({
      ...service,
      revenue: service.revenue * (timeframe === 'quarter' ? 3 : timeframe === 'year' ? 12 : 1)
    }));
  }, [timeframe]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }, []);

  const getTimeframeLabel = useCallback(() => {
    switch (timeframe) {
      case 'month':
        return format(new Date(), 'MMMM yyyy');
      case 'quarter':
        return `Q${Math.floor(new Date().getMonth() / 3) + 1} ${new Date().getFullYear()}`;
      case 'year':
        return new Date().getFullYear().toString();
      default:
        return '';
    }
  }, [timeframe]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Analytics</h1>
          <p className="text-gray-600 mt-1">Showing data for {getTimeframeLabel()}</p>
        </div>
        <div className="flex gap-2">
          {['month', 'quarter', 'year'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                timeframe === tf
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <span className={`text-sm font-medium ${filteredData.growth.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {filteredData.growth.revenue >= 0 ? <ArrowUpRight className="h-4 w-4 inline" /> : <ArrowDownRight className="h-4 w-4 inline" />}
              {Math.abs(filteredData.growth.revenue).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(filteredData.totals.revenue)}</h3>
          <p className="text-gray-600">{timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}ly Revenue</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8 text-green-600" />
            <span className="text-sm font-medium text-green-600">
              <ArrowUpRight className="h-4 w-4 inline" />
              {((filteredData.totals.profit / filteredData.totals.revenue) * 100).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(filteredData.totals.profit)}</h3>
          <p className="text-gray-600">Net Profit</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-purple-600" />
            <span className="text-sm font-medium text-green-600">
              <ArrowUpRight className="h-4 w-4 inline" />
              15%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">180</h3>
          <p className="text-gray-600">Active Clients</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <span className="text-sm font-medium text-red-600">
              <ArrowDownRight className="h-4 w-4 inline" />
              2.5%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3.2%</h3>
          <p className="text-gray-600">Churn Rate</p>
        </div>
      </div>

      {/* Revenue and Profit Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#0088FE" />
              <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#FF8042" />
              <Line type="monotone" dataKey="profit" name="Profit" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredServiceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Performance and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredServiceData.map((service, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {service.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatCurrency(service.revenue)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`inline-flex items-center ${
                          service.growth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {service.growth >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                          {Math.abs(service.growth)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {service.margin}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AccountingInsights timeframe={timeframe} />
        </div>
      </div>
    </div>
  );
}