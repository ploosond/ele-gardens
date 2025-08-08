import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const VideoWithPlaceholder = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the video container enters viewport, start playing
        if (entry.isIntersecting) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }, // 50% of the video must be visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-5xl rounded-lg bg-white p-4 shadow-lg"
    >
      <div className="relative pt-[56.25%]">
        <ReactPlayer
          src="/videos/main.mov"
          width="100%"
          height="100%"
          playing={isPlaying}
          muted={true}
          controls={true}
          loop={false}
          className="absolute left-0 top-0 overflow-hidden rounded-lg"
        />
      </div>
    </div>
  );
};

export default VideoWithPlaceholder;
