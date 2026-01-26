// --- CHANGE 1: Add these imports for 3D functionality ---
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Html, useProgress } from '@react-three/drei';
// --------------------------------------------------------


import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Globe, Clock3, Layers, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { historicalSites, testimonials, HistoricalSite, Testimonial } from '../mock';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';



function Model({ scrollProgress = 0 }: { scrollProgress: number }) {
  const group = useRef<any>();
  const { scene } = useGLTF('/models3d/hampi_test.glb') as any;

  useEffect(() => {

    scene.position.set(0, 0, 0);


    scene.scale.set(4, 4, 4);  //3d model size setting
  }, [scene]);

  useFrame((state: any) => {
    if (group.current) {
      // Continuous rotation + scroll influence
      group.current.rotation.y = state.clock.getElapsedTime() * 0.5 + scrollProgress * 2;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 + scrollProgress * 0.5;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
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




const Home: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isSliderDragging, setIsSliderDragging] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const modelSectionRef = useRef<HTMLElement>(null);

  const monumentSite = historicalSites[0];

  // Before/After slider handler
  const handleSliderChange = (e: React.MouseEvent | MouseEvent) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const clientX = 'clientX' in e ? e.clientX : (e as any).clientX;
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    }
  };

  const handleMouseDown = () => setIsSliderDragging(true);
  const handleMouseUp = () => setIsSliderDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isSliderDragging) {
        handleSliderChange(e);
      }
    };

    if (isSliderDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSliderDragging]);

  // Scroll-based 3D model animation
  useEffect(() => {
    const handleScroll = () => {
      if (modelSectionRef.current) {
        const rect = modelSectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        // Calculate progress based on scroll position
        // Model starts appearing when section is in view
        if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
          const progress = Math.max(0, Math.min(1, 1 - (sectionTop / windowHeight)));
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-hidden selection:bg-white selection:text-black">
      {/* --- HERO SECTION --- (TimeLeap Context) */}
      <section className="relative min-h-[95vh] flex flex-col justify-center px-6 pt-32 pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-10 animate-fade-in-up">
              <div className="inline-flex items-center bg-[#222222] border border-[#333333] rounded-full px-4 py-2">
                <span className="text-sm font-medium text-[#BBBBBB]">#1 in Digital Heritage Visualization</span>
              </div>

              <h1
                className="font-medium tracking-tight text-white"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '68px',
                  lineHeight: '82px',
                  fontWeight: 500
                }}
              >
                Seeing History <br />
                Through Time
              </h1>

              <p
                className="max-w-lg font-normal"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '20px',
                  lineHeight: '32px',
                  fontWeight: 400
                }}
              >
                Visualize how historical places have changed over time. Explore interactive 3D reconstructions and experience the past.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/explore">
                  <Button
                    className="bg-white text-black hover:bg-[#EEEEEE] px-10 py-7 rounded-full transition-transform hover:scale-105"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '17px',
                      lineHeight: '26px',
                      fontWeight: 500
                    }}
                  >
                    Start Exploring
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button
                    variant="outline"
                    className="bg-[#222222] border-[#333333] text-white hover:bg-[#333333] px-10 py-7 rounded-full transition-transform hover:scale-105"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '17px',
                      lineHeight: '26px',
                      fontWeight: 500
                    }}
                  >
                    Upload Image
                  </Button>
                </Link>
              </div>

            </div>

            {/* Right Visual (Arched Image & Badges) */}
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative aspect-[4/5] w-full max-w-2xl mx-auto rounded-t-full overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                <img
                  src="https://images.unsplash.com/photo-1596018382916-56d2e341d784?q=80&w=1200&auto=format&fit=crop"
                  alt="Hampi Ruins"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Status Badges */}
              <div className="absolute top-20 right-0 translate-x-12 bg-black/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 shadow-xl flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                <span className="text-sm font-medium text-white/90">3D Exploration</span>
              </div>

              <div className="absolute top-1/2 -right-16 translate-y-8 bg-black/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 shadow-xl flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[#00BFA6]"></div>
                <span className="text-sm font-medium text-white/90">Past vs Present</span>
              </div>

              <div className="absolute bottom-32 -left-16 bg-black/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10 shadow-xl flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-white/40"></div>
                <span className="text-sm font-medium text-white/90">Historical Accuracy</span>
              </div>

              {/* Rating Card */}
              <div className="absolute bottom-8 right-0 -translate-x-8 bg-[#1A1A1A]/80 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/5 shadow-2xl space-y-4 min-w-[220px]">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className="h-10 w-10 border-2 border-[#1A1A1A]">
                      <AvatarImage src={`https://i.pravatar.cc/100?u=${i + 40}`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="space-y-1">
                  <div className="flex space-x-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="h-4 w-4 text-[#D4AF37] fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" /></svg>
                    ))}
                  </div>
                  <p className="text-sm font-bold text-white leading-tight mt-2">
                    Loved by <br /> 5k+ Historians
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFINITE SCROLL GALLERY --- */}
      <section className="py-12 bg-black overflow-hidden select-none">
        <div className="flex animate-marquee">
          {[...Array(4)].map((_, listIndex) => (
            <div key={listIndex} className="flex gap-8 items-end pr-8">
              {[
                "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80", // Colosseum
                "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80", // Petra
                "https://images.unsplash.com/photo-1666240073343-9801b7b5b949?q=80&w=1170&auto=format&fit=crop", // Machu Picchu
                "https://images.unsplash.com/photo-1470075446540-4391a96ec621?q=80&w=1074&auto=format&fit=crop", // Golconda Fort
                "https://images.unsplash.com/photo-1723871568897-d0680195f20a?q=80&w=735&auto=format&fit=crop", // Konark Sun Temple
                "https://images.unsplash.com/photo-1596018382916-56d2e341d784?q=80&w=1548&auto=format&fit=crop", // Hampi Ruins
              ].map((src, i) => (
                <div
                  key={i}
                  className={`relative flex-shrink-0 transition-transform hover:scale-[1.02] duration-500 cursor-pointer
                    ${i % 2 === 0
                      ? "w-[450px] aspect-[16/10] rounded-[3rem]"
                      : "w-[300px] aspect-[3/4] rounded-t-full"} 
                    overflow-hidden border border-white/5 shadow-2xl`}
                >
                  <img src={src} alt="Historical site" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* --- WHO WE ARE / STATS SECTION --- */}
      <section className="py-32 bg-[#111111] px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Arched Thumbnail */}
          <div className="mb-8 w-16 h-20 rounded-t-full overflow-hidden border border-white/10 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1596018382916-56d2e341d784?q=80&w=1548&auto=format&fit=crop" // Hampi (Verified)
              alt="Ancient Temple"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="inline-flex items-center bg-[#222222] border border-[#333333] rounded-full px-4 py-2 mb-10">
            <span className="text-sm font-medium text-[#BBBBBB]">Who we are</span>
          </div>

          <h2
            className="text-3xl md:text-[40px] font-medium leading-[1.3] text-white max-w-4xl mb-24"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            We’re a team of historians, digital artists, and developers bringing the past to life. From broken ruins to complete cities, we deliver academically accurate reconstructions.
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full pt-12">
            {[
              { value: "50+", label: "Civilizations Archived" },
              { value: "500+", label: "Historical Monuments" },
              { value: "1M+", label: "Virtual Visitors" },
              { value: "100%", label: "Accuracy Verified" }
            ].map((stat, i) => (
              <div key={i} className="space-y-4">
                <div
                  className="text-5xl font-medium text-white"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm text-[#888888] font-medium uppercase tracking-wider"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DESIGN INTENTION SECTION --- */}
      <section className="pb-32 px-6 bg-[#111111]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 h-full">
          {/* Left Content Card */}
          <div className="bg-[#1A1A1A] rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col justify-between border border-white/5">
            {/* Ghosted Background Text */}
            <div
              className="absolute bottom-[-10%] left-[-5%] text-[12rem] font-bold text-white/[0.02] select-none pointer-events-none whitespace-nowrap"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              TimeLeap*
            </div>

            <div className="relative z-10 space-y-12">
              <h2
                className="text-3xl md:text-5xl font-medium leading-[1.2] text-white"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                We preserve with intention, creating digital archives that reflect history, not just imagination.
              </h2>

              <ul
                className="space-y-6 text-xl text-[#888888] font-medium"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {[
                  "1: Academic Research & Validation",
                  "2: Photorealistic Texture Mapping",
                  "3: Interactive 3D Environments"
                ].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Arched Mini-Thumbnails */}
            <div className="relative z-10 flex space-x-4 mt-20">
              {[
                "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=200&q=80", // Colosseum (Verified)
                "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=200&q=80", // Petra (Verified)
                "https://images.unsplash.com/photo-1666240073343-9801b7b5b949?w=200&q=80"  // Machu Picchu (Verified)
              ].map((src, i) => (
                <div key={i} className="w-16 h-24 rounded-t-full overflow-hidden border border-white/10 shadow-lg transform translate-y-4 hover:translate-y-0 transition-transform duration-500">
                  <img src={src} alt="Architecture detail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Container */}
          <div className="rounded-[3rem] overflow-hidden h-[600px] lg:h-auto border border-white/5 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=1200&q=80"
              alt="Premium Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div >
      </section >

      {/* --- OUR SERVICES SECTION --- */}
      < section className="py-32 px-6 bg-[#111111]" >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-flex items-center bg-[#222222] border border-[#333333] rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-[#BBBBBB]">Our services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Services that bridge time
            </h2>
            <p className="text-[#888888] text-lg max-w-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Explore our suite of digital heritage tools designed to bring history to life.
            </p>
          </div>

          {/* Service Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "3D Reconstruction",
                desc: "We rebuild lost structures from the ground up using archaeological data and cutting-edge 3D modeling.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                hasAccent: true,
                accentImg: "https://images.unsplash.com/photo-1545324418-cc1a3d2e2764?w=800&q=80"
              },
              {
                title: "Past vs Present",
                desc: "We enable direct visual comparison between current ruins and their original historical majesty.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Interactive History",
                desc: "We create immersive environments where you can walk through history, not just look at it.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                )
              },
              {
                title: "Digital Archiving",
                desc: "We preserve heritage for future generations through high-fidelity digital scans and cloud archiving.",
                icon: (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                ),
                hasAccent: true,
                accentImg: "https://images.unsplash.com/photo-1548013666-3d2e2936999a?w=800&q=80"
              }
            ].map((service, i) => (
              <div
                key={i}
                className="group bg-[#1A1A1A] rounded-[3rem] p-12 lg:p-16 border border-white/5 relative overflow-hidden flex flex-col items-start transition-all duration-500 hover:bg-[#1E1E1E] hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Floating Image Accent */}
                {service.hasAccent && (
                  <div className="absolute top-12 -right-24 w-48 aspect-[3/4] rounded-t-full overflow-hidden border border-white/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rotate-6">
                    <img src={service.accentImg} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="w-20 h-20 rounded-full bg-[#111111] flex items-center justify-center mb-10 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>

                <h3 className="text-2xl md:text-3xl font-medium text-white mb-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {service.title}
                </h3>
                <p className="text-[#888888] text-lg leading-relaxed mb-10 max-w-sm" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {service.desc}
                </p>
                <Button
                  variant="outline"
                  className="bg-[#222222] border-[#333333] text-[#BBBBBB] hover:text-white hover:bg-[#333333] rounded-full px-8 py-4 text-sm font-bold transition-all group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-transparent"
                >
                  View in detail
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* --- FEATURED PROJECT SECTION (HAMPI) --- */}
      < section
        ref={modelSectionRef}
        className="relative min-h-[140vh] flex items-center justify-center perspective-1000 py-32"
      >
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* 3D Model Visual */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-square w-full max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-[100px]"></div>
                <div className="relative w-full h-full">
                  <Canvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={1.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2.5} />
                    <Suspense fallback={<Loader />}>
                      <Model scrollProgress={scrollProgress} />
                    </Suspense>
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      autoRotate
                      autoRotateSpeed={2}
                    />
                  </Canvas>
                </div>

                {/* Floating Labels (Buildio Inspired) */}
                <div className="absolute -top-10 -right-10 bg-muted/40 backdrop-blur-xl p-6 rounded-2xl border border-border/50 space-y-2 hidden md:block">
                  <div className="text-[#D4AF37] text-2xl font-bold">85%</div>
                  <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase leading-tight">Reconstruction <br />Progress</div>
                  <div className="w-24 h-1 bg-[#D4AF37]/30 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D4AF37]" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-[#D4AF37]">
                  <Layers className="h-5 w-5" />
                  <span className="text-sm font-bold tracking-[0.2em] uppercase">FEATURED PROJECT</span>
                </div>
                <h2 className="text-6xl md:text-7xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {monumentSite.name}
                </h2>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed italic">
                {monumentSite.description}
              </p>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-border/50">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#D4AF37]" /> Location
                  </div>
                  <div className="text-xl font-semibold">{monumentSite.location}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-[#00BFA6]" /> Built
                  </div>
                  <div className="text-xl font-semibold">{monumentSite.yearBuilt}</div>
                </div>
              </div>

              <div className="pt-6">
                <Link to={`/project/${monumentSite.id}`}>
                  <Button
                    size="lg"
                    className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-background px-12 py-8 rounded-full text-xl font-bold transition-all"
                  >
                    Explore in Full 3D
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* --- BEFORE/AFTER SLIDER SECTION --- */}
      < section className="py-32 px-4" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Before & After <span className="text-[#00BFA6]">Reconstruction.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Witness history come alive through digital restoration.
            </p>
          </div>

          <div className="relative aspect-[16/10] max-w-5xl mx-auto rounded-[3rem] overflow-hidden border-2 border-border shadow-2xl">
            <div
              ref={sliderRef}
              className="relative w-full h-full cursor-ew-resize select-none"
              onMouseDown={handleMouseDown}
            >
              {/* After Image */}
              <img
                src="/images/after.png"
                alt="After reconstruction"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before Image with clip */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src="/images/before.jpg"
                  alt="Before reconstruction"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-background border-2 border-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl">
                  <div className="flex space-x-0.5">
                    <div className="w-0.5 h-4 bg-[#D4AF37] rounded-full"></div>
                    <div className="w-0.5 h-4 bg-[#D4AF37] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20 text-sm font-bold tracking-widest uppercase">Before</div>
              <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-xl px-6 py-2 rounded-full border border-white/20 text-sm font-bold tracking-widest uppercase text-[#00BFA6]">After</div>
            </div>
          </div>
        </div>
      </section >

      {/* --- RECENT PROJECTS SHOWCASE --- */}
      < section className="py-32 px-6 bg-[#111111]" >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-24">
            <div className="inline-flex items-center bg-[#222222] border border-[#333333] rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-[#BBBBBB]">Recent work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              A Showcase of our recent projects
            </h2>
            <p className="text-[#888888] text-lg max-w-2xl" style={{ fontFamily: "'Manrope', sans-serif" }}>
              From initial excavation to digital reconstruction, see how we bring history back to life.
            </p>
          </div>

          {/* Vertical Projects Stack */}
          <div className="space-y-12">
            {[
              historicalSites[0], // Hampi
              historicalSites[1], // Colosseum
              historicalSites[2]  // Petra
            ].map((project, i) => (
              <div
                key={i}
                className="group bg-[#1A1A1A] rounded-[3.5rem] p-4 lg:p-8 border border-white/5 overflow-hidden transition-all hover:bg-[#1E1E1E]"
              >
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="p-8 lg:p-12 space-y-8">
                    <h3 className="text-3xl md:text-4xl font-medium text-white leading-tight" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {project.name}
                    </h3>
                    <p className="text-[#888888] text-lg leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-6 pt-4">
                      <div className="flex items-center space-x-2 text-white/70">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>{project.architectureType}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-medium" style={{ fontFamily: "'Manrope', sans-serif" }}>{project.location}</span>
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button
                        variant="outline"
                        className="bg-[#222222] border-[#333333] text-[#BBBBBB] hover:text-white hover:bg-[#333333] rounded-full px-8 py-4 text-sm font-bold transition-all"
                      >
                        View in detail
                      </Button>
                    </div>
                  </div>

                  {/* Right Image (Arched) */}
                  <div className="aspect-[16/11] lg:aspect-auto h-full min-h-[400px] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative">
                    {/* Arched Clipping Mask (CSS approach) */}
                    <div className="absolute inset-0 overflow-hidden rounded-t-[10rem] md:rounded-t-[15rem]">
                      <img
                        src={project.thumbnail}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* --- TESTIMONIALS SECTION --- */}
      < section className="py-32 px-4" >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Trusted by history experts
            </h2>
            <p className="text-[#888888] text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Manrope', sans-serif" }}>
              TimeLeap is transforming how we preserve and experience our collective heritage.
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
      </section >

      {/* --- FINAL CTA SECTION (MATCHING REFERENCE) --- */}
      < section className="py-24 px-6 bg-[#111111]" >
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[650px] rounded-[3.5rem] overflow-hidden flex items-center justify-center border border-white/5 shadow-3xl">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1666240073343-9801b7b5b949?q=80&w=1600&auto=format&fit=crop"
              alt="Historical Atmosphere"
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
            />

            {/* Transparent Dark Overlay Card */}
            <div className="relative z-10 w-full max-w-4xl bg-black/40 backdrop-blur-2xl rounded-[3rem] p-12 md:p-20 flex flex-col items-center text-center border border-white/10 shadow-2xl mx-8">
              <h2
                className="text-4xl md:text-7xl font-bold text-white mb-8 leading-[1.1]"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Ready to Explore <br /> History?
              </h2>
              <p
                className="text-lg md:text-2xl text-white/80 max-w-2xl mb-12 leading-relaxed"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Join thousands of history enthusiasts and start your journey through time today.
              </p>

              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-12 py-8 text-xl rounded-full transition-transform hover:scale-105 font-bold shadow-xl"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Start Exploring
              </Button>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Home;