import { useState } from 'react';
import { X } from 'lucide-react';
import { getAvailableSlots, createBooking } from '../lib/api';
import BookingForm from './booking/BookingForm';
import BookingCalendar from './booking/BookingCalendar';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
}

export default function BookingModal({ isOpen, onClose, serviceType }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Book {serviceType}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <BookingCalendar
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
          />
          
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            serviceType={serviceType}
            onSubmit={createBooking}
            onSuccess={onClose}
          />
        </div>
      </div>
    </div>
  );
}