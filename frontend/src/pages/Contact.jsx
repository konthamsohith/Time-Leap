import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@timeleap.com",
      link: "mailto:info@timeleap.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 History Lane, Heritage City, HC 12345",
      link: null
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about TimeLeap? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="inline-flex p-3 bg-gradient-to-br from-[#D4AF37]/20 to-[#00BFA6]/20 rounded-lg">
                    <info.icon className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-sm text-muted-foreground hover:text-[#D4AF37] transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-gradient-to-br from-[#D4AF37]/10 to-[#00BFA6]/10 border-2 border-[#D4AF37]/30">
              <h3 className="font-bold mb-2">Office Hours</h3>
              <p className="text-sm text-muted-foreground mb-1">Monday - Friday</p>
              <p className="text-sm font-semibold text-[#D4AF37]">9:00 AM - 6:00 PM EST</p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-border">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="bg-background/50 border-border focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="bg-background/50 border-border focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="bg-background/50 border-border focus:border-[#D4AF37] focus:ring-[#D4AF37]/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us more..."
                    className="bg-background/50 border-border focus:border-[#D4AF37] focus:ring-[#D4AF37]/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E] font-semibold py-6"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mt-12 h-96 overflow-hidden border-2 border-border">
          <div className="w-full h-full bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2E] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-[#D4AF37] mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive Map Coming Soon</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;