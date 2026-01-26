import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Clock } from 'lucide-react';
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

  const navLinks: { path: string; label: string }[] = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/upload', label: 'Upload' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <Clock className="h-8 w-8 text-[#D4AF37] animate-pulse" />
              <div className="absolute inset-0 blur-xl bg-[#D4AF37] opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
              TimeLeap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors hover:text-[#D4AF37] ${location.pathname === link.path
                    ? 'text-[#D4AF37]'
                    : 'text-foreground/80'
                  }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] rounded-full"></span>
                )}
              </Link>
            ))}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden group"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
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
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${location.pathname === link.path
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'text-foreground/80 hover:bg-accent'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;