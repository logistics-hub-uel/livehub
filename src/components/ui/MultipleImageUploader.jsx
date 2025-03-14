import React from "react";

const MultipleImageUploader = () => {
  const [images, setImages] = React.useState([]);

  const handleUpload = () => {};

  return (
    <div>
      <h1>Tải ảnh lên</h1>
      <input type="file" multiple />

      <button>Upload</button>

      {/* Render */}
      <div>
        {/* Number of uploaded images */}
        <p>Uploaded images: {images.length}</p>

        {/* List of uploaded images */}
      </div>
    </div>
  );
};

export default MultipleImageUploader;
