import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Clock } from 'lucide-react';
import { bookingFormSchema, type BookingFormData } from '../../types/forms';

interface BookingFormProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  serviceType: string;
  onSubmit: (data: BookingFormData) => Promise<void>;
  onClose: () => void;
}

const serviceTypes = [
  { id: 'regular-cleaning', label: 'Regular Cleaning' },
  { id: 'deep-cleaning', label: 'Deep Cleaning' },
  { id: 'move-in-out', label: 'Move In/Out Cleaning' },
  { id: 'carpet-cleaning', label: 'Carpet Cleaning' },
  { id: 'window-cleaning', label: 'Window Cleaning' }
];

const frequencies = [
  { id: 'one-time', label: 'One Time' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'bi-weekly', label: 'Bi-Weekly' },
  { id: 'monthly', label: 'Monthly' }
];

const propertySizes = [
  { id: 'small', label: 'Small (up to 1,000 sq ft)' },
  { id: 'medium', label: 'Medium (1,001 - 2,000 sq ft)' },
  { id: 'large', label: 'Large (2,001 - 3,000 sq ft)' },
  { id: 'extra-large', label: 'Extra Large (3,000+ sq ft)' }
];

export default function BookingForm({ 
  selectedDate,
  selectedTime,
  serviceType,
  onSubmit,
  onClose 
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      serviceType,
      date: selectedDate || new Date(),
      time: selectedTime || '',
      frequency: 'one-time',
      propertySize: 'medium'
    }
  });

  const handleFormSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Booking submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Service Type</label>
        <select
          {...register('serviceType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {serviceTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <div className="mt-1 relative">
          <input
            type="date"
            {...register('date')}
            min={new Date().toISOString().split('T')[0]}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <div className="mt-1 relative">
          <select
            {...register('time')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a time</option>
            {selectedTime && (
              <option value={selectedTime}>{selectedTime}</option>
            )}
          </select>
          <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.time && (
          <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          {...register('email')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          {...register('phone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          {...register('address')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Frequency</label>
        <select
          {...register('frequency')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {frequencies.map(freq => (
            <option key={freq.id} value={freq.id}>
              {freq.label}
            </option>
          ))}
        </select>
        {errors.frequency && (
          <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Property Size</label>
        <select
          {...register('propertySize')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {propertySizes.map(size => (
            <option key={size.id} value={size.id}>
              {size.label}
            </option>
          ))}
        </select>
        {errors.propertySize && (
          <p className="mt-1 text-sm text-red-600">{errors.propertySize.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
        <textarea
          {...register('specialInstructions')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Any special requirements or instructions..."
        />
        {errors.specialInstructions && (
          <p className="mt-1 text-sm text-red-600">{errors.specialInstructions.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </form>
  );
}