import React, { useState } from 'react';
import { Calendar as CalendarIcon, Users, Clock, AlertCircle, X } from 'lucide-react';
import { format, addWeeks, startOfWeek, addDays } from 'date-fns';

interface Staff {
  id: string;
  name: string;
  role: string;
  availability: string[];
  assignedShifts: Shift[];
}

interface Shift {
  id: string;
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}

const staffMembers: Staff[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Senior Cleaner',
    availability: ['Monday', 'Tuesday', 'Wednesday'],
    assignedShifts: []
  },
  {
    id: '2',
    name: 'Bob Smith',
    role: 'Cleaner',
    availability: ['Thursday', 'Friday', 'Saturday'],
    assignedShifts: []
  }
];

const locations = [
  'Downtown Office',
  'Westside Branch',
  'North Center',
  'South Plaza'
];

export default function StaffScheduling() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShift, setNewShift] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '09:00',
    endTime: '17:00',
    location: locations[0]
  });

  const weekDays = [...Array(7)].map((_, i) => addDays(currentWeek, i));

  const handleAddShift = async () => {
    if (!selectedStaff) return;

    try {
      const response = await fetch('/api/staff/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          staffId: selectedStaff.id,
          ...newShift
        })
      });

      if (!response.ok) throw new Error('Failed to add shift');

      // Reset form and close modal
      setNewShift({
        date: format(new Date(), 'yyyy-MM-dd'),
        startTime: '09:00',
        endTime: '17:00',
        location: locations[0]
      });
      setIsModalOpen(false);

      // Refresh schedule data here
    } catch (error) {
      console.error('Failed to add shift:', error);
      alert('Failed to add shift. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Staff Scheduling</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Shift
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
              <button
                onClick={() => setCurrentWeek(addWeeks(currentWeek, -1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ←
              </button>
              <span className="font-medium">
                {format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}
              </span>
              <button
                onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {weekDays.map((day) => (
                <div key={day.toString()} className="bg-white p-4">
                  <div className="text-sm font-medium text-gray-900 mb-1">
                    {format(day, 'EEE d')}
                  </div>
                  <div className="space-y-2">
                    <div className="bg-blue-50 p-2 rounded text-sm">
                      <div className="font-medium text-blue-900">Alice J.</div>
                      <div className="text-blue-700">9:00 AM - 5:00 PM</div>
                      <div className="text-blue-600 text-xs">Downtown Office</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Staff List</h3>
            <div className="space-y-4">
              {staffMembers.map((staff) => (
                <button
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff)}
                  className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                    selectedStaff?.id === staff.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Users className="h-8 w-8 text-gray-400 mr-3" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{staff.name}</div>
                    <div className="text-sm text-gray-600">{staff.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center text-yellow-600">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">2 shift conflicts this week</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-sm">3 pending shift requests</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Shift Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Shift</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Staff Member</label>
                <select
                  value={selectedStaff?.id || ''}
                  onChange={(e) => setSelectedStaff(staffMembers.find(s => s.id === e.target.value) || null)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select staff member</option>
                  {staffMembers.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} - {staff.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={newShift.date}
                  onChange={(e) => setNewShift({ ...newShift, date: e.target.value })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={newShift.startTime}
                    onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={newShift.endTime}
                    onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  value={newShift.location}
                  onChange={(e) => setNewShift({ ...newShift, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddShift}
                  disabled={!selectedStaff}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}