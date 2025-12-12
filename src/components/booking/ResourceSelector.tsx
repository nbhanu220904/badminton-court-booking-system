import { BookingResource, Coach } from '@/types/booking';
import { equipment, coaches } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Star, Check } from 'lucide-react';

interface ResourceSelectorProps {
  resources: BookingResource;
  onResourceChange: (type: 'rackets' | 'shoes' | 'shuttlecocks', value: number) => void;
  onCoachSelect: (coach: Coach | null) => void;
}

export function ResourceSelector({ resources, onResourceChange, onCoachSelect }: ResourceSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Equipment */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Equipment Rental
        </h3>
        
        <div className="space-y-4">
          {equipment.map((item) => {
            const resourceKey = item.type === 'racket' ? 'rackets' : item.type === 'shoes' ? 'shoes' : 'shuttlecocks';
            const count = resources[resourceKey];
            const maxAvailable = item.availableStock;
            
            return (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.pricePerHour}/hour • {item.availableStock} available
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onResourceChange(resourceKey, Math.max(0, count - 1))}
                    disabled={count === 0}
                    className="h-8 w-8"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  
                  <span className="w-8 text-center font-semibold text-foreground">
                    {count}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onResourceChange(resourceKey, Math.min(maxAvailable, count + 1))}
                    disabled={count >= maxAvailable}
                    className="h-8 w-8"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coaches */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Book a Coach
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-3">
          {coaches.map((coach) => {
            const isSelected = resources.coach?.id === coach.id;
            
            return (
              <button
                key={coach.id}
                onClick={() => onCoachSelect(isSelected ? null : coach)}
                disabled={!coach.available}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-all duration-200',
                  coach.available
                    ? isSelected
                      ? 'border-accent bg-accent/5 shadow-sm'
                      : 'border-border hover:border-accent/50 bg-card'
                    : 'border-border/50 bg-muted/30 opacity-60 cursor-not-allowed'
                )}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center text-accent-foreground font-bold">
                    {coach.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent-foreground" />
                    </div>
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{coach.name}</h4>
                  <p className="text-xs text-muted-foreground">{coach.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-warning fill-warning" />
                      <span className="text-xs font-medium text-foreground">{coach.rating}</span>
                    </div>
                    <span className="text-xs font-semibold text-accent">${coach.hourlyRate}/hr</span>
                  </div>
                </div>

                {!coach.available && (
                  <span className="text-xs text-muted-foreground">Unavailable</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
