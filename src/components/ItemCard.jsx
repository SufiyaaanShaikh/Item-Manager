import { motion } from 'framer-motion';

const ItemCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200 group-hover:shadow-md"
    >
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {item.imageUrls?.[0] ? (
          <img
            src={item.imageUrls[0]}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-lg truncate mb-1">{item.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 capitalize px-2 py-1 bg-gray-100 rounded-full">
            {item.type}
          </span>
          <span className="font-semibold text-gray-900">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;