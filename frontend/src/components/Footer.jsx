import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/upload', label: 'Upload' },
    { path: '/about', label: 'About' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-[#1C1C1E] text-[#E0E0E0] overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00BFA6] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4 group">
              <Clock className="h-8 w-8 text-[#D4AF37] group-hover:rotate-180 transition-transform duration-700" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
                TimeLeap
              </span>
            </Link>
            <p className="text-sm text-[#E0E0E0]/70 max-w-md mb-4">
              Travel Through Time — Rebuild History Digitally. Explore and reconstruct historical sites in stunning 3D detail.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-[#E0E0E0]/70 group-hover:text-[#D4AF37] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#E0E0E0]/70 hover:text-[#D4AF37] transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#D4AF37] mr-0 group-hover:mr-2 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Contact</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@timeleap.com"
                className="flex items-center space-x-2 text-sm text-[#E0E0E0]/70 hover:text-[#D4AF37] transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>info@timeleap.com</span>
              </a>
              <p className="text-sm text-[#E0E0E0]/70">
                Discover history,<br />one site at a time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-[#E0E0E0]/60">
              © {currentYear} TimeLeap. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-sm text-[#E0E0E0]/60 hover:text-[#D4AF37] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-[#E0E0E0]/60 hover:text-[#D4AF37] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;