import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "de";

  return (
    <div className="bg-white shadow-md transition hover:shadow-lg">
      {/* Image Section */}
      <div className="h-1" style={{ backgroundColor: product.color }}></div>
      <div className="relative overflow-hidden object-cover">
        <img
          src={product.images[0].url}
          alt={product.common_name[lang]}
          className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-96"
        />
      </div>

      {/* Content Section */}
      <div
        className="overflow-hidden p-2"
        style={{ backgroundColor: product.color, height: "6rem" }}
      >
        {lang === "de" ? (
          <>
            <p className="text-base font-bold italic text-white md:text-lg">
              {product.common_name.de}
            </p>
            <p className="text-xs italic text-gray-100 md:text-sm">
              {product.common_name.en}
            </p>
          </>
        ) : (
          <>
            <p className="text-base font-bold italic text-white md:text-lg">
              {product.common_name.en}
            </p>
            <p className="text-xs italic text-gray-100 md:text-sm">
              {product.common_name.de}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
