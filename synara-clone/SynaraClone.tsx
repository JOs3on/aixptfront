import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Icons using inline SVGs or standard lucide-react approximations
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu h-5 w-5">
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="#f9ab00" stroke="#f9ab00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-earth">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const NavigationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-navigation">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function SynaraClone() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preload and cache frames
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  const [framesLoaded, setFramesLoaded] = useState(false);

  useEffect(() => {
    // Add standalone root class to body to scope CSS rules
    document.body.classList.add('synara-clone-root');

    // Preload frames
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;
    const totalFrames = 67;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameStr = String(i).padStart(4, '0');
      img.src = `/mountain-frames/frame_${frameStr}.webp`;
      img.onload = () => {
        count++;
        if (count === totalFrames) {
          setFramesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setFrames(loadedImages);

    return () => {
      document.body.classList.remove('synara-clone-root');
    };
  }, []);

  // Frame scroll animation control
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 66]);

  useEffect(() => {
    if (!framesLoaded || frames.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderFrame = (idx: number) => {
      const img = frames[Math.min(66, Math.max(0, Math.round(idx)))];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Implement cover fit calculation
      const imgWidth = img.width;
      const imgHeight = img.height;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      } else {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Subscribes to the motion value transform
    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(latest);
    });

    // Render initial frame
    renderFrame(0);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = (canvas.clientWidth || window.innerWidth) * window.devicePixelRatio;
      canvas.height = (canvas.clientHeight || window.innerHeight) * window.devicePixelRatio;
      renderFrame(frameIndex.get());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [framesLoaded, frames, frameIndex]);

  return (
    <div className="synara-clone-root relative min-h-screen bg-surface selection:bg-[#9a6bff]/10">
      {/* Sticky Header Navigation */}
      <div className="sticky top-0 z-50">
        <nav className="relative mx-auto max-w-full bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(255,255,255,0.24),0_10px_30px_rgba(48,36,72,0.08)] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,backdrop-filter] duration-300">
          <div className="relative mx-auto max-w-6xl flex h-16 items-center justify-between px-6">
            <a className="flex items-center gap-2 no-underline transition-transform duration-200 ease-out hover:scale-105 hover:no-underline" href="/">
              <div className="h-10 w-10 relative flex items-center justify-center">
                <img alt="Opulent Automation Logo" className="h-full w-full object-contain" src="/transparent-logo.png" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-heading font-bold text-fg uppercase tracking-wide">Opulent</span>
                <span className="text-lg font-heading font-medium text-fg-secondary uppercase tracking-wide">Automation</span>
              </div>
            </a>

            <nav className="relative z-10 max-w-max flex-1 items-center justify-center hidden md:flex" aria-label="Main">
              <div style={{ position: 'relative' }}>
                <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
                  <li>
                    <button 
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      className="group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 transition-colors hover:text-fg focus:text-fg focus:outline-none text-fg-secondary text-sm font-medium"
                    >
                      Services
                      <span className="absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="flex items-center gap-3">
              <button className="hidden rounded-full bg-[#9a6bff] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8a5cef] hover:shadow-[0_6px_16px_rgba(154,107,255,0.18)] md:block">
                Book Now
              </button>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-md p-2 text-fg-secondary transition-colors hover:text-fg md:hidden" 
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-surface md:hidden p-6 transition-all duration-300">
          <div className="flex flex-col gap-6">
            <a href="#services-section" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-fg-secondary hover:text-fg">Services</a>
            <a href="#contact-section" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-fg-secondary hover:text-fg">Contact</a>
            <button className="w-full rounded-full bg-[#9a6bff] py-4 text-center font-medium text-white hover:bg-[#8a5cef]">
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="min-h-screen bg-surface">
        <section className="relative overflow-visible">
          <section ref={heroRef} aria-label="Mountain hero" className="relative -mt-16" style={{ height: '220vh', minHeight: '220vh' }}>
            <div className="relative overflow-hidden bg-[#f3f1f4]" style={{ height: '100vh', position: 'sticky', top: 0 }}>
              {/* Fallback frame image for mobile */}
              <img alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover sm:hidden" src="/mountain-frames/frame_0067.webp" style={{ objectPosition: 'calc(50% + 275px) center' }} />
              {/* Animation frame canvas for desktop */}
              <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 hidden h-full w-full sm:block opacity-100 transition-opacity duration-300" style={{ width: '100%', height: '100%' }} />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(250,249,248,0.92)_0%,rgba(250,249,248,0.76)_32%,rgba(250,249,248,0.18)_60%,rgba(250,249,248,0.04)_100%)]"></div>
              
              <div className="relative z-10 h-full pt-16">
                <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-5 pb-10 sm:px-8">
                  <div className="mb-8 max-w-[47rem] text-left">
                    <h1 className="mb-5 max-w-5xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold normal-case leading-[1.02] tracking-[-0.035em] text-fg" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                      <span className="text-[#9a6bff]">Web growth for dentists</span> who'd rather be treating.
                    </h1>
                    <p className="max-w-xl text-lg font-medium leading-relaxed text-fg-secondary md:text-xl">
                      No templates or generic medical sites. Everything is built to help you <strong className="font-bold italic">reach patients nearby</strong>, earn trust <strong className="font-bold italic">in seconds</strong>, and <strong className="font-bold italic">fill your chairs.</strong>
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <button className="group inline-flex h-[41px] w-[151px] self-center items-center justify-center gap-2 rounded-full bg-[#9a6bff] px-2 text-base font-medium leading-none text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8a5cef] hover:shadow-[0_6px_16px_rgba(154,107,255,0.18)] sm:h-[52px] sm:w-auto sm:self-auto sm:px-6">
                      Book Now
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                    <a className="group inline-flex items-center justify-center gap-2 rounded-lg border border-transparent bg-transparent px-8 py-4 text-base font-medium text-fg no-underline transition-all duration-300 hover:-translate-y-0.5 hover:no-underline" href="#how-it-works">
                      <span className="relative">
                        Learn More
                        <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-fg transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* How It Works Map Section */}
        <section id="how-it-works" aria-labelledby="demo-bridge-heading" className="px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10 max-w-2xl text-left sm:mb-14"
            >
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-fg-tertiary">The view from the top</p>
              <h2 id="demo-bridge-heading" className="mb-4 text-3xl font-semibold normal-case leading-tight tracking-[-0.02em] text-fg md:text-4xl" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                Search. Compare. Call.
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-fg-secondary">
                That’s the whole decision, and it takes seconds. When your practice sits at the top, every one of those steps ends at your door.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full"
            >
              <div className="overflow-hidden rounded-[1.75rem] border border-border bg-surface-alt shadow-[0_35px_100px_rgba(25,25,22,0.16)]">
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 9', opacity: 1, width: '100%' }}>
                  <div style={{ width: '1150px', height: '646.875px', display: 'flex', flexDirection: 'column', position: 'absolute', overflow: 'hidden', left: '0px', top: '0px' }}>
                    <div className="relative flex overflow-hidden origin-top-left" style={{ width: '1600px', height: '900px', transform: 'scale(0.71875)', marginLeft: '-225px', marginTop: '-126.562px' }}>
                      <div className="absolute inset-0 flex flex-col bg-[#e9edf1] font-sans antialiased overflow-hidden">
                        <div className="absolute inset-0 origin-center scale-[1.12]">
                          <svg width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
                            <rect width="1600" height="900" fill="#e9edf1" />
                            <path d="M-80 720 C240 500 390 680 720 490 S1210 230 1700 330 L1700 920 L-80 920 Z" fill="#cfe8cf" />
                            <path d="M1050 -50 C1180 220 1070 390 1210 980" fill="none" stroke="#b9e4f4" strokeWidth="70" />
                            <g stroke="#d7dde2" strokeWidth="7" fill="none" opacity=".95">
                              <path d="M80 0 L250 900 M300 0 L410 900 M480 0 L590 900 M720 0 L680 900 M1050 0 L930 900 M1260 0 L1350 900 M1500 0 L1380 900" />
                              <path d="M0 120 L1600 90 M0 245 L1600 280 M0 350 L1600 410 M0 530 L1600 500 M0 680 L1600 650 M0 790 L1600 820" />
                            </g>
                            <path d="M-120 210 C250 310 410 120 750 240 S1210 620 1710 520" fill="none" stroke="#ffffff" strokeWidth="50" />
                            <path d="M-120 210 C250 310 410 120 750 240 S1210 620 1710 520" fill="none" stroke="#f3d6a0" strokeWidth="8" />
                            <path d="M-100 500 C280 410 570 520 850 390 S1350 250 1710 150" fill="none" stroke="#ffffff" strokeWidth="32" />
                            <g fill="#58636d" fontFamily="Roboto, Arial, sans-serif">
                              <text x="190" y="160" fontSize="27" fontWeight="700" letterSpacing="3">BROOKSIDE</text>
                              <text x="1060" y="160" fontSize="27" fontWeight="700" letterSpacing="3">RIVER PARK</text>
                              <text x="700" y="360" fontSize="20" fontWeight="600" letterSpacing="0">Market St</text>
                              <text x="1160" y="650" fontSize="20" fontWeight="600" letterSpacing="0">Willow Rd</text>
                              <text x="910" y="565" fontSize="20" fontWeight="600" letterSpacing="0">City Dental Lab</text>
                              <text x="1280" y="330" fontSize="20" fontWeight="600" letterSpacing="0">Brookside School</text>
                              <text x="360" y="700" fontSize="20" fontWeight="600" letterSpacing="0">Community Park</text>
                            </g>
                          </svg>

                          {/* Blue Pin for "Your Clinic" */}
                          <div className="filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ position: 'absolute', left: '52%', top: '36%', transform: 'translate(-50%, -100%)' }}>
                            <div className="grid place-items-center w-12 h-12 rounded-xl bg-[#1a73e2] border-4 border-white text-white">
                              <NavigationIcon />
                            </div>
                          </div>

                          {/* Competitor red pins */}
                          <div className="filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ position: 'absolute', left: '62%', top: '24%', transform: 'translate(-50%, -100%)' }}>
                            <div className="grid place-items-center w-[38px] h-[38px] rounded-full bg-[#e34a3d] border-4 border-white text-white">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            </div>
                          </div>

                          <div className="filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]" style={{ position: 'absolute', left: '56%', top: '72%', transform: 'translate(-50%, -100%)' }}>
                            <div className="grid place-items-center w-[38px] h-[38px] rounded-full bg-[#e34a3d] border-4 border-white text-white">
                              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                            </div>
                          </div>
                        </div>

                        {/* Search Filter Header */}
                        <div className="flex gap-3 opacity-90" style={{ position: 'absolute', left: '700px', top: '30px' }}>
                          <div className="flex items-center gap-2 rounded-full border border-[#d9dede] bg-white px-[15px] py-[10px] text-[17px] font-medium text-[#202124] shadow-[0_2px_7px_rgba(32,33,36,0.22)]">Rating</div>
                          <div className="flex items-center gap-2 rounded-full border border-[#d9dede] bg-white px-[15px] py-[10px] text-[17px] font-medium text-[#202124] shadow-[0_2px_7px_rgba(32,33,36,0.22)]">Hours</div>
                          <div className="flex items-center gap-2 rounded-full border border-[#d9dede] bg-white px-[15px] py-[10px] text-[17px] font-medium text-[#202124] shadow-[0_2px_7px_rgba(32,33,36,0.22)]">
                            All filters
                          </div>
                        </div>

                        {/* Search Results side panel on the left */}
                        <motion.div 
                          initial={{ opacity: 1, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.7 }}
                          className="rounded-[22px] bg-white shadow-[0_12px_38px_rgba(32,33,36,0.22)] overflow-hidden"
                          style={{ position: 'absolute', left: '28px', top: '28px', width: '650px', height: '844px', zIndex: 10 }}
                        >
                          <div className="h-full flex flex-col">
                            <div className="p-6 border-b border-[#d9dede]">
                              <div className="flex items-center gap-3 rounded-full bg-[#f5f7f8] px-5 py-4 shadow-[0_3px_12px_rgba(32,33,36,0.22)] text-xl text-[#687078]">
                                <SearchIcon />
                                <span className="flex-1 text-[#687078]">dental clinics near me</span>
                                <span className="text-[#687078] font-bold">X</span>
                              </div>
                              <div className="flex items-center justify-between mt-6">
                                <strong className="text-[28px] text-fg">Results</strong>
                                <span className="text-[#1a73e2] text-[17px] font-medium cursor-pointer">Share</span>
                              </div>
                            </div>
                            
                            <div className="overflow-hidden flex-1">
                              <div className="p-6 border-b border-[#d9dede] bg-[#f5f7f8] shadow-[inset_5px_0_0_#1a73e2]">
                                <div className="flex justify-between gap-5">
                                  <div className="min-w-0">
                                    <div className="text-[17px] font-bold text-[#1a73e2] mb-2">Top result</div>
                                    <div className="text-[23px] font-semibold leading-[1.18] text-fg">Your Clinic</div>
                                    <div className="flex items-center gap-1.5 mt-2 text-[#687078] text-[19px] font-medium">
                                      <span className="text-[#f9ab00]">4.9</span>
                                      <StarIcon />
                                      <span>(312) · Cosmetic Dentistry</span>
                                    </div>
                                    <div className="mt-1 text-[#687078] text-lg font-medium">
                                      <span className="text-[#188038]">Open</span> · 0.3 mi · 1840 Brookside Ave
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-center">
                                    <div className="grid place-items-center w-11 h-11 rounded-full bg-[#f5f7f8] text-[#1a73e2] shadow-[0_3px_10px_rgba(32,33,36,0.22)]"><GlobeIcon /></div>
                                    <div className="grid place-items-center w-11 h-11 rounded-full bg-[#f5f7f8] text-[#1a73e2] shadow-[0_3px_10px_rgba(32,33,36,0.22)]"><NavigationIcon /></div>
                                  </div>
                                </div>
                                <div className="mt-4 p-4 rounded-xl bg-[#e9edf1] text-[#687078] text-[17px] font-medium">
                                  Modern care with same-week appointments.
                                </div>
                              </div>

                              <div className="p-6 border-b border-[#d9dede] bg-white opacity-60">
                                <div className="flex justify-between gap-5">
                                  <div className="min-w-0">
                                    <div className="text-[17px] font-bold text-fg-tertiary mb-2">Nearby result</div>
                                    <div className="text-[23px] font-semibold leading-[1.18] text-fg">Smile Design Studio</div>
                                    <div className="flex items-center gap-1.5 mt-2 text-[#687078] text-[19px] font-medium">
                                      <span className="text-[#f9ab00]">4.5</span>
                                      <StarIcon />
                                      <span>(89) · General Dentistry</span>
                                    </div>
                                    <div className="mt-1 text-[#687078] text-lg font-medium">
                                      <span className="text-[#188038]">Open</span> · 0.8 mi · 220 Market Street
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-auto p-5 border-t border-[#d9dede] text-[15px] text-[#687078]">
                              ☐ Update results when map moves
                            </div>
                          </div>
                        </motion.div>

                        {/* Mobile Phone Mock on the Right */}
                        <motion.div 
                          initial={{ opacity: 1, x: 0 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="rounded-[82px] bg-[#0d0e10] p-3.5 shadow-[-28px_40px_90px_rgba(32,33,36,0.22)]"
                          style={{ position: 'absolute', right: '40px', top: '54px', width: '610px', height: '910px', zIndex: 10 }}
                        >
                          <div className="relative w-full h-full rounded-[68px] overflow-hidden bg-[#e9edf1] text-[#202124]">
                            {/* SVG Map mock */}
                            <div className="absolute inset-0">
                              <svg width="100%" height="100%" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
                                <rect width="1600" height="900" fill="#e9edf1" />
                                <path d="M-80 720 C240 500 390 680 720 490 S1210 230 1700 330 L1700 920 L-80 920 Z" fill="#cfe8cf" />
                                <path d="M1050 -50 C1180 220 1070 390 1210 980" fill="none" stroke="#b9e4f4" strokeWidth="70" />
                                <g stroke="#d7dde2" strokeWidth="5" fill="none" opacity=".95">
                                  <path d="M80 0 L250 900 M300 0 L410 900 M480 0 L590 900 M720 0 L680 900 M1050 0 L930 900 M1260 0 L1350 900 M1500 0 L1380 900" />
                                  <path d="M0 120 L1600 90 M0 245 L1600 280 M0 350 L1600 410 M0 530 L1600 500 M0 680 L1600 650 M0 790 L1600 820" />
                                </g>
                                <path d="M-120 210 C250 310 410 120 750 240 S1210 620 1710 520" fill="none" stroke="#ffffff" strokeWidth="34" />
                                <path d="M-120 210 C250 310 410 120 750 240 S1210 620 1710 520" fill="none" stroke="#f3d6a0" strokeWidth="5" />
                                <path d="M-100 500 C280 410 570 520 850 390 S1350 250 1710 150" fill="none" stroke="#ffffff" strokeWidth="22" />
                                <g fill="#58636d" fontFamily="Roboto, Arial, sans-serif">
                                  <text x="190" y="160" fontSize="25" fontWeight="700" letterSpacing="3">BROOKSIDE</text>
                                  <text x="1060" y="160" fontSize="25" fontWeight="700" letterSpacing="3">RIVER PARK</text>
                                  <text x="700" y="360" fontSize="25" fontWeight="600" letterSpacing="0">Market St</text>
                                  <text x="1160" y="650" fontSize="25" fontWeight="600" letterSpacing="0">Willow Rd</text>
                                  <text x="910" y="565" fontSize="25" fontWeight="600" letterSpacing="0">City Dental Lab</text>
                                  <text x="1280" y="330" fontSize="25" fontWeight="600" letterSpacing="0">Brookside School</text>
                                  <text x="360" y="700" fontSize="25" fontWeight="600" letterSpacing="0">Community Park</text>
                                </g>
                              </svg>
                            </div>
                            {/* Blue Pin */}
                            <div style={{ position: 'absolute', left: '52%', top: '36%', transform: 'translate(-50%, -100%)' }}>
                              <div className="grid place-items-center w-12 h-12 rounded-xl bg-[#1a73e2] border-4 border-white text-white">
                                <NavigationIcon />
                              </div>
                            </div>
                            {/* Phone top bar */}
                            <div style={{ position: 'absolute', left: '50%', top: '12px', width: '155px', height: '40px', transform: 'translateX(-50%)', borderRadius: '9999px', backgroundColor: '#000' }}></div>
                            <div style={{ position: 'absolute', left: '30px', top: '24px', fontSize: '18px', fontWeight: 'bold' }}>9:41</div>
                            <div style={{ position: 'absolute', right: '32px', top: '25px', fontSize: '16px', fontWeight: 'bold' }}>5G ◼ 82</div>

                            {/* Search details mockup inside phone */}
                            <div style={{ position: 'absolute', left: '24px', right: '24px', top: '72px' }}>
                              <div className="flex items-center gap-3 rounded-full bg-[#f5f7f8] p-[17px] shadow-[0_3px_12px_rgba(32,33,36,0.22)] text-[23px] font-normal">
                                <SearchIcon />
                                <span className="flex-1">dental clinics near me</span>
                              </div>
                            </div>

                            {/* Details slide up panel */}
                            <div style={{ position: 'absolute', left: 0, right: 0, bottom: '-4px', height: '505px', borderTopLeftRadius: '38px', borderTopRightRadius: '38px', backgroundColor: '#fff', padding: '26px', boxShadow: '0 -12px 42px rgba(32,33,36,0.22)' }}>
                              <div className="w-[78px] h-[7px] rounded-full bg-[#d9dede] mx-auto mb-5"></div>
                              <div className="flex justify-between items-center">
                                <strong className="text-[30px] font-medium">dental clinics near me</strong>
                              </div>
                              <div className="flex gap-2.5 my-[18px]">
                                <div className="flex items-center gap-2 rounded-full border border-[#d9dede] bg-white px-[15px] py-[10px] text-[17px] font-medium">Sort by</div>
                                <div className="flex items-center gap-2 rounded-full border border-[#d9dede] bg-white px-[15px] py-[10px] text-[17px] font-medium">Open now</div>
                              </div>
                              <div>
                                <strong className="text-[18px] text-fg-tertiary">Top result</strong>
                                <div className="mt-3 text-[27px] font-semibold text-fg">Your Clinic</div>
                                <div className="mt-2 text-[18px] text-[#687078]"><span className="text-[#f9ab00]">4.9 ★</span> (312) · Cosmetic Dentistry</div>
                                <div className="mt-[7px] text-[17px] text-[#687078]"><span className="text-[#188038]">Open</span> · 0.3 mi · 1840 Brookside Ave</div>
                                <div className="flex gap-3 mt-[22px]">
                                  <div className="flex items-center gap-1.5 rounded-full bg-[#007b83] px-4 py-3 text-white text-base font-semibold"><NavigationIcon /> Directions</div>
                                  <div className="flex items-center gap-1.5 rounded-full bg-[#007b83] px-4 py-3 text-white text-base font-semibold"><PhoneIcon /> Call</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Competitors Description Section */}
        <section className="section-padding py-32 md:py-40">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-32 mx-auto max-w-2xl text-center text-2xl md:text-3xl font-medium normal-case leading-snug text-fg-secondary" 
              style={{ fontFamily: '"Instrument Sans", sans-serif' }}
            >
              For most practices, that search ends with a competitor’s name. <span className="text-fg">Here’s why:</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-24"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-16 items-baseline">
                <h3 className="text-2xl md:text-[1.625rem] font-heading font-bold text-fg uppercase leading-tight mb-0">
                  Patients call. You miss it. They book elsewhere.
                </h3>
                <p className="text-fg-secondary leading-relaxed">
                  Each inbound call that goes unanswered is a whitening, a veneer case, or cleaning booked with the office down the street instead.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-16 items-baseline">
                <h3 className="text-2xl md:text-[1.625rem] font-heading font-bold text-fg uppercase leading-tight mb-0">
                  You present a treatment plan. Silence.
                </h3>
                <p className="text-fg-secondary leading-relaxed">
                  Without automated follow-up, 60% of case presentations never convert. That’s revenue sitting in your pipeline, rotting.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-16 items-baseline">
                <h3 className="text-2xl md:text-[1.625rem] font-heading font-bold text-fg uppercase leading-tight mb-0">
                  Your website looks like every other clinic on the block.
                </h3>
                <p className="text-fg-secondary leading-relaxed">
                  If your online presence doesn’t differentiate you in 3 seconds, you’re competing on price. And you’ll lose.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services / Built for Patients Section */}
        <section id="services-section" className="section-padding bg-surface-alt">
          <div className="mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 max-w-2xl md:mb-16"
            >
              <h2 className="mb-4 text-3xl font-semibold normal-case leading-tight tracking-[-0.02em] text-fg md:text-4xl" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                Built for how patients actually choose a dentist.
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-fg-secondary">
                Web design, conversion, and search optimization as one system. Each discipline wins one step of the decision.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
              {/* Search Optimization Card */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-6 transition-colors duration-300 hover:border-border-strong md:p-8 md:col-span-2 md:min-h-[21rem] lg:col-span-7"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_100%_0%,rgba(154,107,255,0.09),transparent_70%)]"></div>
                <h3 className="mb-3 text-xl font-semibold normal-case leading-snug tracking-[-0.01em] text-fg md:text-2xl" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                  Search Optimization
                </h3>
                <p className="max-w-md leading-relaxed text-fg-secondary">
                  Patients ask Google, scroll Maps, and query AI assistants. We make sure every answer points back to your practice.
                </p>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-white/70 px-4 py-3">
                    <div className="text-sm font-semibold text-fg">SEO</div>
                    <div className="mt-0.5 text-xs leading-relaxed text-fg-tertiary">Rank in search</div>
                  </div>
                  <div className="rounded-lg border border-border bg-white/70 px-4 py-3">
                    <div className="text-sm font-semibold text-fg">AEO</div>
                    <div className="mt-0.5 text-xs leading-relaxed text-fg-tertiary">Own the answer box</div>
                  </div>
                  <div className="rounded-lg border border-border bg-white/70 px-4 py-3">
                    <div className="text-sm font-semibold text-fg">GEO</div>
                    <div className="mt-0.5 text-xs leading-relaxed text-fg-tertiary">Get cited by AI</div>
                  </div>
                </div>
              </motion.div>

              {/* Web Design Card */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-6 transition-colors duration-300 hover:border-border-strong md:p-8 md:row-span-2 lg:col-span-5 lg:row-span-2"
              >
                <div className="relative mb-6 min-h-[16rem] flex-1 overflow-hidden rounded-lg bg-surface-alt">
                  <img alt="Conversion-focused website design for a cosmetic dental clinic" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" src="/services/web-design-cell.png" />
                </div>
                <h3 className="mb-3 text-xl font-semibold normal-case leading-snug tracking-[-0.01em] text-fg md:text-2xl" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                  Web Design
                </h3>
                <p className="leading-relaxed text-fg-secondary">
                  Your site gets three seconds of comparison. Ours are built to win them.
                </p>
                <a className="group/link mt-4 inline-flex items-center gap-1.5 self-start text-sm font-medium text-fg no-underline transition-transform duration-200 active:scale-[0.99]" href="/services/clinic-website">
                  See the clinic website
                  <svg aria-hidden="true" className="lucide lucide-arrow-right h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </motion.div>

              {/* Conversion Optimization Card */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white p-6 transition-colors duration-300 hover:border-border-strong md:p-8 md:min-h-[15rem] lg:col-span-4"
              >
                <h3 className="mb-3 text-xl font-semibold normal-case leading-snug tracking-[-0.01em] text-fg md:text-2xl" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                  Conversion Optimization
                </h3>
                <p className="leading-relaxed text-fg-secondary">
                  More booked consults from the traffic you already have.
                </p>
                <p className="mt-3 text-body-sm leading-relaxed text-fg-tertiary">
                  Lead capture, instant follow-up, and reminder sequences that close the loop.
                </p>
              </motion.div>

              {/* The Result dark purple card */}
              <motion.div 
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border p-6 transition-colors duration-300 md:p-8 justify-center border-transparent bg-[#111111] hover:border-transparent md:min-h-[15rem] lg:col-span-3"
              >
                <p className="mb-3 text-sm font-medium text-fg-inverse-secondary">The result</p>
                <h3 className="text-lg font-semibold normal-case leading-snug tracking-[-0.01em] text-fg-inverse md:text-xl" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                  A <span className="text-[#9a6bff]">full schedule</span>, measured in booked consultations.
                </h3>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="section-padding">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] font-semibold normal-case leading-[1.02] tracking-[-0.035em] text-fg mb-6" style={{ fontFamily: '"Instrument Sans", sans-serif' }}>
                Wanna fill<br />your chairs?
              </h2>
              <div className="mt-10">
                <button className="inline-flex h-[44px] self-center items-center justify-center rounded-full bg-[#9a6bff] px-6 text-base font-medium leading-none text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8a5cef] hover:shadow-[0_6px_16px_rgba(154,107,255,0.18)] sm:h-[52px] sm:self-auto sm:px-8">
                  Get started
                </button>
              </div>
              <p className="mt-6 text-sm text-fg-tertiary">
                Free call  ·  No contracts  ·  Live in two weeks
              </p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-surface-alt border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="font-heading font-bold text-fg uppercase text-lg tracking-wide">
                  Opulent Automation
                </div>
                <p className="text-sm text-fg-tertiary mt-1">
                  Automation systems for cosmetic dental clinics.
                </p>
              </div>
              <nav className="flex items-center gap-6">
                <a className="text-sm text-fg-secondary hover:text-fg transition-colors no-underline" href="#services-section">Services</a>
                <a className="text-sm text-fg-secondary hover:text-fg transition-colors no-underline" href="#contact-section">Contact</a>
              </nav>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-fg-tertiary">
                © 2026 Opulent Automation. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SynaraClone;
