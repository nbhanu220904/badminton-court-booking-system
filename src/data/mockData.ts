import { Court, Coach, Equipment, PricingRule, TimeSlot } from '@/types/booking';

export const courts: Court[] = [
  {
    id: 'court-1',
    name: 'Court A - Premium Indoor',
    type: 'indoor',
    basePrice: 25,
    image: '/placeholder.svg',
    amenities: ['Air Conditioned', 'Professional Flooring', 'LED Lighting', 'Spectator Seating'],
  },
  {
    id: 'court-2',
    name: 'Court B - Standard Indoor',
    type: 'indoor',
    basePrice: 20,
    image: '/placeholder.svg',
    amenities: ['Air Conditioned', 'Professional Flooring', 'LED Lighting'],
  },
  {
    id: 'court-3',
    name: 'Court C - Outdoor',
    type: 'outdoor',
    basePrice: 15,
    image: '/placeholder.svg',
    amenities: ['Natural Lighting', 'Covered Roof', 'Night Lights'],
  },
  {
    id: 'court-4',
    name: 'Court D - Tournament',
    type: 'indoor',
    basePrice: 35,
    image: '/placeholder.svg',
    amenities: ['Competition Grade', 'Live Streaming', 'VIP Lounge', 'Air Conditioned'],
  },
];

export const coaches: Coach[] = [
  {
    id: 'coach-1',
    name: 'Sarah Chen',
    specialty: 'Singles Strategy',
    hourlyRate: 40,
    avatar: '/placeholder.svg',
    rating: 4.9,
    available: true,
  },
  {
    id: 'coach-2',
    name: 'Marcus Williams',
    specialty: 'Doubles Tactics',
    hourlyRate: 35,
    avatar: '/placeholder.svg',
    rating: 4.7,
    available: true,
  },
  {
    id: 'coach-3',
    name: 'Yuki Tanaka',
    specialty: 'Youth Training',
    hourlyRate: 30,
    avatar: '/placeholder.svg',
    rating: 4.8,
    available: false,
  },
  {
    id: 'coach-4',
    name: 'James Rodriguez',
    specialty: 'Advanced Techniques',
    hourlyRate: 50,
    avatar: '/placeholder.svg',
    rating: 5.0,
    available: true,
  },
];

export const equipment: Equipment[] = [
  {
    id: 'equip-1',
    name: 'Pro Racket',
    type: 'racket',
    pricePerHour: 5,
    totalStock: 20,
    availableStock: 15,
    image: '/placeholder.svg',
  },
  {
    id: 'equip-2',
    name: 'Court Shoes',
    type: 'shoes',
    pricePerHour: 3,
    totalStock: 30,
    availableStock: 25,
    image: '/placeholder.svg',
  },
  {
    id: 'equip-3',
    name: 'Feather Shuttlecocks (6 pack)',
    type: 'shuttlecock',
    pricePerHour: 8,
    totalStock: 50,
    availableStock: 42,
    image: '/placeholder.svg',
  },
];

export const pricingRules: PricingRule[] = [
  {
    id: 'rule-1',
    name: 'Peak Hours',
    type: 'time',
    startHour: 18,
    endHour: 21,
    multiplier: 1.5,
    active: true,
  },
  {
    id: 'rule-2',
    name: 'Morning Discount',
    type: 'time',
    startHour: 6,
    endHour: 9,
    multiplier: 0.8,
    active: true,
  },
  {
    id: 'rule-3',
    name: 'Weekend Surcharge',
    type: 'day',
    days: [0, 6],
    surcharge: 10,
    active: true,
  },
  {
    id: 'rule-4',
    name: 'Premium Court Fee',
    type: 'premium',
    surcharge: 5,
    active: true,
  },
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const bookedSlots = ['09:00', '14:00', '18:00']; // Mock booked slots
  
  for (let hour = 6; hour <= 21; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    const isBooked = bookedSlots.includes(startTime);
    
    slots.push({
      id: `slot-${hour}`,
      startTime,
      endTime,
      available: !isBooked,
      price: 20, // Base price, will be calculated dynamically
    });
  }
  
  return slots;
};
