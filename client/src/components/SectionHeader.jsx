const SectionHeader = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-8 ${centered ? "text-center" : ""}`}>
      <h2 className="text-garden-green-dark text-3xl font-bold md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
      <div
        className={`bg-garden-green-light mt-4 h-1 w-20 ${centered ? "mx-auto" : ""}`}
      ></div>
    </div>
  );
};

export default SectionHeader;
