import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import productService from "../../api/productService";
import { Link } from "@tanstack/react-router";
import BackButton from "../../components/BackButton";
import { ArrowRight } from "lucide-react";
import { RxHeight, RxWidth } from "react-icons/rx";
import { PiSnowflakeThin } from "react-icons/pi";
import { IoSunnyOutline } from "react-icons/io5";
import ProductGallery from "../../components/ProductGallery";
import ProductCard from "../../components/ProductCard";

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetail,
});

function ProductDetail() {
  const { productId } = Route.useParams();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["prodcuts"],
    queryFn: () => productService.getAllProducts(),
  });

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getOneProduct(productId),
  });

  if (isLoadingProduct || isLoadingProducts) {
    return (
      <div className="bg-three flex min-h-screen items-center justify-center">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Loading...</h2>
        </div>
      </div>
    );
  }

  if (isErrorProduct || isErrorProducts) {
    return (
      <div className="bg-three flex min-h-screen items-center justify-center">
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
            className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-on-dark hover:bg-primary-dark"
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
    <div className="container mx-auto mt-12 px-4 py-12">
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
            <h1 className="mb-2 font-poppins text-2xl font-semibold text-primary sm:text-3xl">
              {product.common_name.en}
            </h1>
            <hr className="border-muted/60 mb-6 border-0 border-b-2" />
            {/* Product Attributes */}
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-6 rounded-lg bg-white p-6 shadow-lg sm:grid-cols-2 lg:grid-cols-2">
              {/* Row 1 */}
              <div className="flex items-center space-x-2">
                <RxHeight className="h-8 w-8 rounded bg-muted p-1 text-primary" />
                <p className="whitespace-nowrap">Height</p>
              </div>
              <div className="flex items-center font-semibold text-text">
                {product.height ? `${product.height} cm` : "—"}
              </div>

              <div className="flex items-center space-x-2">
                <RxWidth className="h-8 w-8 rounded bg-muted p-1 text-primary" />
                <p className="whitespace-nowrap">Diameter</p>
              </div>
              <div className="flex items-center font-semibold text-text">
                {product.diameter ? `${product.diameter} cm` : "—"}
              </div>

              {/* Row 2 */}
              <div className="flex items-center space-x-2">
                <PiSnowflakeThin className="h-8 w-8 rounded bg-muted p-1 text-primary" />
                <p className="whitespace-nowrap">Hardy</p>
              </div>
              <div className="flex items-center font-semibold text-text">
                {product.hardiness ? `${product.hardiness}°C` : "—"}
              </div>

              <div className="flex items-center space-x-2">
                <IoSunnyOutline className="h-8 w-8 rounded bg-muted p-1 text-primary" />
                <p className="whitespace-nowrap">Light</p>
              </div>
              <div className="flex items-center font-semibold text-text">
                {typeof product.light === "object"
                  ? product.light.en || product.light.de || ""
                  : product.light || ""}
              </div>
            </div>
          </div>
          <p className="text-justify leading-relaxed text-text">
            {product.description.en}
          </p>
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
              className="hidden items-center text-primary transition-colors hover:text-primary-dark md:flex"
            >
              View all products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {relatedProducts?.map((p) => (
              <Link key={p._id} to={`/products/${p._id}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center text-primary transition-colors hover:text-primary-dark"
            >
              View all products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
