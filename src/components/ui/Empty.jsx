import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useNavigate } from "react-router-dom";

const Empty = ({ 
  icon = "Package", 
  title = "No items found", 
  message = "Try adjusting your filters or search term",
  actionLabel = "Browse Products",
  actionPath = "/"
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] px-4"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <ApperIcon name={icon} size={48} className="text-gray-400" />
        </div>
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{message}</p>
      <Button onClick={() => navigate(actionPath)} variant="primary">
        <ApperIcon name="Home" size={18} className="mr-2" />
        {actionLabel}
      </Button>
    </motion.div>
  );
};

export default Empty;