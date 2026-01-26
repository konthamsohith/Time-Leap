import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Target, Users, Award, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

// Define interfaces for data structures
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface ValueItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface StatItem {
  number: string;
  label: string;
}

const About: React.FC = () => {
  const team: TeamMember[] = [
    {
      name: "Dr. Noah Bennett",
      role: "Founder & Lead Archeologist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    },
    {
      name: "James Benjamin",
      role: "Digital Heritage Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80"
    },
    {
      name: "Sara Ahmed",
      role: "History & Education Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80"
    }
  ];

  const values: ValueItem[] = [
    {
      icon: Target,
      title: "Seeing the Unseen",
      description: "We help users visualize how historical monuments looked in their prime, moving beyond just what remains today."
    },
    {
      icon: Clock,
      title: "Temporal Connection",
      description: "We turn static archaeological data into living, interactive heritage spaces designed for deep historical exploration."
    },
    {
      icon: Award,
      title: "Educational Impact",
      description: "Our platform transforms passive learning into visual discovery, making history accessible and engaging for everyone."
    }
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-32 pb-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- HERO SECTION --- */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-[#222222] border border-white/10 rounded-full px-5 py-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
                <span className="text-sm font-medium tracking-wider text-[#BBBBBB]">TIMELEAP MISSION</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-medium leading-tight text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Seeing <span className="text-[#D4AF37]">history</span> <br /> through <span className="italic">time.</span>
              </h1>
            </div>
            <div className="lg:pb-4">
              <p className="text-xl md:text-2xl text-[#888888] leading-relaxed max-w-lg" style={{ fontFamily: "'Manrope', sans-serif" }}>
                We bridge the gap between static history and modern interaction through immersive 3D reconstructed environments and past vs present comparisons.
              </p>
            </div>
          </div>
        </section>

        {/* --- NARRATIVE SECTION --- */}
        <section className="mb-32">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-white/5 group">
                <img
                  src="https://images.unsplash.com/photo-1541432901012-a774656f4541?w=1200&q=80"
                  alt="Historical ruin being studied"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-4xl md:text-5xl font-medium text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
                The story of <br /> TimeLeap.
              </h2>
              <div className="space-y-6 text-lg text-[#888888] leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                <p>
                  TimeLeap began as a collective vision to bridge the gap between static history and modern interaction. We saw a world where history was being lost to time, and we chose to fight back.
                </p>
                <p>
                  Our team unites archeologists, historians, and digital artists who care about every detail. We don't just build models; we reconstruct the soul of civilizations for heritage exploration and educational discovery.
                </p>
              </div>
              <div className="pt-4">
                <div className="h-px w-24 bg-[#D4AF37]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PURPOSE & MISSION --- */}
        <section className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Visualizing the past.
            </h2>
            <div className="w-px h-16 bg-white/10 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group space-y-4 p-8 bg-[#1A1A1A] rounded-[3rem] border border-white/5 hover:bg-[#1E1E1E] transition-all">
                <div className="mb-4 inline-flex p-4 bg-[#D4AF37]/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-3xl font-medium text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>{value.title}</h3>
                <p className="text-lg text-[#888888] leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="mb-32 p-16 bg-[#1A1A1A] rounded-[4rem] border border-white/5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-medium text-white mb-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Preserving <br /><span className="text-[#D4AF37]">Cultural Significance.</span>
              </h2>
              <p className="text-lg text-[#888888] leading-relaxed italic" style={{ fontFamily: "'Manrope', sans-serif" }}>
                "By transforming static historical information into interactive visual experiences, we help users better understand architectural evolution and the impact of time on important landmarks."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { number: "500+", label: "Reconstructed sites" },
                { number: "50k+", label: "Historical images" },
                { number: "200+", label: "Era variants" },
                { number: "2k+", label: "Active users" }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-4xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm font-medium tracking-widest text-[#888888] uppercase" style={{ fontFamily: "'Manrope', sans-serif" }}>{stat.label}</div>
                  <div className="h-px w-8 bg-white/10"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl space-y-4">
              <h2 className="text-5xl md:text-6xl font-medium text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Meet the <br /> TimeLeap team.
              </h2>
              <p className="text-lg text-[#888888]" style={{ fontFamily: "'Manrope', sans-serif" }}>
                A collective of experts passionate about architectural evolution and cultural heritage.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group space-y-6">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/5 group-hover:border-white/10 transition-all">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>{member.name}</h3>
                  <p className="text-[#D4AF37] font-bold tracking-wide uppercase text-sm mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="text-center py-20 border-t border-white/10 mt-32">
          <h2 className="text-4xl md:text-7xl font-medium text-white mb-12" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Ready to explore <span className="italic text-[#D4AF37]">history?</span>
          </h2>
          <Link to="/explore">
            <Button className="bg-white text-black hover:bg-white/90 px-12 py-8 text-xl rounded-full transition-transform hover:scale-105 font-bold shadow-xl">
              Explore Now
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;