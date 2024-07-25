import React from 'react';
import ImageUploader from '../components/ImageUploader';
import ImageGrid from '../components/ImageGrid';

const Home = () => {
  return (
    <div>
      <h1>Image Upload and Display App</h1>
      <ImageUploader />
      <h2>Uploaded Images</h2>
      <ImageGrid />
    </div>
  );
}

export default Home;