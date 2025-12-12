import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-400 flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">SC</span>
              </div>
              <span className="font-display font-bold text-xl">SportCourt</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Premium badminton facilities with professional coaching and top-tier equipment.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Book Court', 'Coaching', 'Pricing'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-primary-foreground/70 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-accent" />
                123 Sports Avenue, City
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-accent" />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-accent" />
                info@sportcourt.com
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Clock className="w-4 h-4 text-accent" />
                <div>
                  <p>Mon - Fri: 6AM - 10PM</p>
                  <p>Sat - Sun: 7AM - 9PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6">
          <p className="text-center text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} SportCourt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
