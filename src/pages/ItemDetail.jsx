import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMail, FiTag, FiInfo } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { getItemById } from "../utils/api";
import ImageCarousel from "../components/ImageCarousel";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(id);
        setItem(response.data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleEnquire = () => {
    toast.success("Enquiry sent successfully");
  };

  const formatType = (type) => {
    const typeMap = {
      shirt: "Shirt",
      pant: "Pant",
      shoes: "Shoes",
      "sports gear": "Sports Gear",
    };
    return typeMap[type] || type;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-500 text-lg">Item not found</p>
          <Link 
            to="/" 
            className="mt-6 inline-flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to items
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back to items
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-6">
            <ImageCarousel images={item.imageUrls || []} />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
              <p className="text-2xl font-semibold text-indigo-600">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="space-y-6">
              {/* Type */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-gray-400">
                  <FiTag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="text-base text-gray-900 capitalize">
                    {formatType(item.type)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-4 text-gray-400">
                  <FiInfo className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-base text-gray-700 whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleEnquire}
                type="button"
                className="w-full cursor-pointer lg:w-auto inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <FiMail className="mr-2" />
                Enquire About This Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItemDetail;