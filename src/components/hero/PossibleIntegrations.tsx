import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function cnFallback(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

const classNames = typeof cn !== 'undefined' ? cn : cnFallback;

interface Logo {
  id: string;
  name: string;
  image?: string;
  className?: string;
}

interface PossibleIntegrationsProps {
  heading?: string;
  description?: string;
  logos?: Logo[];
  autoScrollInterval?: number;
  className?: string;
}

const PossibleIntegrations: React.FC<PossibleIntegrationsProps> = ({
  heading = "Intégrations Possibles",
  description = "Connectez-vous avec les principaux logiciels que votre entreprise utilise quotidiennement. Intégrations fluides avec vos logiciels préférés.",
  logos = [
    {
      id: "cdk-global",
      name: "CDK Global",
      image: "/CDKglobal.png",
    },
    {
      id: "slack",
      name: "Slack",
      image: "/Slack.png",
    },
    {
      id: "google",
      name: "Google",
      image: "/Gsuite.png",
    },
    {
      id: "office365",
      name: "Office 365",
      image: "/Office365.png",
    },
    {
      id: "pbs",
      name: "PBS",
      image: "/PBSSystems.png",
    },
    {
      id: "dealertrack",
      name: "Dealertrack",
      image: "/Dealertrack.png",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      image: "/Salesforce.png",
    },
    {
      id: "xero",
      name: "Xero",
      image: "/Xero.png",
    },
    {
      id: "docusign",
      name: "DocuSign",
      image: "/DocuSign.png",
    },
    {
      id: "apicustom",
      name: "ApiCustom",
      image: "/api.png",
    },
    {
      id: "more",
      name: "Et encore plus...",
      image: "/encoreplus.png",
    },
  ],
  autoScrollInterval = 4000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsPerView, setItemsPerView] = useState(5);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(5);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, logos.length - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, autoScrollInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, maxIndex, autoScrollInterval]);

  const scrollToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const scrollToNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  const generateLogoSVG = (name: string) => {
    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="120"
          height="40"
          rx="6"
          fill="rgba(255, 255, 255, 0.1)"
          stroke="#007BFF"
          strokeWidth="1"
        />
        <text
          x="60"
          y="25"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
        >
          {initials}
        </text>
      </svg>
    );
  };

  return (
    <section
      className={classNames("py-8 md:py-16 px-4 w-full max-w-full overflow-hidden", className)}
    >
      <div className="container mx-auto max-w-6xl w-full max-w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: '#FFFFFF' }}
          >
            {heading}
          </h2>
          <p
            className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4"
            style={{ color: '#E0E6ED' }}
          >
            {description}
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={scrollToPrevious}
            className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: '#007BFF',
              color: '#FFFFFF'
            }}
            aria-label="Previous logos"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button
            onClick={scrollToNext}
            className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              backgroundColor: '#007BFF',
              color: '#FFFFFF'
            }}
            aria-label="Next logos"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          {/* Logos Container */}
          <div
            ref={containerRef}
            className="overflow-hidden mx-8 md:mx-12"
          >
            <div
              className="flex transition-transform duration-500 ease-in-out gap-3 md:gap-4 lg:gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div
                    className="relative p-3 md:p-4 lg:p-6 rounded-lg border transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: `0 0 20px rgba(46, 196, 255, 0.3)`,
                        backgroundColor: 'rgba(46, 196, 255, 0.1)',
                      }}
                    />
                    
                    {/* Logo Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-16 md:h-20">
                      {logo.image ? (
                        <img
                          src={logo.image}
                          alt={logo.name}
                          className={classNames("object-contain max-h-full w-auto", logo.className)}
                        />
                      ) : (
                        generateLogoSVG(logo.name)
                      )}
                    </div>

                    {/* Logo Name */}
                    <div className="relative z-10 mt-2 md:mt-3 text-center">
                      <p
                        className="text-xs md:text-sm font-medium"
                        style={{ color: '#E0E6ED' }}
                      >
                        {logo.name}
                      </p>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: index === currentIndex ? '#2EC4FF' : 'rgba(224, 230, 237, 0.3)',
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PossibleIntegrations;