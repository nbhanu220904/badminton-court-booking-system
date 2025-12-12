import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Calendar, Users, Award, Clock, ArrowRight, Star, Zap, Shield } from 'lucide-react';
import heroCourt from '@/assets/hero-court.jpg';

const features = [
  {
    icon: Calendar,
    title: 'Easy Booking',
    description: 'Book your preferred court and time slot in just a few clicks.',
  },
  {
    icon: Users,
    title: 'Expert Coaches',
    description: 'Train with certified coaches who will elevate your game.',
  },
  {
    icon: Award,
    title: 'Premium Equipment',
    description: 'Access professional-grade rackets and gear for rent.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open early morning to late night, 7 days a week.',
  },
];

const stats = [
  { value: '4+', label: 'Premium Courts' },
  { value: '15+', label: 'Expert Coaches' },
  { value: '5000+', label: 'Happy Players' },
  { value: '4.9', label: 'Rating', icon: Star },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroCourt}
            alt="Premium badminton court"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6">
              <Zap className="w-4 h-4" />
              Premium Sports Facility
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Book Your Court,{' '}
              <span className="text-gradient">Elevate Your Game</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Experience world-class badminton facilities with professional coaching,
              premium equipment, and dynamic pricing that fits your schedule.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/book">
                <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                  Book a Court
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card relative z-20 -mt-16 mx-4 sm:mx-8 lg:mx-16 rounded-2xl shadow-xl border border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                    {stat.value}
                  </span>
                  {stat.icon && <Star className="w-6 h-6 text-accent fill-accent" />}
                </div>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Why Choose <span className="text-accent">SportCourt</span>?
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need for the perfect badminton experience, all in one place.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group bg-card rounded-2xl p-6 lg:p-8 border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent font-medium text-sm mb-6">
              <Shield className="w-4 h-4" />
              Dynamic Pricing
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              Smart Pricing That Fits Your Schedule
            </h2>
            
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Our intelligent pricing system offers better rates during off-peak hours
              and early mornings. Book smart, save more!
            </p>

            <Link to="/book">
              <Button variant="hero" size="xl" className="group">
                Start Booking Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
