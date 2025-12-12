import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PricingRulesManager } from '@/components/admin/PricingRulesManager';
import { CourtsManager } from '@/components/admin/CourtsManager';
import { CoachesManager } from '@/components/admin/CoachesManager';
import { Button } from '@/components/ui/button';
import { Settings, DollarSign, MapPin, Users, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'overview' | 'pricing' | 'courts' | 'coaches';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'pricing', label: 'Pricing Rules', icon: DollarSign },
  { id: 'courts', label: 'Courts', icon: MapPin },
  { id: 'coaches', label: 'Coaches', icon: Users },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Settings className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage courts, pricing, and coaches
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 p-1 bg-muted rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <Button
                  key={tab.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'gap-2',
                    isActive && 'shadow-md'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Content */}
          <div className="animate-fade-in">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'pricing' && <PricingRulesManager />}
            {activeTab === 'courts' && <CourtsManager />}
            {activeTab === 'coaches' && <CoachesManager />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

function OverviewTab() {
  const stats = [
    { label: 'Total Courts', value: '4', change: '+0%', icon: MapPin },
    { label: 'Active Coaches', value: '3', change: '+50%', icon: Users },
    { label: 'Bookings Today', value: '12', change: '+25%', icon: BarChart3 },
    { label: 'Revenue Today', value: '$540', change: '+18%', icon: DollarSign },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-5 border border-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl p-6 border border-border">
        <h2 className="font-display font-semibold text-lg text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start gap-2 h-auto py-4">
            <DollarSign className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="font-medium">Adjust Pricing</p>
              <p className="text-xs text-muted-foreground">Update base rates</p>
            </div>
          </Button>
          <Button variant="outline" className="justify-start gap-2 h-auto py-4">
            <MapPin className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="font-medium">Add Court</p>
              <p className="text-xs text-muted-foreground">Create new court</p>
            </div>
          </Button>
          <Button variant="outline" className="justify-start gap-2 h-auto py-4">
            <Users className="w-5 h-5 text-accent" />
            <div className="text-left">
              <p className="font-medium">Manage Coaches</p>
              <p className="text-xs text-muted-foreground">Update availability</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
