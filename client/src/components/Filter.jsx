import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Filter = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="hidden w-40 md:block">
      <p
        onClick={() => setShowFilter(!showFilter)}
        className="flex cursor-pointer items-center gap-2 text-lg font-semibold sm:hidden"
      >
        FILTER
        <IoIosArrowDown
          className={`transition-transform duration-200 ${showFilter ? "rotate-180" : ""}`}
        />
      </p>
      <div
        className={`rounded-lg border border-gray-300 px-5 py-3 transition-all duration-300 ease-in-out ${
          showFilter ? "block" : "hidden sm:block"
        }`}
      >
        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <label className="flex cursor-pointer items-center gap-2">
            <input className="h-3 w-3" type="checkbox" value="flower" />
            Flower
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input className="h-3 w-3" type="checkbox" value="grass" />
            Grass
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
