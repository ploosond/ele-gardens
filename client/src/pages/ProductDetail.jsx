import { useParams, Link } from "react-router";
import ProductGallery from "../components/util/ProductGallery";
import { RxHeight, RxWidth } from "react-icons/rx";
import { PiSnowflakeThin } from "react-icons/pi";
import { IoSunnyOutline } from "react-icons/io5";
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
    <div className="container mx-auto mt-8 px-4 py-12">
      {/* Back to Products Button */}

      {/* <Link
        to="/products"
        className="mb-4 inline-block text-lg text-green-600 hover:text-green-800"
      >
        &larr; Back to Products
      </Link> */}

      {/* Content Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24">
        {/* Image Slider (portrait mode) */}
        <div className="flex items-start justify-center">
          <ProductGallery
            images={product.images}
            className="aspect-[3/4] max-h-[600px]"
          />
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
              Alopecurus pratensis, commonly known as meadow foxtail, is a
              perennial grass species native to Europe and parts of Asia. It is
              one of the earliest grasses to flower in spring, producing dense,
              cylindrical flower heads that resemble a fox’s tail. This grass
              thrives in moist, fertile soils and is often found in meadows,
              pastures, and along riverbanks. It is highly valued as a forage
              plant for livestock, offering good nutritional quality early in
              the growing season. Meadow foxtail is known for its ability to
              establish quickly and compete well with other grasses, making it
              useful in pasture improvement.
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
              {product.height} cm
            </div>

            <div className="flex items-center space-x-2">
              <RxWidth className="h-8 w-8 rounded bg-gray-400 p-1 text-white" />
              <p className="whitespace-nowrap">Diameter</p>
            </div>
            <div className="flex items-center font-semibold text-gray-800">
              {product.diameter} cm
            </div>

            {/* Row 2 */}
            <div className="flex items-center space-x-2">
              <PiSnowflakeThin className="h-8 w-8 rounded bg-gray-400 p-1 text-white" />
              <p className="whitespace-nowrap">Hardy</p>
            </div>
            <div className="flex items-center font-semibold text-gray-800">
              {product.hardiness}°C
            </div>

            <div className="flex items-center space-x-2">
              <IoSunnyOutline className="h-8 w-8 rounded bg-gray-400 p-1 text-white" />
              <p className="whitespace-nowrap">Light</p>
            </div>
            <div className="flex items-center font-semibold text-gray-800">
              {product.light}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
