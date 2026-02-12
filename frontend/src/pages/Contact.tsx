import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfoItem {
  icon: React.ElementType;
  title: string;
  content: string;
  link: string | null;
}

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo: ContactInfoItem[] = [
    {
      icon: Mail,
      title: "Email",
      content: "info@timeleap.com",
      link: "mailto:info@timeleap.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 1234567890",
      link: "tel:+91 1234567890"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "SNIST, Yamnampet, Hyderabad, Telangana 501301",
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center bg-[#222222] border border-white/10 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-[#BBBBBB]">Contact us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Get in touch
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Have questions about a historical site or interested in a heritage partnership? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-8 bg-[#1A1A1A] rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all flex flex-col items-start gap-6"
              >
                <div className="inline-flex p-4 bg-[#222222] border border-white/10 rounded-2xl">
                  <info.icon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest text-xs" style={{ fontFamily: "'Manrope', sans-serif" }}>{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-[#888888] hover:text-white transition-colors text-lg"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-[#888888] text-lg" style={{ fontFamily: "'Manrope', sans-serif" }}>{info.content}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#222222] rounded-[2.5rem] border border-[#D4AF37]/20">
              <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Collaboration Hours</h3>
              <p className="text-[#888888] mb-1 text-sm">Monday - Friday</p>
              <p className="text-xl font-bold text-white">9:00 AM - 6:00 PM EST</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="p-12 bg-[#1A1A1A] rounded-[3.5rem] border border-white/5 shadow-2xl">
              <h2 className="text-3xl font-medium text-white mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-[#BBBBBB] font-bold uppercase tracking-widest text-xs ml-4">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="bg-[#111111] border-white/10 text-white rounded-full py-6 px-6 focus:border-[#D4AF37] focus:ring-0 transition-all"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-[#BBBBBB] font-bold uppercase tracking-widest text-xs ml-4">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-[#111111] border-white/10 text-white rounded-full py-6 px-6 focus:border-[#D4AF37] focus:ring-0 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-[#BBBBBB] font-bold uppercase tracking-widest text-xs ml-4">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Historical inquiry, technical support, etc."
                    className="bg-[#111111] border-white/10 text-white rounded-full py-6 px-6 focus:border-[#D4AF37] focus:ring-0 transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-[#BBBBBB] font-bold uppercase tracking-widest text-xs ml-4">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we help you explore history?"
                    className="bg-[#111111] border-white/10 text-white rounded-[2rem] p-6 focus:border-[#D4AF37] focus:ring-0 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90 rounded-full py-8 text-lg font-bold shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Send Message
                  <Send className="ml-3 h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;