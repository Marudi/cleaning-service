import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, X, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, addWeeks, addDays, startOfWeek, isToday, isSameMonth } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema, type BookingFormData } from '../../types/forms';
import { createBooking } from '../../lib/api';

interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

type CalendarView = 'day' | 'week' | 'month' | 'custom';

export default function FrontDeskDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<CalendarView>('month');
  const [monthsToShow, setMonthsToShow] = useState(1);

  const appointments: Appointment[] = [
    {
      id: '1',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      address: '123 Main St, City, State',
      service: 'Deep Clean',
      time: '09:00 AM',
      status: 'scheduled'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      address: '456 Oak St, City, State',
      service: 'Basic Clean',
      time: '10:30 AM',
      status: 'in-progress'
    }
  ];

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickAction = async (action: 'call' | 'email' | 'map', appointment: Appointment) => {
    switch (action) {
      case 'call':
        window.location.href = `tel:${appointment.phone}`;
        break;
      case 'email':
        window.location.href = `mailto:${appointment.email}`;
        break;
      case 'map':
        window.open(`https://maps.google.com/?q=${encodeURIComponent(appointment.address)}`, '_blank');
        break;
    }
  };

  const handleCancelAppointment = async (appointment: Appointment) => {
    try {
      await fetch(`/api/appointments/${appointment.id}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      await fetch('/api/notifications/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          to: appointment.email,
          subject: 'Appointment Cancellation',
          template: 'appointment-cancelled',
          data: {
            customerName: appointment.customerName,
            appointmentDate: format(new Date(), 'PPP'),
            appointmentTime: appointment.time,
            service: appointment.service
          }
        })
      });

      setIsCancelModalOpen(false);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const getDaysToShow = () => {
    switch (calendarView) {
      case 'day':
        return [selectedDate];
      case 'week':
        return [...Array(7)].map((_, i) => addDays(startOfWeek(selectedDate), i));
      case 'month':
        return eachDayOfInterval({
          start: startOfMonth(selectedDate),
          end: endOfMonth(selectedDate)
        });
      case 'custom':
        const start = startOfMonth(selectedDate);
        const end = endOfMonth(addMonths(selectedDate, monthsToShow - 1));
        return eachDayOfInterval({ start, end });
    }
  };

  const navigate = (direction: 'prev' | 'next') => {
    switch (calendarView) {
      case 'day':
        setSelectedDate(date => addDays(date, direction === 'next' ? 1 : -1));
        break;
      case 'week':
        setSelectedDate(date => addWeeks(date, direction === 'next' ? 1 : -1));
        break;
      case 'month':
      case 'custom':
        setSelectedDate(date => addMonths(date, direction === 'next' ? monthsToShow : -monthsToShow));
        break;
    }
  };

  const getDateRangeText = () => {
    switch (calendarView) {
      case 'day':
        return format(selectedDate, 'MMMM d, yyyy');
      case 'week': {
        const weekStart = startOfWeek(selectedDate);
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
      }
      case 'month':
        return format(selectedDate, 'MMMM yyyy');
      case 'custom': {
        const endDate = addMonths(selectedDate, monthsToShow - 1);
        return `${format(selectedDate, 'MMM yyyy')} - ${format(endDate, 'MMM yyyy')}`;
      }
    }
  };

  const days = getDaysToShow();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Front Desk Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <select
              value={calendarView}
              onChange={(e) => setCalendarView(e.target.value as CalendarView)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="day">Day View</option>
              <option value="week">Week View</option>
              <option value="month">Month View</option>
              <option value="custom">Custom Months</option>
            </select>
            {calendarView === 'custom' && (
              <select
                value={monthsToShow}
                onChange={(e) => setMonthsToShow(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} Month{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            )}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New Appointment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold text-gray-900">{getDateRangeText()}</h3>
              <button
                onClick={() => navigate('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-${calendarView === 'day' ? '1' : '7'} gap-px bg-gray-200`}>
          {days.map((day) => (
            <div
              key={day.toString()}
              className={`bg-white min-h-[120px] ${
                !isSameMonth(day, selectedDate) ? 'bg-gray-50' : ''
              } ${isToday(day) ? 'bg-blue-50' : ''}`}
            >
              <div className="p-2 sticky top-0 bg-inherit z-10 border-b">
                <span className={`text-sm font-medium ${
                  isToday(day) ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {format(day, calendarView === 'day' ? 'MMMM d, yyyy' : 'd')}
                </span>
              </div>
              <div className="p-1 space-y-1">
                {appointments.map((appointment) => (
                  <button
                    key={appointment.id}
                    onClick={() => setSelectedAppointment(appointment)}
                    className={`w-full text-left p-2 rounded-lg text-sm ${getStatusColor(appointment.status)} hover:shadow-md transition-shadow`}
                  >
                    <div className="font-medium">{appointment.time}</div>
                    <div className="truncate">{appointment.customerName}</div>
                    <div className="truncate text-xs">{appointment.service}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Customer</label>
                <p className="text-gray-900">{selectedAppointment.customerName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Service</label>
                <p className="text-gray-900">{selectedAppointment.service}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Time</label>
                <p className="text-gray-900">{selectedAppointment.time}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                  {selectedAppointment.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between pt-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleQuickAction('call', selectedAppointment)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Phone className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleQuickAction('email', selectedAppointment)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleQuickAction('map', selectedAppointment)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <MapPin className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setSelectedAppointment(null);
                      setIsCancelModalOpen(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {isCancelModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                Cancel Appointment
              </h3>
            </div>

            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel the appointment for{' '}
              <span className="font-medium">{selectedAppointment.customerName}</span>?
              An email notification will be sent to the customer.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setSelectedAppointment(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                No, Keep It
              </button>
              <button
                onClick={() => handleCancelAppointment(selectedAppointment)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}