import { Court } from '@/types/booking';
import { cn } from '@/lib/utils';
import { Check, Wifi, Wind, Sun, Tv } from 'lucide-react';

interface CourtSelectorProps {
  courts: Court[];
  selectedCourt: Court | null;
  onSelect: (court: Court) => void;
}

const amenityIcons: Record<string, React.ElementType> = {
  'Air Conditioned': Wind,
  'LED Lighting': Sun,
  'Live Streaming': Tv,
  'Professional Flooring': Check,
};

export function CourtSelector({ courts, selectedCourt, onSelect }: CourtSelectorProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {courts.map((court) => {
        const isSelected = selectedCourt?.id === court.id;
        return (
          <button
            key={court.id}
            onClick={() => onSelect(court)}
            className={cn(
              'group relative bg-card rounded-xl p-5 border-2 text-left transition-all duration-300',
              isSelected
                ? 'border-accent shadow-lg shadow-accent/10'
                : 'border-border hover:border-accent/50 hover:shadow-md'
            )}
          >
            {/* Selection Indicator */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <Check className="w-4 h-4 text-accent-foreground" />
              </div>
            )}

            {/* Court Type Badge */}
            <span
              className={cn(
                'inline-block px-2.5 py-1 rounded-md text-xs font-medium mb-3',
                court.type === 'indoor'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-success/10 text-success'
              )}
            >
              {court.type === 'indoor' ? 'Indoor' : 'Outdoor'}
            </span>

            {/* Court Name */}
            <h3 className="font-display font-semibold text-lg text-foreground mb-1">
              {court.name}
            </h3>

            {/* Base Price */}
            <p className="text-2xl font-bold text-foreground mb-3">
              ${court.basePrice}
              <span className="text-sm font-normal text-muted-foreground">/hour</span>
            </p>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2">
              {court.amenities.slice(0, 3).map((amenity) => {
                const Icon = amenityIcons[amenity] || Check;
                return (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <Icon className="w-3 h-3" />
                    {amenity}
                  </span>
                );
              })}
              {court.amenities.length > 3 && (
                <span className="text-xs text-accent font-medium">
                  +{court.amenities.length - 3} more
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
