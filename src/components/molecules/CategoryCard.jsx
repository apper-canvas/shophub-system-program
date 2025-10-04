import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => navigate(`/category/${category.name}`)}
      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center shadow-md">
          <ApperIcon name={category.icon} size={28} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.productCount} products</p>
        </div>
        <ApperIcon name="ChevronRight" size={20} className="text-gray-400" />
      </div>
    </motion.div>
  );
};

export default CategoryCard;