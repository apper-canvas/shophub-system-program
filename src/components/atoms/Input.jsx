import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  label,
  error,
  className,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;