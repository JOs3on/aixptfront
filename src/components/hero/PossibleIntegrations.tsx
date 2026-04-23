import React from "react";
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
  className?: string;
}

const PossibleIntegrations: React.FC<PossibleIntegrationsProps> = ({
  heading = "Intégrations Possibles",
  description = "Connectez-vous avec les principaux logiciels que votre entreprise utilise quotidiennement. Intégrations fluides avec vos logiciels préférés.",
  logos = [
    { id: "cdk-global", name: "CDK Global", image: "/CDKglobal.png" },
    { id: "slack", name: "Slack", image: "/Slack.png" },
    { id: "google", name: "Google", image: "/Gsuite.png" },
    { id: "office365", name: "Office 365", image: "/Office365.png" },
    { id: "pbs", name: "PBS", image: "/PBSSystems.png" },
    { id: "dealertrack", name: "Dealertrack", image: "/Dealertrack.png" },
    { id: "salesforce", name: "Salesforce", image: "/Salesforce.png" },
    { id: "xero", name: "Xero", image: "/Xero.png" },
    { id: "docusign", name: "DocuSign", image: "/DocuSign.png" },
    { id: "apicustom", name: "Sur mesure", image: "/api.png" },
    { id: "more", name: "Et encore plus...", image: "/encoreplus.png" },
  ],
  className,
}) => {
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
          fill="rgba(0, 0, 0, 0.05)"
          stroke="#007BFF"
          strokeWidth="1"
        />
        <text
          x="60"
          y="25"
          textAnchor="middle"
          fill="#333333"
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
    <section className={classNames("py-8 md:py-16 px-4 w-full overflow-hidden", className)}>
      <div className="container mx-auto max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
            {heading}
          </h2>
          <p className="text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4 text-gray-300">
            {description}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll group hover:[animation-play-state:paused]">
            {/* We duplicate the array to create the infinite scroll effect */}
            {[...logos, ...logos].map((logo, index) => (
              <li key={`${logo.id}-${index}`} className="flex-shrink-0">
                <div className="relative p-4 md:p-6 rounded-2xl bg-white/95 backdrop-blur shadow-xl flex flex-col items-center justify-center w-40 md:w-56 h-32 md:h-40 border border-white/20 mx-2 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(46,196,255,0.3)]">
                  <div className="w-full h-14 md:h-20 flex items-center justify-center mix-blend-multiply">
                    {logo.image ? (
                      <img
                        src={logo.image}
                        alt={logo.name}
                        className={classNames("object-contain w-auto h-full max-h-16 mix-blend-multiply", logo.className)}
                        loading="lazy"
                      />
                    ) : (
                      generateLogoSVG(logo.name)
                    )}
                  </div>
                  <div className="mt-3 md:mt-4 text-center w-full">
                    <p className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-1">
                      {logo.name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PossibleIntegrations;