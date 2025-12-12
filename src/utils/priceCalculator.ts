import { Court, Coach, BookingResource, PricingBreakdown, PricingRule } from '@/types/booking';
import { equipment, pricingRules } from '@/data/mockData';

export function calculatePrice(
  court: Court,
  date: Date,
  startTime: string,
  resources: BookingResource,
  rules: PricingRule[] = pricingRules
): PricingBreakdown {
  const hour = parseInt(startTime.split(':')[0]);
  const day = date.getDay();
  
  let basePrice = court.basePrice;
  let peakHourFee = 0;
  let weekendFee = 0;
  let premiumCourtFee = 0;
  let equipmentFee = 0;
  let coachFee = 0;

  // Apply pricing rules
  rules.forEach(rule => {
    if (!rule.active) return;

    switch (rule.type) {
      case 'time':
        if (rule.startHour !== undefined && rule.endHour !== undefined) {
          if (hour >= rule.startHour && hour < rule.endHour) {
            if (rule.multiplier) {
              const multiplierEffect = basePrice * (rule.multiplier - 1);
              if (rule.multiplier > 1) {
                peakHourFee = multiplierEffect;
              } else {
                peakHourFee = multiplierEffect; // Negative for discount
              }
            }
          }
        }
        break;

      case 'day':
        if (rule.days && rule.days.includes(day) && rule.surcharge) {
          weekendFee = rule.surcharge;
        }
        break;

      case 'premium':
        if (court.type === 'indoor' && court.basePrice >= 25 && rule.surcharge) {
          premiumCourtFee = rule.surcharge;
        }
        break;
    }
  });

  // Calculate equipment costs
  const racket = equipment.find(e => e.type === 'racket');
  const shoes = equipment.find(e => e.type === 'shoes');
  const shuttlecocks = equipment.find(e => e.type === 'shuttlecock');

  if (racket) equipmentFee += resources.rackets * racket.pricePerHour;
  if (shoes) equipmentFee += resources.shoes * shoes.pricePerHour;
  if (shuttlecocks) equipmentFee += resources.shuttlecocks * shuttlecocks.pricePerHour;

  // Coach fee
  if (resources.coach) {
    coachFee = resources.coach.hourlyRate;
  }

  const total = basePrice + peakHourFee + weekendFee + premiumCourtFee + equipmentFee + coachFee;

  return {
    basePrice,
    peakHourFee,
    weekendFee,
    premiumCourtFee,
    equipmentFee,
    coachFee,
    total: Math.max(0, total),
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function isPeakHour(hour: number): boolean {
  return hour >= 18 && hour < 21;
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}
