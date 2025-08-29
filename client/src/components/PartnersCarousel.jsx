import React from "react";
import { partnerLogos } from "../assets/assets";

// Lightweight, CSS-only marquee-style partners carousel.
// Uses existing partnerLogos array from assets. It respects prefers-reduced-motion.
const PartnersCarousel = ({ height = 80, speed = 20 }) => {
  return (
    <div className="my-8 overflow-hidden">
      <div
        className="partners-marquee will-change-transform"
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {partnerLogos.concat(partnerLogos).map((src, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{ minWidth: 160 }}
          >
            <img
              src={src}
              alt={`partner-${i}`}
              height={height}
              decoding="async"
              loading="lazy"
              className="max-h-20 object-contain"
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .partners-marquee { /* ensure the marquee is long enough */ }
        @media (prefers-reduced-motion: reduce) {
          .partners-marquee { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default PartnersCarousel;
