// --- CHANGE 1: Add these imports for 3D functionality ---
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
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

  return (
    <group
      rotation={[
        scrollProgress * 0.1,
        scrollProgress * 0.1,
        0
      ]}
    >
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1E] via-[#2A2A2E] to-[#1C1C1E]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00BFA6] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* 3D Mock Viewer */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="relative w-96 h-96 perspective-1000">
            <div className="absolute inset-0 transform rotate-y-12 animate-float">
              <img
                src="https://plus.unsplash.com/premium_photo-1697729681522-c4e33d91b40a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="3D model"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/30 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            <span className="text-sm text-[#E0E0E0]">Powered by Advanced 3D Technology</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#E0E0E0] to-[#00BFA6] bg-clip-text text-transparent">
              Travel Through Time
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#E0E0E0]/80 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Rebuild History Digitally
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#E5C04A] hover:to-[#D4AF37] text-[#1C1C1E] font-semibold px-8 py-6 text-lg rounded-xl shadow-2xl"
            >
              <span className="relative z-10 flex items-center">
                Reconstruct Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-[#00BFA6] text-[#00BFA6] hover:bg-[#00BFA6] hover:text-[#1C1C1E] px-8 py-6 text-lg rounded-xl transition-all"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#D4AF37]/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Scroll-triggered 3D Monument Section */}
      <section
        ref={modelSectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-4"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#1C1C1E] to-background"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Model Container */}
            <div className="relative flex items-center justify-center w-full">
              <div className="relative w-[520px] h-[520px] transition-all duration-700 ease-out">


                {/* Canvas Wrapper */}
                <div className="relative w-full max-w-lg aspect-square perspective-1000">
                  <div className="relative w-full max-w-3xl aspect-square">

                    <Canvas className="w-full h-full"
                      camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>

                      <ambientLight intensity={1.2} />
                      <directionalLight position={[5, 5, 5]} intensity={2} />

                      <Suspense fallback={<Loader />}>
                        <Model scrollProgress={scrollProgress} />
                      </Suspense>

                      <OrbitControls
                        enableZoom
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={1.5}
                      />
                    </Canvas>

                  </div>
                </div>

                {/* Glowing rings */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-700"
                  style={{
                    boxShadow: `0 0 ${40 + scrollProgress * 80}px ${10 + scrollProgress * 30}px rgba(212, 175, 55, ${0.2 + scrollProgress * 0.3})`
                  }}
                />

                {/* Rotating border */}
                <div
                  className="absolute -inset-4 rounded-3xl pointer-events-none transition-all duration-1000"
                  style={{
                    background: `conic-gradient(from ${scrollProgress * 360}deg, transparent, #D4AF37, transparent)`,
                    opacity: scrollProgress * 0.6,
                    padding: '2px',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-[#D4AF37] rounded-full blur-sm"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + (i % 2) * 80}%`,
                        opacity: scrollProgress * 0.6,
                        animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>

              </div>
            </div>


            {/* Content */}
            <div
              className="space-y-6 transition-all duration-700"
              style={{
                opacity: scrollProgress,
                transform: `translateX(${(1 - scrollProgress) * 50}px)`
              }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-4">
                <Layers className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-sm text-[#E0E0E0]">Explore in Full 3D
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
                  {monumentSite.name}
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {monumentSite.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-[#D4AF37]/10 to-transparent px-4 py-2 rounded-lg border border-[#D4AF37]/30">
                  <MapPin className="h-4 w-4 text-[#D4AF37]" />
                  <span className="text-sm">{monumentSite.location}</span>
                </div>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-[#00BFA6]/10 to-transparent px-4 py-2 rounded-lg border border-[#00BFA6]/30">
                  <Calendar className="h-4 w-4 text-[#00BFA6]" />
                  <span className="text-sm">Built: {monumentSite.yearBuilt}</span>
                </div>
              </div>

              <div className="pt-6">
                <Link to={`/project/${monumentSite.id}`}>
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E] font-semibold"
                  >
                    Explore in Full 3D
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Progress Indicator */}
              <div className="pt-8">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Reconstruction Progress</span>
                  <span className="text-[#00BFA6] font-semibold">
                    {monumentSite.restorationStages[monumentSite.restorationStages.length - 1].progress}%
                  </span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] transition-all duration-1000 rounded-full"
                    style={{
                      width: `${scrollProgress * monumentSite.restorationStages[monumentSite.restorationStages.length - 1].progress}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-[#1C1C1E]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] bg-clip-text text-transparent">
                Before & After Reconstruction
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">Witness history come alive through digital restoration</p>
          </div>

          <Card className="relative overflow-hidden rounded-2xl shadow-2xl border-2 border-[#D4AF37]/20 bg-card/50 backdrop-blur-sm">
            <div
              ref={sliderRef}
              className="relative h-[650px] cursor-ew-resize select-none"
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
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                    <div className="w-1 h-6 bg-[#D4AF37] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold">
                Before
              </div>
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold">
                After
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00BFA6]/5 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose TimeLeap?
            </h2>
            <p className="text-lg text-muted-foreground">Experience history like never before</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Coverage",
                description: "Access thousands of historical sites from every corner of the world"
              },
              {
                icon: Clock3,
                title: "Time Travel",
                description: "View sites at different points in history with accurate reconstructions"
              },
              {
                icon: Layers,
                title: "3D Exploration",
                description: "Interactive 3D models you can explore from every angle"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="group relative p-8 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-[#D4AF37]/50 transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform"></div>

                <div className="relative z-10">
                  <div className="mb-4 inline-flex p-3 bg-gradient-to-br from-[#D4AF37]/20 to-[#00BFA6]/20 rounded-xl">
                    <feature.icon className="h-8 w-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sites Preview */}
      <section className="py-24 px-4 bg-[#1C1C1E]/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Featured Sites
              </h2>
              <p className="text-lg text-muted-foreground">Explore our most popular reconstructions</p>
            </div>
            <Link to="/explore">
              <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1C1C1E]">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {historicalSites.slice(0, 3).map((site) => (
              <Link
                key={site.id}
                to={`/project/${site.id}`}
                className="group"
              >
                <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-border hover:border-[#D4AF37]/50 transition-all hover:shadow-2xl">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={site.thumbnail}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{site.name}</h3>
                      <p className="text-sm text-white/80">{site.location}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{site.era}</span>
                      <span className="text-sm font-semibold text-[#00BFA6]">View in 3D</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#1C1C1E]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Experts Say
            </h2>
            <p className="text-lg text-muted-foreground">Trusted by historians and archaeologists worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border hover:border-[#00BFA6]/50 transition-all">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-[#D4AF37]">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-[#00BFA6]/20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Explore History?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of history enthusiasts and start your journey through time today.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#D4AF37] to-[#00BFA6] hover:from-[#E5C04A] hover:to-[#00D4C0] text-[#1C1C1E] font-semibold px-12 py-6 text-lg rounded-xl shadow-2xl"
          >
            Start Exploring
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;