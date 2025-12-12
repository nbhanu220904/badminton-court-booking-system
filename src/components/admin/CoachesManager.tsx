import { useState } from 'react';
import { coaches as initialCoaches } from '@/data/mockData';
import { Coach } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Star, Plus, Save, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function CoachesManager() {
  const { toast } = useToast();
  const [coachesList, setCoachesList] = useState<Coach[]>(initialCoaches);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);

  const toggleAvailability = (id: string) => {
    setCoachesList(prev =>
      prev.map(coach =>
        coach.id === id ? { ...coach, available: !coach.available } : coach
      )
    );
    toast({
      title: 'Availability Updated',
      description: 'Coach availability has been changed.',
    });
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    setCoachesList(prev =>
      prev.map(coach =>
        coach.id === id ? { ...coach, ...updates } : coach
      )
    );
  };

  const saveCoach = () => {
    if (editingCoach) {
      updateCoach(editingCoach.id, editingCoach);
      setEditingCoach(null);
      toast({
        title: 'Coach Updated',
        description: 'Coach details have been saved successfully.',
      });
    }
  };

  const deleteCoach = (id: string) => {
    setCoachesList(prev => prev.filter(coach => coach.id !== id));
    toast({
      title: 'Coach Removed',
      description: 'Coach has been removed from the system.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-xl text-foreground">
            Coach Management
          </h2>
          <p className="text-muted-foreground text-sm">
            Manage coaches and their availability.
          </p>
        </div>
        <Button variant="accent" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Coach
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {coachesList.map((coach) => {
          const isEditing = editingCoach?.id === coach.id;

          return (
            <div
              key={coach.id}
              className={cn(
                'bg-card rounded-xl p-5 border transition-all duration-200',
                coach.available ? 'border-border' : 'border-border/50 opacity-70',
                isEditing && 'ring-2 ring-accent'
              )}
            >
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editingCoach.name}
                      onChange={(e) =>
                        setEditingCoach({ ...editingCoach, name: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={editingCoach.specialty}
                      onChange={(e) =>
                        setEditingCoach({ ...editingCoach, specialty: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      min={0}
                      value={editingCoach.hourlyRate}
                      onChange={(e) =>
                        setEditingCoach({
                          ...editingCoach,
                          hourlyRate: parseFloat(e.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="accent" size="sm" onClick={saveCoach}>
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCoach(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center text-accent-foreground font-bold text-lg">
                        {coach.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{coach.name}</h3>
                        <p className="text-sm text-muted-foreground">{coach.specialty}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingCoach(coach)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCoach(coach.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="font-medium text-foreground">{coach.rating}</span>
                      </div>
                      <span className="text-lg font-bold text-accent">
                        ${coach.hourlyRate}/hr
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'text-sm font-medium',
                        coach.available ? 'text-success' : 'text-muted-foreground'
                      )}>
                        {coach.available ? 'Available' : 'Unavailable'}
                      </span>
                      <Switch
                        checked={coach.available}
                        onCheckedChange={() => toggleAvailability(coach.id)}
                      />
                    </div>
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
