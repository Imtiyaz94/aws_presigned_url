import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [presignedUrl, setPresignedUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const getPresignedUrl = async () => {
    try {
      const response = await axios.get('http://localhost:5000/presigned-url');
      setPresignedUrl(response.data.url);
    } catch (error) {
      console.error('Error getting pre-signed URL:', error);
    }
  };

  const uploadImage = async () => {
    if (!image || !presignedUrl) {
      return;
    }

    try {
      await axios.put(presignedUrl, image, {
        headers: {
          'Content-Type': image.type,
        },
      });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="App">
      <h1>Image Upload</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={getPresignedUrl}>Get Pre-signed URL</button>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  );
}

export default App;
