import { useState } from "react";

export default function ProductGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] || null;

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-center lg:gap-6">
        {/* Thumbnails column (left on large screens) */}
        <div className="w-full lg:flex lg:w-20 lg:items-center lg:justify-center">
          <div className="flex w-full gap-3 overflow-x-auto lg:flex-col lg:overflow-y-auto">
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
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main image area (right on large screens) */}
        <div className="w-full lg:flex-1">
          <div className="relative w-full overflow-hidden rounded-md bg-gray-50">
            <div className="h-[50vh] w-full sm:h-[60vh] lg:h-[85vh]">
              {selectedImage ? (
                <img
                  src={selectedImage.url}
                  alt={
                    selectedImage.altText ||
                    selectedImage.caption ||
                    "Product image"
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
