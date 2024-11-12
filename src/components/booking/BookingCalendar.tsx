import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import type { TimeSlot } from '../../types/forms';
import { getAvailableSlots } from '../../lib/api';

interface BookingCalendarProps {
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

export default function BookingCalendar({
  onDateSelect,
  onTimeSelect
}: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSlots() {
      setLoading(true);
      try {
        const slots = await getAvailableSlots(selectedDate, 'all');
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error loading slots:', error);
        setAvailableSlots([]);
      } finally {
        setLoading(false);
      }
    }

    loadSlots();
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Select Date</h3>
        </div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => handleDateSelect(new Date(e.target.value))}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Select Time</h3>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading available slots...</div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelect(slot.time)}
                disabled={!slot.available}
                className={`p-2 text-sm rounded-md transition-colors ${
                  slot.available
                    ? 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}