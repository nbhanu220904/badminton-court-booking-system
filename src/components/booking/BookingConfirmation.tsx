import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Court, TimeSlot, BookingResource, PricingBreakdown } from '@/types/booking';
import { formatPrice } from '@/utils/priceCalculator';
import { Check, Calendar, Clock, MapPin, User, Package } from 'lucide-react';

interface BookingConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  court: Court | null;
  date: Date;
  slot: TimeSlot | null;
  resources: BookingResource;
  breakdown: PricingBreakdown | null;
}

export function BookingConfirmation({
  open,
  onClose,
  onConfirm,
  court,
  date,
  slot,
  resources,
  breakdown,
}: BookingConfirmationProps) {
  if (!court || !slot || !breakdown) return null;

  const hasEquipment = resources.rackets > 0 || resources.shoes > 0 || resources.shuttlecocks > 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-success" />
            </div>
            Confirm Your Booking
          </DialogTitle>
          <DialogDescription>
            Please review your booking details before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Court */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <MapPin className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium text-foreground">{court.name}</p>
              <p className="text-sm text-muted-foreground capitalize">{court.type} Court</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium text-foreground text-sm">
                  {format(date, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-medium text-foreground text-sm">
                  {slot.startTime} - {slot.endTime}
                </p>
              </div>
            </div>
          </div>

          {/* Coach */}
          {resources.coach && (
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <User className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Coach</p>
                <p className="font-medium text-foreground">{resources.coach.name}</p>
              </div>
            </div>
          )}

          {/* Equipment */}
          {hasEquipment && (
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Package className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Equipment</p>
                <p className="font-medium text-foreground text-sm">
                  {[
                    resources.rackets > 0 && `${resources.rackets} Racket${resources.rackets > 1 ? 's' : ''}`,
                    resources.shoes > 0 && `${resources.shoes} Shoes`,
                    resources.shuttlecocks > 0 && `${resources.shuttlecocks} Shuttlecock Pack${resources.shuttlecocks > 1 ? 's' : ''}`,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
            <span className="font-display font-semibold text-foreground">Total Amount</span>
            <span className="font-display font-bold text-2xl text-accent">
              {formatPrice(breakdown.total)}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Go Back
          </Button>
          <Button variant="success" className="flex-1" onClick={onConfirm}>
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
