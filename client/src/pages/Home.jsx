import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Leaf, Droplets, Mountain } from "lucide-react";
import ProductCard from "../components/ProductCard";
import MemberCard from "../components/MemberCard";

const Home = ({ products, members }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const homeSliderImages = [
    {
      url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      alt: "Beautiful garden with orange flowers",
    },
    {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      alt: "Sunlight passing through green leafed trees",
    },
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      alt: "Serene body of water surrounded by trees",
    },
  ];
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  // Get featured team members (first 4)
  const featuredTeam = members.slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === homeSliderImages.length - 1 ? 0 : prevSlide + 1,
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [homeSliderImages.length]);

  return (
    <div>
      {/* Hero Section with Slider */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-r from-green-900 to-green-700">
        {/* Slider */}
        <div className="absolute inset-0 z-0">
          {homeSliderImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 z-10 bg-black/50"></div>
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <div className="px-4 text-center text-white">
            <div className="mb-6 inline-block rounded-full bg-white/20 px-3 py-1 text-xl font-medium text-white backdrop-blur-sm">
              Welcome to EleGardens
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Transform Your Space with{" "}
              <span className="text-green-300">Nature's Beauty</span>
            </h1>
            <p className="mx-auto mb-8 max-w-lg text-lg text-white/80">
              Discover the perfect plants and designs to create your dream
              garden.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
              >
                Explore Products
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
          {homeSliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-4 w-4 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-green-600"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            ></button>
          ))}
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-three py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              We deliver excellence in all aspects of gardening
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="hover-scale rounded-lg bg-white p-6 text-center shadow-md">
              <div className="bg-garden-green-light/20 text-garden-green-dark mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Leaf size={32} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Quality Plants</h3>
              <p className="text-gray-600">
                We grow and source the healthiest plants for your garden.
              </p>
            </div>

            <div className="hover-scale rounded-lg bg-white p-6 text-center shadow-md">
              <div className="bg-garden-green-light/20 text-garden-green-dark mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Droplets size={32} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Sustainable Practices
              </h3>
              <p className="text-gray-600">
                We use eco-friendly methods in all our garden projects.
              </p>
            </div>

            <div className="hover-scale rounded-lg bg-white p-6 text-center shadow-md">
              <div className="bg-garden-green-light/20 text-garden-green-dark mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                <Mountain size={32} />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Beautiful Designs</h3>
              <p className="text-gray-600">
                Our landscape designs transform outdoor spaces.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Products Section */}
      <section className="bg-two py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Featured Products
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Discover our selection of premium plants
              </p>
            </div>
            <Link
              to="/products"
              className="text-garden-green-dark hover:text-garden-green-light hidden items-center transition-colors md:flex"
            >
              View all products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.tag} product={product} />
            ))}
          </div>

          {/* Mobile View All Products Link */}
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
      {/* Team Section */}
      <section className="bg-three py-16">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
                Meet Our Team
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                The experts behind our beautiful gardens
              </p>
            </div>
            <Link
              to="/team"
              className="text-garden-green-dark hover:text-garden-green-light hidden items-center transition-colors md:flex"
            >
              View full team <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredTeam.map((member) => (
              <MemberCard key={member._id} member={member} />
            ))}
          </div>

          {/* Mobile View Full Team Link */}
          <div className="mt-8 text-center md:hidden">
            <Link
              to="/team"
              className="text-garden-green-dark hover:text-garden-green-light inline-flex items-center transition-colors"
            >
              View full team <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-three relative overflow-hidden py-4 md:py-8">
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
            Ready to Transform Your Space?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Whether you're designing a new garden, renovating an existing space,
            or simply adding a few plants to your home, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-md border border-transparent bg-secondary px-6 py-3 font-medium text-white transition hover:border-white hover:bg-accent"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
