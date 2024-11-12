import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Combined service metrics including car wash and laundromat
const serviceMetrics = [
  // Cleaning Services
  {
    name: 'Deep House Cleaning',
    category: 'cleaning',
    revenue: 45000,
    cost: 27000,
    profit: 18000,
    growth: 15,
    bookings: 180,
    avgDuration: 240,
    satisfaction: 4.8
  },
  {
    name: 'Basic House Cleaning',
    category: 'cleaning',
    revenue: 38000,
    cost: 22800,
    profit: 15200,
    growth: 8,
    bookings: 250,
    avgDuration: 180,
    satisfaction: 4.7
  },
  // Car Wash Services
  {
    name: 'Premium Detail',
    category: 'carwash',
    revenue: 32000,
    cost: 16000,
    profit: 16000,
    growth: 22,
    bookings: 160,
    avgDuration: 180,
    satisfaction: 4.9
  },
  {
    name: 'Express Wash',
    category: 'carwash',
    revenue: 28000,
    cost: 11200,
    profit: 16800,
    growth: 18,
    bookings: 350,
    avgDuration: 30,
    satisfaction: 4.6
  },
  {
    name: 'Interior Detail',
    category: 'carwash',
    revenue: 25000,
    cost: 12500,
    profit: 12500,
    growth: 15,
    bookings: 200,
    avgDuration: 120,
    satisfaction: 4.8
  },
  // Laundromat Services
  {
    name: 'Wash & Fold',
    category: 'laundry',
    revenue: 35000,
    cost: 17500,
    profit: 17500,
    growth: 25,
    bookings: 420,
    avgDuration: 90,
    satisfaction: 4.7
  },
  {
    name: 'Dry Cleaning',
    category: 'laundry',
    revenue: 42000,
    cost: 21000,
    profit: 21000,
    growth: 20,
    bookings: 280,
    avgDuration: 120,
    satisfaction: 4.8
  },
  {
    name: 'Premium Laundry',
    category: 'laundry',
    revenue: 28000,
    cost: 14000,
    profit: 14000,
    growth: 16,
    bookings: 180,
    avgDuration: 150,
    satisfaction: 4.9
  }
];

const monthlyTrends = [
  { month: 'Jan', cleaning: 82000, carwash: 45000, laundry: 55000 },
  { month: 'Feb', cleaning: 88000, carwash: 48000, laundry: 58000 },
  { month: 'Mar', cleaning: 92000, carwash: 52000, laundry: 62000 },
  { month: 'Apr', cleaning: 95000, carwash: 55000, laundry: 65000 },
  { month: 'May', cleaning: 99000, carwash: 58000, laundry: 68000 },
  { month: 'Jun', cleaning: 105000, carwash: 62000, laundry: 72000 }
];

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

export default function ServiceAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredServices = selectedCategory === 'all' 
    ? serviceMetrics 
    : serviceMetrics.filter(service => service.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'cleaning', label: 'Cleaning' },
    { id: 'carwash', label: 'Car Wash' },
    { id: 'laundry', label: 'Laundromat' }
  ];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex justify-center gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.name} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                service.growth >= 15 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {service.growth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {service.growth}% growth
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-lg font-semibold text-gray-900">${service.revenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profit</p>
                <p className="text-lg font-semibold text-gray-900">${service.profit.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bookings</p>
                <p className="text-lg font-semibold text-gray-900">{service.bookings}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Satisfaction</p>
                <p className="text-lg font-semibold text-gray-900">{service.satisfaction}/5.0</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(service.profit / service.revenue) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {((service.profit / service.revenue) * 100).toFixed(1)}% margin
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Service Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cleaning" name="Cleaning" stroke="#3B82F6" />
              <Line type="monotone" dataKey="carwash" name="Car Wash" stroke="#10B981" />
              <Line type="monotone" dataKey="laundry" name="Laundromat" stroke="#8B5CF6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Cleaning', value: serviceMetrics.filter(s => s.category === 'cleaning').reduce((acc, s) => acc + s.revenue, 0) },
                  { name: 'Car Wash', value: serviceMetrics.filter(s => s.category === 'carwash').reduce((acc, s) => acc + s.revenue, 0) },
                  { name: 'Laundromat', value: serviceMetrics.filter(s => s.category === 'laundry').reduce((acc, s) => acc + s.revenue, 0) }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceMetrics.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Car Wash Insights */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Car Wash Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Premium Services</h4>
              <p className="text-sm text-green-700">
                Premium detailing shows 22% growth. Consider expanding premium service capacity.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Peak Hours</h4>
              <p className="text-sm text-blue-700">
                Highest demand during weekends. Implement surge pricing for premium slots.
              </p>
            </div>
          </div>
        </div>

        {/* Laundromat Insights */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Laundromat Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Service Mix</h4>
              <p className="text-sm text-purple-700">
                Wash & Fold service shows highest growth at 25%. Expand express delivery options.
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h4 className="font-medium text-indigo-900 mb-2">Customer Retention</h4>
              <p className="text-sm text-indigo-700">
                Subscription model for regular customers shows 40% higher retention.
              </p>
            </div>
          </div>
        </div>

        {/* Cross-Service Opportunities */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cross-Service Opportunities</h3>
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Bundle Services</h4>
              <p className="text-sm text-amber-700">
                Customers using multiple services show 45% higher lifetime value.
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-lg">
              <h4 className="font-medium text-rose-900 mb-2">Loyalty Program</h4>
              <p className="text-sm text-rose-700">
                Implement cross-service rewards to increase multi-service adoption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}