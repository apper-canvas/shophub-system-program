import { cn } from "@/utils/cn";

const Badge = ({ children, variant = "default", className }) => {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    primary: "bg-gradient-to-r from-primary to-orange-500 text-white",
    accent: "bg-gradient-to-r from-accent to-yellow-500 text-gray-900",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;