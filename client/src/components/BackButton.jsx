import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";

const BackButton = ({
  to = "/products",
  label = "Back to Products",
  className = "",
  fullWidth = false,
}) => {
  return (
    <Link
      to={to}
      className={`text-on-dark hover:bg-primary-dark inline-flex items-center gap-3 bg-primary px-5 py-2 shadow-md ${fullWidth ? "w-full justify-center" : ""} ${className}`}
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="text-base">{label}</span>
    </Link>
  );
};

export default BackButton;
