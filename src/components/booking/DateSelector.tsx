import { format, addDays, isSameDay, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface DateSelectorProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export function DateSelector({ selectedDate, onSelect }: DateSelectorProps) {
  const [startIndex, setStartIndex] = useState(0);
  const daysToShow = 7;
  
  const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
  const visibleDates = dates.slice(startIndex, startIndex + daysToShow);

  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + daysToShow < dates.length;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
        disabled={!canGoBack}
        className="shrink-0"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex gap-2 overflow-hidden flex-1">
        {visibleDates.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelect(date)}
              className={cn(
                'flex-1 min-w-[70px] rounded-xl p-3 text-center transition-all duration-200',
                isSelected
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'bg-card border border-border hover:border-accent/50 hover:shadow-sm',
                isWeekend && !isSelected && 'border-warning/30 bg-warning/5'
              )}
            >
              <p
                className={cn(
                  'text-xs font-medium mb-1',
                  isSelected ? 'text-accent-foreground/80' : 'text-muted-foreground'
                )}
              >
                {isToday(date) ? 'Today' : format(date, 'EEE')}
              </p>
              <p
                className={cn(
                  'text-lg font-bold',
                  isSelected ? 'text-accent-foreground' : 'text-foreground'
                )}
              >
                {format(date, 'd')}
              </p>
              <p
                className={cn(
                  'text-xs',
                  isSelected ? 'text-accent-foreground/80' : 'text-muted-foreground'
                )}
              >
                {format(date, 'MMM')}
              </p>
              {isWeekend && (
                <span
                  className={cn(
                    'inline-block text-[10px] mt-1 px-1.5 py-0.5 rounded font-medium',
                    isSelected
                      ? 'bg-accent-foreground/20 text-accent-foreground'
                      : 'bg-warning/20 text-warning'
                  )}
                >
                  +$10
                </span>
              )}
            </button>
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setStartIndex(Math.min(dates.length - daysToShow, startIndex + 1))}
        disabled={!canGoForward}
        className="shrink-0"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
