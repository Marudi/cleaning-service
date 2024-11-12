import React from 'react';

interface TimeSlotsProps {
  slots: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export default function TimeSlots({ slots, selectedTime, onSelectTime }: TimeSlotsProps) {
  if (!slots.length) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-gray-500">
          No available slots for the selected date. Please choose another date.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {slots.map((time) => (
        <button
          key={time}
          onClick={() => onSelectTime(time)}
          className={`rounded-lg border p-3 text-center transition-colors ${
            selectedTime === time
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50'
          }`}
        >
          {time}
        </button>
      ))}
    </div>
  );
}