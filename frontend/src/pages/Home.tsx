import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html, useProgress } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { historicalSites } from '../mock';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';




// Why Choose Section Component with Advanced Animations
function WhyChooseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -140]);

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Academic Accuracy",
      description: "Every reconstruction is verified by historians and archaeologists, ensuring authenticity backed by scholarly research."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      title: "Immersive 3D Experience",
      description: "Walk through ancient cities in fully navigable 3D environments with photorealistic textures and lighting."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "AI-Powered Reconstruction",
      description: "Our advanced AI analyzes ruins and historical data to generate accurate visualizations of lost architecture."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Global Heritage",
      description: "Explore monuments from every continent-from Roman ruins to Asian temples to Mesoamerican pyramids."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "VR Ready",
      description: "Experience history in virtual reality with full compatibility for all major VR headsets and platforms."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Expert Team",
      description: "Our team combines archaeologists, 3D artists, historians, and AI engineers to deliver unmatched quality."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-[#0a0a0a] px-6 lg:px-20 relative overflow-hidden">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Heading with animation */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Why Choose <span className="text-[#D4AF37] animate-pulse">TimeLeap</span>
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Manrope', sans-serif" }}>
            The world's most advanced platform for historical reconstruction and heritage preservation
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const y = [y1, y2, y3][index % 3];
            return (
              <motion.div
                key={index}
                className={`group relative bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl p-8 border border-white/5 
                  transition-all duration-700 ease-out cursor-pointer
                  hover:scale-[1.02]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                style={{
                  y,
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  perspective: '1000px'
                }}
              >
                {/* Animated Glow Border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(45deg, transparent, #D4AF37, transparent)',
                    backgroundSize: '200% 200%',
                    animation: 'glowBorder 2s linear infinite',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                {/* Glow Effect on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Icon with Advanced Animation */}
                <div
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] mb-6 
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/30"
                >
                  {/* Pulsing Ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-[#D4AF37]/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                  <div className="relative z-10 group-hover:animate-bounce">
                    {benefit.icon}
                  </div>
                </div>

                {/* Title with Underline Animation */}
                <h3
                  className="relative text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {benefit.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
                </h3>

                {/* Description with Fade */}
                <p
                  className="text-[#888888] text-sm leading-relaxed group-hover:text-[#bbb] transition-colors duration-500"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {benefit.description}
                </p>

                {/* Floating Number */}
                <div
                  className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] group-hover:text-[#D4AF37]/10 transition-colors duration-500"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-sm font-bold bg-black/50 px-2 py-1 rounded">
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

useGLTF.preload('/models3d/hampi_test.glb');
useGLTF.preload('/models3d/model_before_hampi.glb');
useGLTF.preload('/models3d/model_after_hampi.glb');
useGLTF.preload('/models3d/colosseum+3d+model.glb');
useGLTF.preload('/models3d/model_before_corfe.glb');


// Features Section Data
const FEATURES_DATA = [
  {
    id: 'research',
    step: '01',
    label: 'Research',
    title: 'Historical Research & Analysis',
    subtitle: 'Every reconstruction begins with truth.',
    description: 'Our team of historians and archaeologists analyze ancient texts, excavation reports, and scholarly papers to ensure every detail is academically verified before modeling begins.',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 'modeling',
    step: '02',
    label: 'Modeling',
    title: '3D Architectural Modeling',
    subtitle: 'From ruins to complete structures.',
    description: 'Using photogrammetry and CAD tools, we rebuild lost architecture stone by stone. Each model respects original proportions, construction techniques, and spatial relationships.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    )
  },
  {
    id: 'texturing',
    step: '03',
    label: 'Texturing',
    title: 'Photorealistic Texturing',
    subtitle: 'Authentic materials and surfaces.',
    description: 'We recreate original paint colors, stone weathering, and material properties based on pigment analysis and archaeological evidence to achieve museum-quality realism.',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  {
    id: 'animation',
    step: '04',
    label: 'Animation',
    title: 'Immersive Walkthroughs',
    subtitle: 'Experience history in motion.',
    description: 'Navigate through ancient streets, temples, and palaces with cinematic camera movements. Our animations bring context to how these spaces were actually used.',
    img: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'validation',
    step: '05',
    label: 'Validation',
    title: 'Academic Peer Review',
    subtitle: 'Verified by leading historians.',
    description: 'Before publication, every reconstruction undergoes rigorous review by domain experts, ensuring our work meets the highest standards of historical accuracy.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'delivery',
    step: '06',
    label: 'Delivery',
    title: 'Multi-Platform Access',
    subtitle: 'History at your fingertips.',
    description: 'Access reconstructions via web, VR headsets, or mobile devices. Our platform supports educational institutions, museums, and individual explorers worldwide.',
    img: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
];

function ProcessFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const feature = FEATURES_DATA[activeFeature];

  // Scroll-triggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate through features every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURES_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="pt-32 pb-24 bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] px-6 lg:px-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium mb-6">
            Our Process
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            How We Bring <span className="text-[#D4AF37]">History</span> to Life
          </h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Manrope', sans-serif" }}>
            A meticulous six-step process that transforms archaeological data into immersive historical experiences
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between max-w-4xl mx-auto relative">
            {/* Progress Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/50 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(activeFeature / (FEATURES_DATA.length-1)) * 100}% ` }}
            />

            {/* Step Indicators */}
            {FEATURES_DATA.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveFeature(index)}
                className="relative z-10 flex flex-col items-center gap-3 group transition-all duration-300"
              >
                {/* Circle */}
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500
                    ${index <= activeFeature
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                      : 'bg-[#0a0a0a] border-white/20 text-white/50 group-hover:border-white/40'
                    }
                    ${index === activeFeature ? 'scale-125 shadow-lg shadow-[#D4AF37]/30' : ''}
            `}
                >
                  {item.icon}
                </div>
                {/* Label */}
                <span
                  className={`text-xs font-medium whitespace-nowrap transition-colors duration-300
                    ${index === activeFeature ? 'text-[#D4AF37]' : 'text-white/50 group-hover:text-white/70'}
            `}
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Content */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left-Image */}
            <div className="relative group">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10">
                <img
                  key={feature.id}
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Step Badge */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-[#D4AF37] text-black text-sm font-bold">
                  Step {feature.step}
                </div>
              </div>
              {/* Glow */}
              <div className="absolute -inset-4 bg-[#D4AF37]/10 rounded-3xl blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Right-Content */}
            <div className="space-y-8">
              {/* Step Number */}
              <div
                className="text-8xl font-black text-white/5"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {feature.step}
              </div>

              {/* Title */}
              <div className="space-y-4 -mt-16">
                <h3
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[#D4AF37] font-medium text-lg"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {feature.subtitle}
                </p>
              </div>

              {/* Description */}
              <p
                className="text-[#888888] text-lg leading-relaxed"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {feature.description}
              </p>

              {/* Progress Indicator */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/50 rounded-full transition-all duration-500"
                    style={{ width: `${((activeFeature + 1) / FEATURES_DATA.length) * 100}% ` }}
                  />
                </div>
                <span className="text-white/50 text-sm font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {activeFeature + 1} / {FEATURES_DATA.length}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveFeature(prev => prev === 0 ? FEATURES_DATA.length-1 : prev-1)}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveFeature(prev => (prev + 1) % FEATURES_DATA.length)}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}




const HERO_VIDEOS = [
  "https://ik.imagekit.io/ji2lkjg53/203803-922187125_medium.mp4",
  "https://ik.imagekit.io/ji2lkjg53/269310_medium.mp4",
  "https://ik.imagekit.io/ji2lkjg53/35423-407130876_medium.mp4",
  "https://ik.imagekit.io/ji2lkjg53/172590-847860517_small.mp4"
];

const Home: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Projects Parallax
  const projectsRef = useRef<HTMLElement>(null);
  const { scrollYProgress: projectsScroll } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"]
  });

  const py1 = useTransform(projectsScroll, [0, 1], [0, -80]);
  const py2 = useTransform(projectsScroll, [0, 1], [0, -40]);
  const py3 = useTransform(projectsScroll, [0, 1], [0, -120]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  useEffect(() => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video, index) => {
      if (index === currentVideoIndex) {
        video.currentTime = 0;
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  }, [currentVideoIndex]);


  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-hidden selection:bg-white selection:text-black">
      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 bg-black">
          {HERO_VIDEOS.map((src, index) => (
            <video
              key={src}
              autoPlay={index === 0}
              muted
              playsInline
              onEnded={handleVideoEnd}
              onCanPlay={(e) => {
                if (index === currentVideoIndex) {
                  e.currentTarget.play().catch(() => { });
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <source src={src} type="video/mp4" />
            </video>
          ))}
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 z-[1] bg-black/40"></div>

        {/* Vignette Effect-Strong edges */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 50%, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.9) 100%)'
          }}
        ></div>

        {/* Left side gradient for text readability */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)'
          }}
        ></div>

        {/* Bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent z-[3]"></div>

        {/* Content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="max-w-7xl mx-auto w-full relative z-[4] px-6 md:px-12 lg:px-16 pt-24"
        >
          <div className="max-w-3xl">
            {/* Main Title */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8"
              style={{
                fontFamily: "'Manrope', sans-serif",
                color: '#D4AF37'
              }}
            >
              TRAVEL
              <br />
              THROUGH
              <br />
              TIME
            </h1>

            {/* Description */}
            <p
              className="text-sm md:text-base text-white/70 max-w-md leading-relaxed mb-12"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Experience history like never before. Upload any historical image and watch as our AI reconstructs the past, bringing ancient monuments and lost civilizations back to their original glory.
            </p>

            {/* Play Button & CTA */}
            <div className="flex items-center gap-6">
              <Link to="/upload">
                <button
                  className="w-14 h-14 rounded-full border-2 border-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37] hover:scale-110 transition-all duration-300 group"
                >
                  <svg
                    className="w-5 h-5 text-[#D4AF37] group-hover:text-black ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </Link>
              <div
                className="w-24 h-[2px] bg-white/30"
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Video Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex gap-2">
          {HERO_VIDEOS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentVideoIndex
                ? 'bg-[#D4AF37] w-6'
                : 'bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      </section>


      {/* --- WHY CHOOSE SECTION --- */}
      <WhyChooseSection />

      {/* --- OUR PROCESS FEATURES SECTION --- */}
      <ProcessFeaturesSection />



      {/* --- RECENT PROJECTS SHOWCASE --- */}
      <section ref={projectsRef} className="pt-24 pb-32 bg-[#0a0a0a] px-6 lg:px-20" id="projects">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          >
            <div className="max-w-2xl">
              <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Portfolio</span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Pioneering <span className="text-[#D4AF37]">Digital</span> Archeology
              </h2>
              <p className="text-[#888888] text-lg" style={{ fontFamily: "'Manrope', sans-serif" }}>
                Explore our latest full-scale reconstructions, where academic rigor meets cutting-edge 3D technology.
              </p>
            </div>
            <Link to="/explore">
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white hover:text-black rounded-full px-8 py-6 transition-all"
              >
                View All Projects
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {historicalSites.slice(0, 3).map((site, index) => {
              const y = [py1, py2, py3][index % 3];
              return (
                <motion.div
                  key={site.id}
                  style={{ y }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link to={`/ project / ${site.id} `} className="group relative block aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 bg-[#111111]">
                    <img
                      src={site.thumbnail}
                      alt={site.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-3">
                        <MapPin className="w-4 h-4" />
                        {site.location}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Manrope', sans-serif" }}>
                        {site.name}
                      </h3>
                      <p className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {site.description}
                      </p>

                      <div className="mt-6 flex items-center text-white text-sm font-bold group-hover:text-[#D4AF37] transition-colors">
                        Explore Project
                        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* --- TESTIMONIALS SECTION --- */}
      <section className="py-32 px-6 bg-[#111111]" id="testimonials">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Trusted by <span className="text-[#D4AF37]">Global</span> Experts
            </h2>
            <p className="text-[#888888] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Manrope', sans-serif" }}>
              TimeLeap is transforming how we preserve and experience our collective heritage, used by leading institutions worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Dr. Elena Rossi",
                role: "Senior Archeologist",
                quote: "TimeLeap's 3D reconstructions provide a level of detail that was previously impossible. It's a game-changer for digital heritage preservation.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              },
              {
                id: 2,
                name: "Marcus Aurelius",
                role: "History Educator",
                quote: "My students are finally engaged with history. Instead of reading about ruins, they're walking through them in Full 3D.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
              },
              {
                id: 3,
                name: "Sarah Jenkins",
                role: "Heritage Director",
                quote: "The past vs present comparison is the most intuitive tool I've seen for explaining architectural evolution to the public.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80"
              }
            ].map((test) => (
              <div key={test.id} className="p-10 bg-[#1A1A1A] rounded-[3rem] border border-white/5 space-y-8 flex flex-col justify-between hover:bg-[#1E1E1E] transition-colors">
                <p className="text-xl font-medium leading-relaxed italic text-white/90">
                  "{test.quote}"
                </p>
                <div className="flex items-center space-x-5">
                  <Avatar className="h-16 w-16 border border-white/10">
                    <AvatarImage src={test.avatar} />
                    <AvatarFallback>{test.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-xl font-bold text-white">{test.name}</div>
                    <div className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest">{test.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
