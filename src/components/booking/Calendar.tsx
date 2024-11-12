import React, { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Loader2 } from 'lucide-react';
import { getAvailableSlots } from '../../lib/api';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface CalendarProps {
  selectedDate: Date;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

export default function Calendar({ selectedDate, selectedTime, onDateSelect, onTimeSelect }: CalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      setIsLoading(true);
      setError(null);
      try {
        const slots = await getAvailableSlots(format(selectedDate, 'yyyy-MM-dd'));
        setAvailableSlots(slots);
      } catch (error) {
        setError('Unable to load available slots. Please try again.');
        console.error('Error loading slots:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSlots();
  }, [selectedDate]);

  const weekDays = [...Array(7)].map((_, i) => addDays(currentWeek, i));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ←
            </button>
            <span className="font-medium">
              {format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}
            </span>
            <button
              onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              →
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {weekDays.map((day) => (
            <button
              key={day.toString()}
              onClick={() => onDateSelect(day)}
              className={`p-4 text-center hover:bg-gray-50 transition-colors ${
                isSameDay(day, selectedDate)
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-white'
              }`}
            >
              <div className="text-xs text-gray-500 mb-1">
                {format(day, 'EEE')}
              </div>
              <div className={`text-sm ${
                isSameDay(day, selectedDate) ? 'font-semibold' : ''
              }`}>
                {format(day, 'd')}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium">Available Times</h3>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-600">{error}</div>
        ) : availableSlots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {availableSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => onTimeSelect(slot.time)}
                className={`p-2 text-sm rounded-lg transition-colors ${
                  selectedTime === slot.time
                    ? 'bg-blue-600 text-white'
                    : slot.available
                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {format(parseISO(`2000-01-01T${slot.time}`), 'h:mm a')}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No available slots for this date. Please select another date.
          </div>
        )}
      </div>
    </div>
  );
}