import React from 'react';

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="gallery-item">
          <img 
            src={image.url} 
            alt={image.alt}
            className="gallery-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300';
            }}
          />
          <button 
            onClick={image.onTryNow}
            className="try-now-button"
          >
            Try Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;