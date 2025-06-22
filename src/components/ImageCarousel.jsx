import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (images.length === 0) {
    return (
      <div className="h-96 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
        No Images Available
      </div>
    );
  }

  return (
    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Item ${index + 1}`}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
          >
            <FiChevronRight size={20} />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 cursor-pointer rounded-full ${
                index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;