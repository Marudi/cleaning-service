import React, { useState } from 'react';
import { format, addDays, startOfWeek, isToday, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, addWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, Plus } from 'lucide-react';
import AddStaffModal from './AddStaffModal';

interface ScheduleEvent {
  id: string;
  staffId: string;
  staffName: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'cleaning' | 'maintenance' | 'training';
}

interface StaffScheduleCalendarProps {
  timeframe?: string;
  onStaffSelect?: (staffId: string) => void;
}

type CalendarView = 'day' | 'week' | 'month' | '3month';

export default function StaffScheduleCalendar({ timeframe = 'week', onStaffSelect }: StaffScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('week');
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  // Mock schedule data with proper date formatting
  const scheduleEvents: ScheduleEvent[] = [
    {
      id: '1',
      staffId: '1',
      staffName: 'Sarah Johnson',
      location: '123 Main St',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '11:00',
      type: 'cleaning'
    },
    {
      id: '2',
      staffId: '2',
      staffName: 'Michael Chen',
      location: '456 Oak Ave',
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: '13:00',
      endTime: '15:00',
      type: 'maintenance'
    }
  ];

  const getEventColor = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'cleaning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'training':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventsForDay = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return scheduleEvents.filter(event => event.date === formattedDate);
  };

  const getDaysForView = () => {
    switch (view) {
      case 'day':
        return [currentDate];
      case 'week':
        return [...Array(7)].map((_, i) => addDays(startOfWeek(currentDate), i));
      case 'month': {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(currentDate);
        return eachDayOfInterval({ start, end });
      }
      case '3month': {
        const start = startOfMonth(currentDate);
        const end = endOfMonth(addMonths(currentDate, 2));
        return eachDayOfInterval({ start, end });
      }
      default:
        return [];
    }
  };

  const navigate = (direction: 'prev' | 'next') => {
    switch (view) {
      case 'day':
        setCurrentDate(prev => addDays(prev, direction === 'next' ? 1 : -1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, direction === 'next' ? 1 : -1));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, direction === 'next' ? 1 : -1));
        break;
      case '3month':
        setCurrentDate(prev => addMonths(prev, direction === 'next' ? 3 : -3));
        break;
    }
  };

  const getDateRangeText = () => {
    switch (view) {
      case 'day':
        return format(currentDate, 'MMMM d, yyyy');
      case 'week': {
        const weekStart = startOfWeek(currentDate);
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      }
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case '3month': {
        const monthEnd = addMonths(currentDate, 2);
        return `${format(currentDate, 'MMM yyyy')} - ${format(monthEnd, 'MMM yyyy')}`;
      }
      default:
        return '';
    }
  };

  const days = getDaysForView();
  const gridCols = view === 'day' ? 1 : view === 'week' ? 7 : 7;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">Staff Schedule</h2>
            <button
              onClick={() => setShowAddStaffModal(true)}
              className="ml-4 flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Staff
            </button>
          </div>
          <div className="flex items-center gap-2">
            {(['day', 'week', 'month', '3month'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  view === v
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-medium">{getDateRangeText()}</span>
          <button
            onClick={() => navigate('next')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-${gridCols} gap-px bg-gray-200`}>
        {days.map((day) => (
          <div key={day.toString()} className="bg-white">
            <div className={`p-2 text-center ${isToday(day) ? 'bg-blue-50' : ''}`}>
              <div className="text-sm font-medium text-gray-900">
                {format(day, view === '3month' ? 'MMM d' : 'EEE')}
              </div>
              <div className={`text-2xl font-semibold ${
                isToday(day) ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {format(day, 'd')}
              </div>
            </div>
            <div className={`${view === '3month' ? 'min-h-[60px]' : 'min-h-[120px]'} p-2 space-y-2`}>
              {getEventsForDay(day).map((event) => (
                <button
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    onStaffSelect?.(event.staffId);
                  }}
                  className={`w-full text-left p-2 rounded border ${getEventColor(event.type)} hover:shadow-md transition-shadow ${
                    view === '3month' ? 'text-xs' : ''
                  }`}
                >
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <User className="h-4 w-4" />
                    {event.staffName}
                  </div>
                  {view !== '3month' && (
                    <>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <Clock className="h-3 w-3" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Event Details</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Staff Member</label>
                <p className="text-gray-900">{selectedEvent.staffName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Time</label>
                <p className="text-gray-900">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Location</label>
                <p className="text-gray-900">{selectedEvent.location}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Type</label>
                <p className="text-gray-900 capitalize">{selectedEvent.type}</p>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Handle edit action
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={showAddStaffModal}
        onClose={() => setShowAddStaffModal(false)}
      />
    </div>
  );
}