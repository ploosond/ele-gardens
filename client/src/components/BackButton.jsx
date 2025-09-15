import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

const BackButton = ({
  to = "",
  label = "",
  className = "",
  fullWidth = false,
}) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-3 bg-primary px-5 py-2 text-on-dark shadow-md hover:bg-primary-dark ${fullWidth ? "w-full justify-center" : ""} ${className}`}
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="text-base">{label}</span>
    </Link>
  );
};

export default BackButton;
