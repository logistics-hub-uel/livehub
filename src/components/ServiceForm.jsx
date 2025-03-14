import React, { useState } from "react";
import { CreateService, UpdateService } from "../services/ServiceService";
import ImageUploader from "./ImageUploader";

const ServiceForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    available_time_slots: initialData?.available_time_slots || [],
    images_urls: initialData?.images_urls || [],
    is_support_preference: initialData?.is_support_preference || false,
    preference_social_media: initialData?.preference_social_media || [],
    category: initialData?.category || "",
  });

  // Remove the unused imageFiles state

  // Handler for when images are uploaded successfully
  const handleImagesUploaded = (imageUrls) => {
    setFormData({
      ...formData,
      images_urls: [...formData.images_urls, ...imageUrls],
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <div>
        <label>Tên Dịch Vụ:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Mô Tả:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label>Giá (VND):</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Hình Ảnh:</label>
        <ImageUploader onImagesUploaded={handleImagesUploaded} />
        <div className="preview-images">
          {formData.images_urls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index + 1}`}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ))}
        </div>
      </div>

      <div>
        <label>Danh Mục:</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">Chọn danh mục</option>
          <option value="education">Giáo Dục</option>
          <option value="health">Sức Khỏe</option>
          <option value="technology">Công Nghệ</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div>
        <label>Khung Giờ Làm Việc:</label>
        {/* Add time slot selection logic here */}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={formData.is_support_preference}
            onChange={(e) =>
              setFormData({
                ...formData,
                is_support_preference: e.target.checked,
              })
            }
          />
          Hỗ Trợ Tùy Chọn
        </label>
      </div>

      <button type="submit">
        {initialData ? "Cập Nhật Dịch Vụ" : "Tạo Dịch Vụ"}
      </button>
    </form>
  );
};

export default ServiceForm;
