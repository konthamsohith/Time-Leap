import React from 'react';
import { Clock, Target, Users, Award, Sparkles } from 'lucide-react';
import { Card } from '../components/ui/card';

const About = () => {
  const team = [
    {
      name: "Jane Doe",
      role: "Founder & Chief Archaeologist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
    },
    {
      name: "John Doe",
      role: "Lead 3D Engineer",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80"
    },
    {
      name: "Jane Doe",
      role: "AI Research Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "We use cutting-edge AI and archaeological data to ensure historical accuracy in every reconstruction."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making world heritage accessible to everyone, from students to researchers and history enthusiasts."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to maintaining the highest standards in digital heritage preservation and education."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1E]/50 to-transparent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#00BFA6] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            <span className="text-sm text-[#E0E0E0]">Est. 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
              Bringing History to Life
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            TimeLeap is pioneering the digital reconstruction of historical sites, making world heritage accessible through advanced 3D technology and AI-powered restoration.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 mb-4">
                <Clock className="h-6 w-6 text-[#D4AF37]" />
                <span className="text-sm font-semibold text-[#D4AF37]">OUR MISSION</span>
              </div>
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Preserving Heritage Through Technology
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We believe that everyone should have access to the world's historical treasures, regardless of location or circumstance. Through cutting-edge 3D reconstruction and artificial intelligence, we're making this vision a reality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our platform serves educators, researchers, students, and history enthusiasts worldwide, providing accurate, detailed reconstructions of historical sites that have been lost, damaged, or are difficult to access.
              </p>
            </div>
            <Card className="relative h-96 overflow-hidden border-2 border-[#D4AF37]/20">
              <img
                src="https://images.unsplash.com/photo-1591482036599-8f0b834a8e52?w=1200&h=800&fit=crop&q=80"
                alt="Mission"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#00BFA6]/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">Principles that guide our work</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="inline-flex p-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#00BFA6]/20 rounded-xl mb-4">
                  <value.icon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground">Experts in archaeology, technology, and AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-border hover:border-[#D4AF37]/50 transition-all hover:shadow-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-[#D4AF37]">{member.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-[#1C1C1E]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Sites Reconstructed" },
              { number: "50K+", label: "Active Users" },
              { number: "25+", label: "Countries" },
              { number: "95%", label: "Accuracy Rate" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;