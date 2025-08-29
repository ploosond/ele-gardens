import { useState } from "react";

export default function ProductGallery({
  images = [],
  className = "h-[50vh] w-full sm:h-[60vh] lg:h-[85vh]",
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] || null;

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col gap-4">
        {/* Main image area */}
        <div className="w-full">
          <div className="relative w-full overflow-hidden rounded-md bg-gray-50">
            <div className={`w-full ${className}`}>
              {selectedImage ? (
                <img
                  src={selectedImage.url}
                  alt={
                    selectedImage.altText ||
                    selectedImage.caption ||
                    "Product image"
                  }
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchpriority={selectedIndex === 0 ? "high" : "auto"}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnails row (under the main image) */}
        <div className="w-full">
          <div className="flex w-full justify-center gap-3 overflow-x-auto py-2">
            {images.map((image, index) => (
              <button
                key={(image.url || index) + index}
                onClick={() => setSelectedIndex(index)}
                aria-pressed={selectedIndex === index}
                className={`flex-shrink-0 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-200 ${
                  selectedIndex === index ? "ring-2 ring-green-500" : "ring-0"
                }`}
                aria-label={
                  image.altText || image.caption || `Thumbnail ${index + 1}`
                }
              >
                <img
                  src={image.thumb || image.url}
                  alt={
                    image.altText || image.caption || `Thumbnail ${index + 1}`
                  }
                  className="h-20 w-20 rounded-md object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
