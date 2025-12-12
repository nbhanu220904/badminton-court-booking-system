import { useState } from 'react';
import { courts as initialCourts } from '@/data/mockData';
import { Court } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Plus, Save, Trash2, Edit2, Wind, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CourtsManager() {
  const { toast } = useToast();
  const [courts, setCourts] = useState<Court[]>(initialCourts);
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);

  const updateCourt = (id: string, updates: Partial<Court>) => {
    setCourts(prev =>
      prev.map(court =>
        court.id === id ? { ...court, ...updates } : court
      )
    );
  };

  const saveCourt = () => {
    if (editingCourt) {
      updateCourt(editingCourt.id, editingCourt);
      setEditingCourt(null);
      toast({
        title: 'Court Updated',
        description: 'Court details have been saved successfully.',
      });
    }
  };

  const deleteCourt = (id: string) => {
    setCourts(prev => prev.filter(court => court.id !== id));
    toast({
      title: 'Court Deleted',
      description: 'Court has been removed from the system.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-xl text-foreground">
            Court Management
          </h2>
          <p className="text-muted-foreground text-sm">
            Add, edit, and manage your badminton courts.
          </p>
        </div>
        <Button variant="accent" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Court
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {courts.map((court) => {
          const isEditing = editingCourt?.id === court.id;

          return (
            <div
              key={court.id}
              className={cn(
                'bg-card rounded-xl p-5 border border-border transition-all duration-200',
                isEditing && 'ring-2 ring-accent'
              )}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Court Name</Label>
                    <Input
                      id="name"
                      value={editingCourt.name}
                      onChange={(e) =>
                        setEditingCourt({ ...editingCourt, name: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <select
                        id="type"
                        value={editingCourt.type}
                        onChange={(e) =>
                          setEditingCourt({
                            ...editingCourt,
                            type: e.target.value as 'indoor' | 'outdoor',
                          })
                        }
                        className="w-full mt-1 h-10 px-3 rounded-lg border border-input bg-background text-foreground"
                      >
                        <option value="indoor">Indoor</option>
                        <option value="outdoor">Outdoor</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="basePrice">Base Price ($)</Label>
                      <Input
                        id="basePrice"
                        type="number"
                        min={0}
                        value={editingCourt.basePrice}
                        onChange={(e) =>
                          setEditingCourt({
                            ...editingCourt,
                            basePrice: parseFloat(e.target.value),
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="accent" size="sm" onClick={saveCourt}>
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCourt(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{court.name}</h3>
                        <span
                          className={cn(
                            'inline-block px-2 py-0.5 rounded text-xs font-medium mt-1',
                            court.type === 'indoor'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-success/10 text-success'
                          )}
                        >
                          {court.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingCourt(court)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCourt(court.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-2xl font-bold text-foreground mb-3">
                    ${court.basePrice}
                    <span className="text-sm font-normal text-muted-foreground">/hour</span>
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {court.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                      >
                        <Check className="w-3 h-3" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
