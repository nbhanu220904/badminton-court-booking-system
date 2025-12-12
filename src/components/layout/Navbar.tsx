import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Home, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/book', label: 'Book Court', icon: Calendar },
  { path: '/admin', label: 'Admin', icon: Settings },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <span className="text-accent-foreground font-display font-bold text-lg">SC</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground hidden sm:block">
              SportCourt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'nav-active' : 'nav'}
                    size="default"
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/book">
              <Button variant="accent" size="default">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive ? 'nav-active' : 'nav'}
                    size="lg"
                    className="w-full justify-start gap-3"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Link to="/book" onClick={() => setIsOpen(false)}>
              <Button variant="accent" size="lg" className="w-full mt-2">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
