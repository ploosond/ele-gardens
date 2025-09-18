import React from "react";
import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative mx-auto max-w-md">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-transparent bg-white/10 py-3 pl-10 pr-4 text-white placeholder-white/70 shadow-md focus:border-primary focus:outline-none focus:ring-primary"
      />
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 transform text-white/70"
        size={20}
      />
    </div>
  );
};

export default SearchInput;
