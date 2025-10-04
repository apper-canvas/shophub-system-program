import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilterPanel = ({ filters, onFilterChange, onClear }) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || 0,
    max: filters.maxPrice || 1000
  });

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: parseFloat(value) };
    setPriceRange(newRange);
    onFilterChange({ minPrice: newRange.min, maxPrice: newRange.max });
  };

  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-gray-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear All
        </Button>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Min Price</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              className="w-full accent-primary"
            />
            <span className="text-sm font-medium text-primary">${priceRange.min}</span>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Max Price</label>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange.max}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              className="w-full accent-primary"
            />
            <span className="text-sm font-medium text-primary">${priceRange.max}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === rating}
                onChange={() => onFilterChange({ minRating: rating })}
                className="accent-primary"
              />
              <div className="flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <ApperIcon 
                    key={i} 
                    name="Star" 
                    size={14} 
                    className="fill-accent text-accent"
                  />
                ))}
                <span className="text-sm text-gray-600 group-hover:text-gray-900">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Availability</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange({ inStock: e.target.checked ? true : undefined })}
            className="accent-primary"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;