import React, { useState, useEffect } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [imageData, setImageData] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image to upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('https://blogbackend-production-023e.up.railway.app/image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('Image uploaded successfully.');
        fetchImageData();
      } else {
        setUploadStatus('Failed to upload image.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://blogbackend-production-023e.up.railway.app/image/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUploadStatus('Image deleted successfully.');
        fetchImageData();
      } else {
        setUploadStatus('Failed to delete image.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      setUploadStatus('Error deleting image.');
    }
  };

  const fetchImageData = async () => {
    try {
      const response = await fetch('https://blogbackend-production-023e.up.railway.app/image');
      if (response.ok) {
        const data = await response.json();
        setImageData(data);
      } else {
        console.error('Failed to fetch image data');
      }
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{uploadStatus}</p>

      <ul>
        {imageData.map((image, index) => (
          <li key={index}>
            <img
              src={image.imageUrl}
              alt={`Image ${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
            <button onClick={() => handleDelete(image.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageUpload;
