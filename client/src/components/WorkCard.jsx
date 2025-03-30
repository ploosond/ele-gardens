const WorkCard = ({ title, description, image, onButtonClick, buttonText }) => {
  return (
    <div className="group overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-800 group-hover:text-green-600">
          {title}
        </h3>
        <p className="mb-4 text-gray-600">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </p>
        <button
          onClick={onButtonClick}
          className="rounded-md bg-green-600 px-4 py-2 text-white shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default WorkCard;
