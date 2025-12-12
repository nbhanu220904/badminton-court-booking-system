import { useState } from 'react';
import { pricingRules as initialRules } from '@/data/mockData';
import { PricingRule } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Clock, Calendar, Award, Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ruleIcons: Record<string, React.ElementType> = {
  time: Clock,
  day: Calendar,
  premium: Award,
};

export function PricingRulesManager() {
  const { toast } = useToast();
  const [rules, setRules] = useState<PricingRule[]>(initialRules);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);

  const toggleRule = (id: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, active: !rule.active } : rule
      )
    );
    toast({
      title: 'Rule Updated',
      description: 'Pricing rule status has been changed.',
    });
  };

  const updateRule = (id: string, updates: Partial<PricingRule>) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, ...updates } : rule
      )
    );
  };

  const saveRule = () => {
    if (editingRule) {
      updateRule(editingRule.id, editingRule);
      setEditingRule(null);
      toast({
        title: 'Rule Saved',
        description: 'Pricing rule has been updated successfully.',
      });
    }
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    toast({
      title: 'Rule Deleted',
      description: 'Pricing rule has been removed.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-semibold text-xl text-foreground">
            Pricing Rules
          </h2>
          <p className="text-muted-foreground text-sm">
            Configure dynamic pricing based on time, day, and court type.
          </p>
        </div>
        <Button variant="accent" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Rule
        </Button>
      </div>

      <div className="grid gap-4">
        {rules.map((rule) => {
          const Icon = ruleIcons[rule.type] || Clock;
          const isEditing = editingRule?.id === rule.id;

          return (
            <div
              key={rule.id}
              className={cn(
                'bg-card rounded-xl p-5 border transition-all duration-200',
                rule.active ? 'border-border' : 'border-border/50 opacity-60',
                isEditing && 'ring-2 ring-accent'
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                      rule.active ? 'bg-accent/10' : 'bg-muted'
                    )}
                  >
                    <Icon className={cn('w-6 h-6', rule.active ? 'text-accent' : 'text-muted-foreground')} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Rule Name</Label>
                          <Input
                            id="name"
                            value={editingRule.name}
                            onChange={(e) =>
                              setEditingRule({ ...editingRule, name: e.target.value })
                            }
                            className="mt-1"
                          />
                        </div>

                        {rule.type === 'time' && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="startHour">Start Hour</Label>
                              <Input
                                id="startHour"
                                type="number"
                                min={0}
                                max={23}
                                value={editingRule.startHour}
                                onChange={(e) =>
                                  setEditingRule({
                                    ...editingRule,
                                    startHour: parseInt(e.target.value),
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="endHour">End Hour</Label>
                              <Input
                                id="endHour"
                                type="number"
                                min={0}
                                max={23}
                                value={editingRule.endHour}
                                onChange={(e) =>
                                  setEditingRule({
                                    ...editingRule,
                                    endHour: parseInt(e.target.value),
                                  })
                                }
                                className="mt-1"
                              />
                            </div>
                          </div>
                        )}

                        {rule.multiplier !== undefined && (
                          <div>
                            <Label htmlFor="multiplier">Price Multiplier</Label>
                            <Input
                              id="multiplier"
                              type="number"
                              step="0.1"
                              min={0.1}
                              max={3}
                              value={editingRule.multiplier}
                              onChange={(e) =>
                                setEditingRule({
                                  ...editingRule,
                                  multiplier: parseFloat(e.target.value),
                                })
                              }
                              className="mt-1"
                            />
                          </div>
                        )}

                        {rule.surcharge !== undefined && (
                          <div>
                            <Label htmlFor="surcharge">Surcharge ($)</Label>
                            <Input
                              id="surcharge"
                              type="number"
                              min={0}
                              value={editingRule.surcharge}
                              onChange={(e) =>
                                setEditingRule({
                                  ...editingRule,
                                  surcharge: parseFloat(e.target.value),
                                })
                              }
                              className="mt-1"
                            />
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="accent" size="sm" onClick={saveRule}>
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingRule(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-semibold text-foreground">{rule.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {rule.type === 'time' &&
                            `Applies from ${rule.startHour}:00 to ${rule.endHour}:00`}
                          {rule.type === 'day' &&
                            `Applies on weekends (Saturday & Sunday)`}
                          {rule.type === 'premium' && `Applies to premium indoor courts`}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          {rule.multiplier && (
                            <span className="text-sm font-medium text-accent">
                              {rule.multiplier > 1
                                ? `${((rule.multiplier - 1) * 100).toFixed(0)}% increase`
                                : `${((1 - rule.multiplier) * 100).toFixed(0)}% discount`}
                            </span>
                          )}
                          {rule.surcharge && (
                            <span className="text-sm font-medium text-accent">
                              +${rule.surcharge} surcharge
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!isEditing && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingRule(rule)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRule(rule.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  <Switch
                    checked={rule.active}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
