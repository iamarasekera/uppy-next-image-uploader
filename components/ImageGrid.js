import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/get-images');
      const data = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="image-grid">
      {images.map((image, index) => (
        <div key={index} className="image-item">
          <Image src={image.url} alt={`Image ${index}`} width={200} height={200} />
        </div>
      ))}
      <style jsx>{`
        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .image-item {
          overflow: hidden;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default ImageGrid;