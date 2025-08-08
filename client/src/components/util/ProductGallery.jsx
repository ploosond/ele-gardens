import { useState } from "react";

export default function ProductGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="mx-auto flex max-w-full flex-col items-center">
      {/* Main image */}
      <div className="h-[640px] w-[560px] overflow-hidden rounded-md border">
        <img
          src={selectedImage.url}
          alt={selectedImage.altText}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex space-x-2 overflow-x-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="h-20 w-24 overflow-hidden rounded-md border"
          >
            <img
              src={image.url}
              alt={image.altText}
              onClick={() => setSelectedImage(image)}
              className={`h-full w-full cursor-pointer object-cover transition ${
                selectedImage.url === image.url
                  ? "border-2 border-black brightness-75"
                  : "border border-gray-300 brightness-100"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
