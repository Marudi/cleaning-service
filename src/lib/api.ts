import { API_URL } from '../config/environment';
import { BookingFormData, ContactFormData, JobApplicationData } from '../types/forms';

interface TimeSlot {
  time: string;
  available: boolean;
}

const DEFAULT_SLOTS: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '01:00 PM', available: true },
  { time: '02:00 PM', available: true },
  { time: '03:00 PM', available: true },
  { time: '04:00 PM', available: true }
];

export async function getAvailableSlots(date: string): Promise<TimeSlot[]> {
  try {
    const response = await fetch(`${API_URL}/bookings/slots?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`Using default slots due to API error: ${response.status}`);
      return DEFAULT_SLOTS;
    }

    const data = await response.json();
    return data.slots;
  } catch (error) {
    console.warn('Using default slots due to API error:', error);
    return DEFAULT_SLOTS;
  }
}

export async function createBooking(data: BookingFormData): Promise<{ success: boolean; bookingId: string }> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to create booking');
  }

  const result = await response.json();
  return {
    success: true,
    bookingId: result.id
  };
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to submit contact form');
  }

  return { success: true };
}

export async function submitJobApplication(data: JobApplicationData): Promise<{ success: boolean }> {
  const response = await fetch(`${API_URL}/careers/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to submit job application');
  }

  return { success: true };
}

export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    return null;
  }
}