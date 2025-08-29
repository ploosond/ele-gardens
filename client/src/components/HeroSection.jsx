const HeroSection = ({ title, highlight, description }) => {
  return (
    <section className="from-primary-dark text-on-dark relative mt-10 bg-gradient-to-r to-primary py-16">
      {/* Content */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            {title} <span className="text-green-300">{highlight}</span>
          </h2>
          <p className="text-lg leading-relaxed text-white/80">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
