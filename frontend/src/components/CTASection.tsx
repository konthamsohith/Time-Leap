import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export function CTASection() {
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const card = cardRef.current;
        const bg = bgRef.current;
        if (!section || !card || !bg) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));

            if (progress < 0.3) {
                const entranceProgress = progress / 0.3;
                card.style.transform = `translate(-50%, -50%) translateY(${60 - entranceProgress * 60}vh) scale(${0.96 + entranceProgress * 0.04})`;
                card.style.opacity = `${entranceProgress}`;
                bg.style.transform = `scale(${1.08 - entranceProgress * 0.08})`;
                bg.style.opacity = `${0.6 + entranceProgress * 0.4}`;
            } else if (progress < 0.7) {
                card.style.transform = 'translate(-50%, -50%) translateY(0) scale(1)';
                card.style.opacity = '1';
                bg.style.transform = 'scale(1)';
                bg.style.opacity = '1';
            } else {
                const exitProgress = (progress - 0.7) / 0.3;
                card.style.transform = `translate(-50%, -50%) translateY(${-exitProgress * 18}vh)`;
                card.style.opacity = `${1 - exitProgress * 0.7}`;
                bg.style.transform = `scale(${1 + exitProgress * 0.05})`;
                bg.style.opacity = `${1 - exitProgress * 0.35}`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGetStarted = () => {
        navigate('/upload');
    };

    const handleContact = () => {
        navigate('/contact');
    };

    return (
        <section
            ref={sectionRef}
            className="section-pinned flex items-center justify-center"
        >
            {/* Background Image */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0"
                style={{ willChange: 'transform, opacity' }}
            >
                <img
                    src="/images/archive_scene.jpg"
                    alt="Dramatic ruins"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-tl-bg/70" />
            </div>

            {/* Center Card */}
            <div
                ref={cardRef}
                className="absolute left-1/2 top-1/2 w-[90vw] lg:w-[78vw] max-w-[1100px] z-10"
                style={{
                    willChange: 'transform, opacity',
                    transform: 'translate(-50%, -50%) translateY(60vh) scale(0.96)',
                    opacity: 0
                }}
            >
                <div className="glass-card-strong p-8 lg:p-12 text-center">
                    <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-tl-text mb-4">
                        Ready to Rebuild History?
                    </h2>
                    <p className="text-lg lg:text-xl text-tl-text-secondary max-w-2xl mx-auto mb-8">
                        Upload your first image and explore the past in 3D.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button onClick={handleGetStarted} className="btn-primary flex items-center justify-center gap-2">
                            Get Started Free
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button onClick={handleContact} className="btn-secondary flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
