import { useParams, Link } from "react-router";
import ProductGallery from "../components/util/ProductGallery";
import ProductCard from "../components/ProductCard";
import { ArrowRight } from "lucide-react";
import BackButton from "../components/BackButton";
import { RxHeight, RxWidth } from "react-icons/rx";
import { PiSnowflakeThin } from "react-icons/pi";
import { IoSunnyOutline } from "react-icons/io5";
const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const product = products?.find((p) => p._id === id);

  if (!products) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-three">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

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

  // Related products (exclude current)
  const relatedProducts = products
    ?.filter((p) => p._id !== product._id)
    .slice(0, 6);

  return (
    <div className="container mx-auto mt-8 px-4 py-12">
      {/* Back to Products Button will appear above the image (left column) */}

      {/* Content Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24">
        {/* Image Slider (portrait mode) */}
        <div className="flex flex-col items-start">
          <BackButton
            to="/products"
            label="Back to Products"
            className="mb-4"
          />

          <div className="flex w-full items-start justify-center">
            <ProductGallery
              images={product.images}
              className="aspect-[2/3] max-h-[345px] md:max-h-[480px]"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          <div className="mb-10">
            <h1 className="mb-2 font-poppins text-3xl font-semibold text-green-600 sm:text-4xl">
              {product.scientific_name}
            </h1>
            <p className="mb-4 font-poppins text-lg italic text-secondary">
              {product.common_name}
            </p>
            <hr className="mb-6 border-0 border-b-2 border-gray-300" />
            <p className="text-justify leading-relaxed text-gray-700">
              {typeof product.description === "string"
                ? product.description
                : product.description?.en ||
                  product.description?.de ||
                  "No description available."}
            </p>
          </div>

          {/* Product Attributes */}
          <div className="grid w-full grid-cols-1 gap-x-8 gap-y-6 rounded-lg bg-white p-6 shadow-lg sm:grid-cols-2 lg:grid-cols-4">
            {/* Row 1 */}
            <div className="flex items-center space-x-2">
              <RxHeight className="h-8 w-8 rounded bg-gray-400 p-1 text-white" />
              <p className="whitespace-nowrap">Height</p>
            </div>
            <div className="flex items-center font-semibold text-gray-800">
              {product.height ? `${product.height} cm` : "—"}
            </div>

            <div className="flex items-center space-x-2">
              <RxWidth className="h-8 w-8 rounded bg-gray-400 p-1 text-white" />
              <p className="whitespace-nowrap">Diameter</p>
            </div>
            <div className="flex items-center font-semibold text-gray-800">
              {product.diameter ? `${product.diameter} cm` : "—"}
            </div>

            {/* Row 2 */}
            <div className="flex items-center space-x-2">
              <PiSnowflakeThin className="h-8 w-8 rounded bg-gray-400 p-1 text-white" />
              <p className="whitespace-nowrap">Hardy</p>
            </div>
            <div className="flex items-center font-semibold text-gray-800">
              {product.hardiness ? `${product.hardiness}°C` : "—"}
            </div>

            <div className="flex items-center space-x-2">
              <IoSunnyOutline className="h-8 w-8 rounded bg-gray-400 p-1 text-white" />
              <p className="whitespace-nowrap">Light</p>
            </div>
            <div className="flex items-center font-semibold text-gray-800">
              {typeof product.light === "object"
                ? product.light.en || product.light.de || ""
                : product.light || ""}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="mt-12 bg-white py-8 sm:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Related Products
              </h2>
              <p className="mt-2 text-lg text-gray-600">You might also like</p>
            </div>
            <Link
              to="/products"
              className="text-garden-green-dark hover:text-garden-green-light hidden items-center transition-colors md:flex"
            >
              View all products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {relatedProducts?.map((p) => (
              <Link key={p._id} to={`/products/${p._id}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="text-garden-green-dark hover:text-garden-green-light inline-flex items-center transition-colors"
            >
              View all products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
