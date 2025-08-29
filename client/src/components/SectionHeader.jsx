const SectionHeader = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-8 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
      <div
        className={`mt-4 h-1 w-20 bg-primary ${centered ? "mx-auto" : ""}`}
      ></div>
    </div>
  );
};

export default SectionHeader;
