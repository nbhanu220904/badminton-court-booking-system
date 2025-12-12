import { format } from 'date-fns';
import { Court, TimeSlot, BookingResource, PricingBreakdown } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { formatPrice, isPeakHour, isWeekend } from '@/utils/priceCalculator';
import { Calendar, Clock, MapPin, Zap, Sun, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingSummaryProps {
  court: Court | null;
  date: Date;
  slot: TimeSlot | null;
  resources: BookingResource;
  breakdown: PricingBreakdown | null;
  onBook: () => void;
}

export function PricingSummary({
  court,
  date,
  slot,
  resources,
  breakdown,
  onBook,
}: PricingSummaryProps) {
  const hour = slot ? parseInt(slot.startTime.split(':')[0]) : 0;

  if (!court) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Booking Summary
        </h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Select a court to start your booking
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-primary p-5">
        <h3 className="font-display font-semibold text-lg text-primary-foreground mb-1">
          Booking Summary
        </h3>
        <p className="text-primary-foreground/70 text-sm">
          Live pricing based on your selections
        </p>
      </div>

      <div className="p-5 space-y-5">
        {/* Court Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">{court.name}</p>
              <p className="text-sm text-muted-foreground capitalize">{court.type} Court</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">{format(date, 'EEEE, MMMM d')}</p>
              {isWeekend(date) && (
                <p className="text-sm text-warning font-medium">Weekend Rate</p>
              )}
            </div>
          </div>

          {slot && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {slot.startTime} - {slot.endTime}
                </p>
                {isPeakHour(hour) && (
                  <p className="text-sm text-warning font-medium flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Peak Hour
                  </p>
                )}
                {hour >= 6 && hour < 9 && (
                  <p className="text-sm text-success font-medium flex items-center gap-1">
                    <Sun className="w-3 h-3" /> Morning Discount
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        {breakdown && (
          <>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base Price</span>
                <span className="font-medium text-foreground">
                  {formatPrice(breakdown.basePrice)}
                </span>
              </div>

              {breakdown.peakHourFee !== 0 && (
                <div className="flex justify-between text-sm">
                  <span className={cn(
                    breakdown.peakHourFee > 0 ? 'text-warning' : 'text-success'
                  )}>
                    {breakdown.peakHourFee > 0 ? 'Peak Hour Fee' : 'Morning Discount'}
                  </span>
                  <span className={cn(
                    'font-medium',
                    breakdown.peakHourFee > 0 ? 'text-warning' : 'text-success'
                  )}>
                    {breakdown.peakHourFee > 0 ? '+' : ''}{formatPrice(breakdown.peakHourFee)}
                  </span>
                </div>
              )}

              {breakdown.weekendFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-warning">Weekend Surcharge</span>
                  <span className="font-medium text-warning">
                    +{formatPrice(breakdown.weekendFee)}
                  </span>
                </div>
              )}

              {breakdown.premiumCourtFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Premium Court</span>
                  <span className="font-medium text-foreground">
                    +{formatPrice(breakdown.premiumCourtFee)}
                  </span>
                </div>
              )}

              {breakdown.equipmentFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Equipment</span>
                  <span className="font-medium text-foreground">
                    +{formatPrice(breakdown.equipmentFee)}
                  </span>
                </div>
              )}

              {breakdown.coachFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coach ({resources.coach?.name})</span>
                  <span className="font-medium text-foreground">
                    +{formatPrice(breakdown.coachFee)}
                  </span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-semibold text-lg text-foreground">
                  Total
                </span>
                <span className="font-display font-bold text-2xl text-accent">
                  {formatPrice(breakdown.total)}
                </span>
              </div>
            </div>
          </>
        )}

        {/* Book Button */}
        <Button
          variant="hero"
          size="xl"
          className="w-full group"
          onClick={onBook}
          disabled={!slot}
        >
          {slot ? 'Confirm Booking' : 'Select a Time Slot'}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
