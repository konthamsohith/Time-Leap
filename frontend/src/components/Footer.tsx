import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks: { path: string; label: string }[] = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/upload', label: 'Upload' },
    { path: '/about', label: 'About' }
  ];

  const socialLinks: { icon: any; href: string; label: string }[] = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-[#111111] text-[#888888] overflow-hidden border-t border-white/5" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-2 space-y-8">
            <Link to="/" className="text-3xl font-bold text-white tracking-tight hover:opacity-80 transition-opacity">
              TimeLeap<span className="text-[#D4AF37]">*</span>
            </Link>
            <p className="text-lg text-[#888888] max-w-md leading-relaxed">
              Travel Through Time — Rebuild History Digitally. We bridge the gap between static history and modern interaction through immersive visual recreations.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555555] hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Platform</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#888888] hover:text-white transition-colors flex items-center group font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Connect</h3>
            <div className="space-y-4">
              <a
                href="mailto:info@timeleap.com"
                className="block text-[#888888] hover:text-white transition-colors font-medium"
              >
                info@timeleap.com
              </a>
              <p className="text-[#555555] text-sm leading-relaxed">
                Empowering the future through <br /> the discovery of the past.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#555555] font-medium">
            © {currentYear} TimeLeap. Preserving heritage for everyone.
          </p>
          <div className="flex space-x-8">
            <Link
              to="/privacy"
              className="text-sm text-[#555555] hover:text-white transition-colors font-medium"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-[#555555] hover:text-white transition-colors font-medium"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;