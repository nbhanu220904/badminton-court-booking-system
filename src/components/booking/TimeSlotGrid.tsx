import { TimeSlot, Court } from '@/types/booking';
import { cn } from '@/lib/utils';
import { Clock, Zap, Leaf } from 'lucide-react';
import { isPeakHour, isWeekend } from '@/utils/priceCalculator';

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSelect: (slot: TimeSlot) => void;
  selectedDate: Date;
  court: Court;
}

export function TimeSlotGrid({ slots, selectedSlot, onSelect, selectedDate, court }: TimeSlotGridProps) {
  const getSlotPrice = (slot: TimeSlot): number => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    let price = court.basePrice;
    
    // Peak hour multiplier
    if (isPeakHour(hour)) {
      price = price * 1.5;
    }
    // Morning discount
    if (hour >= 6 && hour < 9) {
      price = price * 0.8;
    }
    // Weekend surcharge
    if (isWeekend(selectedDate)) {
      price += 10;
    }
    // Premium court surcharge
    if (court.type === 'indoor' && court.basePrice >= 25) {
      price += 5;
    }
    
    return Math.round(price);
  };

  const getSlotModifier = (slot: TimeSlot): { label: string; icon: React.ElementType; color: string } | null => {
    const hour = parseInt(slot.startTime.split(':')[0]);
    
    if (isPeakHour(hour)) {
      return { label: 'Peak', icon: Zap, color: 'text-warning' };
    }
    if (hour >= 6 && hour < 9) {
      return { label: 'Discount', icon: Leaf, color: 'text-success' };
    }
    return null;
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {slots.map((slot) => {
        const isSelected = selectedSlot?.id === slot.id;
        const price = getSlotPrice(slot);
        const modifier = getSlotModifier(slot);
        
        return (
          <button
            key={slot.id}
            onClick={() => slot.available && onSelect(slot)}
            disabled={!slot.available}
            className={cn(
              'relative rounded-lg p-3 text-center transition-all duration-200',
              slot.available
                ? isSelected
                  ? 'bg-accent text-accent-foreground shadow-md ring-2 ring-accent ring-offset-2'
                  : 'bg-card border border-border hover:border-accent/50 hover:shadow-sm'
                : 'bg-muted/50 cursor-not-allowed opacity-50'
            )}
          >
            {modifier && slot.available && (
              <span
                className={cn(
                  'absolute -top-1 -right-1 p-1 rounded-full bg-card shadow-sm',
                  modifier.color
                )}
              >
                <modifier.icon className="w-3 h-3" />
              </span>
            )}
            
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className={cn(
                'w-3 h-3',
                isSelected ? 'text-accent-foreground/70' : 'text-muted-foreground'
              )} />
              <span className={cn(
                'text-xs font-medium',
                isSelected ? 'text-accent-foreground' : 'text-foreground'
              )}>
                {slot.startTime}
              </span>
            </div>
            
            <p className={cn(
              'text-sm font-bold',
              isSelected ? 'text-accent-foreground' : 'text-foreground',
              !slot.available && 'line-through'
            )}>
              {slot.available ? `$${price}` : 'Booked'}
            </p>
          </button>
        );
      })}
    </div>
  );
}
