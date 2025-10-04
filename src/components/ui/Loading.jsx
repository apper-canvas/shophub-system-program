import { motion } from "framer-motion";

const Loading = ({ type = "products" }) => {
  if (type === "products") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            <div className="h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
              <div className="flex justify-between items-center mt-4">
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-24 animate-pulse" />
                <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-pulse" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[500px] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse" />
          <div className="space-y-6">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-1/2 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-4/6 animate-pulse" />
            </div>
            <div className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
      />
    </div>
  );
};

export default Loading;