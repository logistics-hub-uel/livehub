import React, { useEffect, useState } from "react";
import {
  GetUserServices,
  DeleteService,
  GetServiceDetail,
} from "../services/ServiceService";
import AuthStore from "../store/AuthStore";
import "./UserServices.css"; // We'll need to create this for modal styling

const UserServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { credentials } = AuthStore();

  const fetchUserServices = async () => {
    try {
      const response = await GetUserServices(credentials.user_id);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await DeleteService(serviceId);
      fetchUserServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleViewDetails = async (serviceId) => {
    try {
      const response = await GetServiceDetail(serviceId);
      setSelectedService(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

  useEffect(() => {
    if (credentials.user_id) {
      fetchUserServices();
    }
  }, [credentials.user_id]);

  return (
    <div>
      <h2>Dịch Vụ Của Tôi</h2>
      <table>
        <thead>
          <tr>
            <th>Tên Dịch Vụ</th>
            <th>Mô Tả</th>
            <th>Giá (VND)</th>
            <th>Danh Mục</th>
            <th>Hình Ảnh</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{new Intl.NumberFormat("vi-VN").format(service.price)}đ</td>
              <td>{service.category}</td>
              <td>
                {service.images_urls &&
                  service.images_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${service.name} - ${index + 1}`}
                      style={{ width: "50px", height: "50px", margin: "2px" }}
                    />
                  ))}
              </td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => handleViewDetails(service.id)}
                >
                  Xem Chi Tiết
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(service.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Chi Tiết Dịch Vụ</h3>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="service-images">
                {selectedService.images_urls &&
                  selectedService.images_urls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`${selectedService.name} - ${index + 1}`}
                      className="service-detail-image"
                    />
                  ))}
              </div>
              <div className="service-info">
                <h4>{selectedService.name}</h4>
                <p>
                  <strong>Mô tả:</strong> {selectedService.description}
                </p>
                <p>
                  <strong>Giá:</strong>{" "}
                  {new Intl.NumberFormat("vi-VN").format(selectedService.price)}
                  đ
                </p>
                <p>
                  <strong>Danh mục:</strong> {selectedService.category}
                </p>
                {selectedService.available_time_slots && (
                  <div className="time-slots">
                    <p>
                      <strong>Khung giờ có sẵn:</strong>
                    </p>
                    <ul>
                      {selectedService.available_time_slots.map(
                        (slot, index) => (
                          <li key={index}>{slot}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {selectedService.is_support_preference && (
                  <p>
                    <strong>Mạng xã hội hỗ trợ:</strong>{" "}
                    {selectedService.preference_social_media}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserServices;
