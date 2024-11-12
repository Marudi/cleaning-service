import React, { useState } from 'react';
import { Package, AlertTriangle, Tool, User } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  status: 'in-use' | 'available' | 'maintenance';
  assignedTo?: {
    id: string;
    name: string;
  };
  lastMaintenance: string;
  nextMaintenance: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

const equipment: Equipment[] = [
  {
    id: '1',
    name: 'Professional Vacuum X2000',
    status: 'in-use',
    assignedTo: {
      id: '1',
      name: 'Sarah Johnson'
    },
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15',
    condition: 'good'
  },
  // Add more equipment...
];

export default function EquipmentTracker() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'in-use':
        return 'bg-blue-100 text-blue-800';
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: Equipment['condition']) => {
    switch (condition) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Equipment Tracker</h2>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Add Equipment
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Package className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {item.assignedTo && (
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  <span>Assigned to: {item.assignedTo.name}</span>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Maintenance:</span>
                  <span>{new Date(item.lastMaintenance).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Maintenance:</span>
                  <span>{new Date(item.nextMaintenance).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className={getConditionColor(item.condition)}>
                    {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                  Update
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                  History
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}