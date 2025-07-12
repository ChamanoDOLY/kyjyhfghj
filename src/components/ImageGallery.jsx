import React from 'react';

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-3">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img 
            src={image.url} 
            alt={image.alt}
            className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300';
            }}
          />
          <button 
            onClick={image.onTryNow}
            className="absolute bottom-2 left-2 bg-black text-white px-3 py-1 rounded-full text-xs hover:bg-gray-800 transition-all transform hover:scale-105 focus-visible:focus-visible"
          >
            Try Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;