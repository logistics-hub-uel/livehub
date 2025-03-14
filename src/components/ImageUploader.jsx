import React, { useState } from "react";
import { uploadImage } from "../services/ImageService";

const ImageUploader = ({ onImagesUploaded }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    setUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadImage(file));
      const responses = await Promise.all(uploadPromises);
      const imageUrls = responses.map((response) => response.data.url);
      onImagesUploaded(imageUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*"
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUploader;
