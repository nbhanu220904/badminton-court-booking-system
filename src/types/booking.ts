export interface Court {
  id: string;
  name: string;
  type: 'indoor' | 'outdoor';
  basePrice: number;
  image: string;
  amenities: string[];
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  hourlyRate: number;
  avatar: string;
  rating: number;
  available: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'racket' | 'shoes' | 'shuttlecock';
  pricePerHour: number;
  totalStock: number;
  availableStock: number;
  image: string;
}

export interface PricingRule {
  id: string;
  name: string;
  type: 'time' | 'day' | 'premium';
  startHour?: number;
  endHour?: number;
  days?: number[];
  multiplier?: number;
  surcharge?: number;
  active: boolean;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
  price: number;
}

export interface BookingResource {
  rackets: number;
  shoes: number;
  shuttlecocks: number;
  coach?: Coach | null;
}

export interface PricingBreakdown {
  basePrice: number;
  peakHourFee: number;
  weekendFee: number;
  premiumCourtFee: number;
  equipmentFee: number;
  coachFee: number;
  total: number;
}

export interface Booking {
  id: string;
  courtId: string;
  userId: string;
  date: Date;
  startTime: string;
  endTime: string;
  resources: BookingResource;
  status: 'confirmed' | 'cancelled' | 'waitlist' | 'pending';
  pricingBreakdown: PricingBreakdown;
  createdAt: Date;
}
