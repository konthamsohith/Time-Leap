import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Clock } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/about', label: 'About' },
    { path: '/#services', label: 'Services' },
    { path: '/explore', label: 'Projects' },
    { path: '/#testimonials', label: 'Testimonials' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/5'
        : 'bg-transparent'
        }`}
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity"
          >
            TimeLeap<span className="text-[#D4AF37]">*</span>
          </Link>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden md:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-[15px] font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action */}
          <div className="hidden md:block">
            <Link to="/contact">
              <Button
                className="bg-white text-black hover:bg-white/90 px-8 py-6 rounded-full text-[15px] font-bold transition-transform hover:scale-105"
              >
                Contact us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-medium text-white/70 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-white text-black py-6 rounded-full mt-4 font-bold">
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;