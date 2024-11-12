import { z } from 'zod';

export const bookingFormSchema = z.object({
  serviceType: z.string(),
  date: z.string().or(z.date()),
  time: z.string().min(1, 'Please select a time'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Address is required'),
  frequency: z.enum(['one-time', 'weekly', 'bi-weekly', 'monthly']),
  propertySize: z.enum(['small', 'medium', 'large', 'extra-large']),
  specialInstructions: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const jobApplicationSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  position: z.string().min(1, 'Position is required'),
  experience: z.string().min(1, 'Experience is required'),
  resume: z.string().optional(),
  coverLetter: z.string().optional(),
});

export type JobApplicationData = z.infer<typeof jobApplicationSchema>;