import React, { useState } from 'react';
import { Search, Filter, UserPlus, Star } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  rating: number;
  availability: string;
  certifications: string[];
  activeJobs: number;
}

const staffMembers: StaffMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Senior Cleaner',
    rating: 4.8,
    availability: 'Full-time',
    certifications: ['Deep Clean', 'Bio-hazard'],
    activeJobs: 3
  },
  // Add more staff members...
];

export default function StaffDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Staff Directory</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Add Staff
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="senior">Senior Cleaners</option>
            <option value="regular">Regular Cleaners</option>
            <option value="trainee">Trainees</option>
          </select>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staffMembers.map((staff) => (
            <div key={staff.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{staff.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{staff.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{staff.role}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {staff.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{staff.availability}</span>
                <span>{staff.activeJobs} active jobs</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}