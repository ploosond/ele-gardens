import React from "react";
import { useParams, Link } from "react-router";
import Carousel from "../components/util/Carousel";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p.tag === id);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-three">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Product Not Found
          </h2>
          <p className="mt-4 text-gray-600">
            The product you are looking for does not exist. Please check the URL
            or browse our products.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-md bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-three">
      <div className="container mx-auto px-4 py-12">
        {/* Back to Products Button */}
        <Link
          to="/products"
          className="mb-6 inline-block text-lg text-green-600 hover:text-green-800"
        >
          &larr; Back to Products
        </Link>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-24">
          {/* Image Slider */}
          <div className="mx-auto flex max-w-lg items-center justify-center">
            <Carousel>
              {product.images.map((image, index) => (
                <img key={index} src={image.url} alt={image.altText} />
              ))}
            </Carousel>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="mb-4 hidden rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 lg:inline-block">
                {product.category}
              </span>
              <h1 className="mb-2 text-4xl font-bold text-gray-800">
                {product.common_name}
              </h1>
              <p className="mb-4 text-lg italic text-gray-500">
                {product.scientific_name}
              </p>
              <p className="mb-6 text-gray-700">{product.description}</p>
            </div>

            {/* Product Attributes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h4 className="mb-1 text-sm font-medium text-gray-600">
                  Height
                </h4>
                <p className="text-lg font-semibold text-gray-800">
                  {product.height} cm
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h4 className="mb-1 text-sm font-medium text-gray-600">
                  Hardiness
                </h4>
                <p className="text-lg font-semibold text-gray-800">
                  Down to {product.hardiness}°C
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h4 className="mb-1 text-sm font-medium text-gray-600">
                  Diameter
                </h4>
                <p className="text-lg font-semibold text-gray-800">
                  {product.diameter} cm
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h4 className="mb-1 text-sm font-medium text-gray-600">
                  Light
                </h4>
                <p className="text-lg font-semibold text-gray-800">
                  {product.light}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
