import React, { useState, useCallback } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  Calendar, Users, DollarSign, Award, 
  TrendingUp, Package, Clock
} from 'lucide-react';
import StaffScheduleCalendar from './StaffScheduleCalendar';
import CleanerMetrics from './CleanerMetrics';
import InventoryTracker from './InventoryTracker';
import CustomerMetrics from './CustomerMetrics';
import StaffManagement from './StaffManagement';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  const handleTimeframeChange = useCallback((newTimeframe: string) => {
    setTimeframe(newTimeframe);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-4">
          <div className="flex gap-2">
            {['week', 'month', 'year'].map((tf) => (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
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
          <div className="flex gap-2">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'cleaners', label: 'Cleaners' },
              { id: 'customers', label: 'Customers' },
              { id: 'inventory', label: 'Inventory' },
              { id: 'staff', label: 'Staff' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-600" />
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Active Cleaners</h3>
              <p className="text-gray-600">24 on duty today</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="h-8 w-8 text-green-600" />
                <span className="text-sm font-medium text-green-600">↑ 15%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Bookings</h3>
              <p className="text-gray-600">156 this week</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Clock className="h-8 w-8 text-purple-600" />
                <span className="text-sm font-medium text-green-600">98%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">On-Time Rate</h3>
              <p className="text-gray-600">2.5 hours avg. duration</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-8 w-8 text-yellow-600" />
                <span className="text-sm font-medium text-green-600">4.8/5</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Satisfaction</h3>
              <p className="text-gray-600">95% positive reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <StaffScheduleCalendar timeframe={timeframe} />
            <CustomerMetrics timeframe={timeframe} />
          </div>
        </>
      )}

      {/* Cleaners Tab */}
      {activeTab === 'cleaners' && (
        <CleanerMetrics timeframe={timeframe} />
      )}

      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <CustomerMetrics timeframe={timeframe} fullView />
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <InventoryTracker />
      )}

      {/* Staff Tab */}
      {activeTab === 'staff' && (
        <StaffManagement />
      )}
    </div>
  );
}