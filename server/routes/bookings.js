import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get available slots for a specific date
router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Get all bookings for the selected date
    const existingBookings = await prisma.booking.findMany({
      where: {
        date: {
          gte: new Date(selectedDate.setHours(0, 0, 0, 0)),
          lt: new Date(selectedDate.setHours(23, 59, 59, 999))
        }
      },
      select: {
        time: true
      }
    });

    // Define all possible time slots
    const allSlots = [
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ].map(time => ({
      time,
      available: !existingBookings.some(booking => booking.time === time)
    }));

    res.json({ slots: allSlots });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ 
      error: 'Failed to fetch available slots',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Create booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      serviceType,
      date,
      time,
      name,
      email,
      phone,
      address,
      frequency,
      propertySize,
      specialInstructions
    } = req.body;

    // Validate required fields
    if (!serviceType || !date || !time || !name || !email || !phone || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if slot is still available
    const existingBooking = await prisma.booking.findFirst({
      where: {
        date: new Date(date),
        time: time
      }
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Selected time slot is no longer available' });
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        serviceId: serviceType,
        date: new Date(date),
        time,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        address,
        frequency,
        propertySize,
        notes: specialInstructions,
        status: 'scheduled'
      }
    });

    res.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ 
      error: 'Failed to create booking',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;