import { useState, useMemo } from 'react';
import { format, addDays } from 'date-fns';
import { Layout } from '@/components/layout/Layout';
import { CourtSelector } from '@/components/booking/CourtSelector';
import { DateSelector } from '@/components/booking/DateSelector';
import { TimeSlotGrid } from '@/components/booking/TimeSlotGrid';
import { ResourceSelector } from '@/components/booking/ResourceSelector';
import { PricingSummary } from '@/components/booking/PricingSummary';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { courts, generateTimeSlots } from '@/data/mockData';
import { Court, Coach, BookingResource, TimeSlot } from '@/types/booking';
import { calculatePrice } from '@/utils/priceCalculator';
import { useToast } from '@/hooks/use-toast';

const BookCourt = () => {
  const { toast } = useToast();
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [resources, setResources] = useState<BookingResource>({
    rackets: 0,
    shoes: 0,
    shuttlecocks: 0,
    coach: null,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

  const pricingBreakdown = useMemo(() => {
    if (!selectedCourt || !selectedSlot) return null;
    return calculatePrice(selectedCourt, selectedDate, selectedSlot.startTime, resources);
  }, [selectedCourt, selectedDate, selectedSlot, resources]);

  const handleCoachSelect = (coach: Coach | null) => {
    setResources(prev => ({ ...prev, coach }));
  };

  const handleResourceChange = (type: 'rackets' | 'shoes' | 'shuttlecocks', value: number) => {
    setResources(prev => ({ ...prev, [type]: value }));
  };

  const handleBooking = () => {
    if (!selectedCourt || !selectedSlot || !pricingBreakdown) {
      toast({
        title: "Missing Information",
        description: "Please select a court and time slot to continue.",
        variant: "destructive",
      });
      return;
    }
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    toast({
      title: "Booking Confirmed! 🎉",
      description: `Your court is booked for ${format(selectedDate, 'MMMM d, yyyy')} at ${selectedSlot?.startTime}`,
    });
    setShowConfirmation(false);
    // Reset form
    setSelectedSlot(null);
    setResources({ rackets: 0, shoes: 0, shuttlecocks: 0, coach: null });
  };

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
              Book a Court
            </h1>
            <p className="text-muted-foreground text-lg">
              Select your court, time, and add-ons to see live pricing.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Selections */}
            <div className="lg:col-span-2 space-y-8">
              {/* Court Selection */}
              <section>
                <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                  1. Choose Your Court
                </h2>
                <CourtSelector
                  courts={courts}
                  selectedCourt={selectedCourt}
                  onSelect={setSelectedCourt}
                />
              </section>

              {/* Date Selection */}
              <section>
                <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                  2. Select Date
                </h2>
                <DateSelector
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                />
              </section>

              {/* Time Slots */}
              {selectedCourt && (
                <section className="animate-fade-in">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                    3. Pick a Time Slot
                  </h2>
                  <TimeSlotGrid
                    slots={timeSlots}
                    selectedSlot={selectedSlot}
                    onSelect={setSelectedSlot}
                    selectedDate={selectedDate}
                    court={selectedCourt}
                  />
                </section>
              )}

              {/* Resources & Add-ons */}
              {selectedSlot && (
                <section className="animate-fade-in">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                    4. Add Equipment & Coach (Optional)
                  </h2>
                  <ResourceSelector
                    resources={resources}
                    onResourceChange={handleResourceChange}
                    onCoachSelect={handleCoachSelect}
                  />
                </section>
              )}
            </div>

            {/* Right Column - Pricing Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <PricingSummary
                  court={selectedCourt}
                  date={selectedDate}
                  slot={selectedSlot}
                  resources={resources}
                  breakdown={pricingBreakdown}
                  onBook={handleBooking}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <BookingConfirmation
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={confirmBooking}
        court={selectedCourt}
        date={selectedDate}
        slot={selectedSlot}
        resources={resources}
        breakdown={pricingBreakdown}
      />
    </Layout>
  );
};

export default BookCourt;
