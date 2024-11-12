import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line 
} from 'recharts';
import { Star, Clock, CheckCircle, Award } from 'lucide-react';

interface CleanerMetricsProps {
  timeframe: string;
  fullView?: boolean;
}

export default function CleanerMetrics({ timeframe, fullView = false }: CleanerMetricsProps) {
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(null);

  const cleanerPerformance = [
    {
      id: '1',
      name: 'Sarah Johnson',
      completedJobs: 45,
      onTimeRate: 98,
      avgDuration: 2.5,
      satisfaction: 4.8,
      efficiency: 92,
      utilization: 85
    },
    {
      id: '2',
      name: 'Michael Chen',
      completedJobs: 42,
      onTimeRate: 96,
      avgDuration: 2.3,
      satisfaction: 4.9,
      efficiency: 94,
      utilization: 88
    },
    // Add more cleaner data...
  ];

  const timeData = [
    { date: '2024-01', avgDuration: 2.4, efficiency: 90 },
    { date: '2024-02', avgDuration: 2.3, efficiency: 92 },
    { date: '2024-03', avgDuration: 2.2, efficiency: 94 },
    // Add more time series data...
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-2">
            <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">Avg. Jobs/Day</span>
          </div>
          <span className="text-2xl font-bold text-blue-600">8.5</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">Avg. Duration</span>
          </div>
          <span className="text-2xl font-bold text-green-600">2.4h</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-2">
            <Star className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">Satisfaction</span>
          </div>
          <span className="text-2xl font-bold text-yellow-600">4.8</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center mb-2">
            <Award className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">Utilization</span>
          </div>
          <span className="text-2xl font-bold text-purple-600">86%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Efficiency Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgDuration" name="Avg Duration (h)" stroke="#0088FE" />
              <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleaner Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cleanerPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completedJobs" name="Completed Jobs" fill="#0088FE" />
              <Bar dataKey="utilization" name="Utilization %" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Individual Performance</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cleaner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jobs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  On-Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cleanerPerformance.map((cleaner) => (
                <tr 
                  key={cleaner.id}
                  onClick={() => setSelectedCleaner(cleaner.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{cleaner.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {cleaner.completedJobs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {cleaner.onTimeRate}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {cleaner.avgDuration}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{cleaner.satisfaction}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}