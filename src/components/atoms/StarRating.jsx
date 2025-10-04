import ApperIcon from "@/components/ApperIcon";

const StarRating = ({ rating, maxRating = 5, size = 16, showValue = false }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <ApperIcon key={i} name="Star" size={size} className="fill-accent text-accent" />
        ))}
        {hasHalfStar && (
          <ApperIcon name="StarHalf" size={size} className="fill-accent text-accent" />
        )}
        {[...Array(maxRating - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <ApperIcon key={`empty-${i}`} name="Star" size={size} className="text-gray-300" />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;