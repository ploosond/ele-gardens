import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FaPlay, FaPause } from "react-icons/fa"; // FontAwesome icons for play/pause

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
      className="mx-auto max-w-5xl rounded-lg bg-white shadow-lg"
    >
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg shadow-md">
        <ReactPlayer
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          width="100%"
          height="100%"
          playing={isPlaying}
          muted={true}
          controls={false}
          loop={false}
          className="rounded-lg"
        />

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="absolute bottom-4 right-4 z-20 flex items-center justify-center rounded-full bg-black bg-opacity-60 p-3 text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          title={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
      </div>
    </div>
  );
};

export default VideoWithPlaceholder;
