import ApiService from "./ApiService";

const serviceApi = new ApiService("/services");

export const GetServices = async (filters = {}) => {
  const response = await serviceApi.protected().get("", { params: filters });
  return response;
};

export const CreateService = async ({
  name,
  description,
  price,
  available_time_slots,
  images_urls,
  is_support_preference,
  preference_social_media,
  category,
  supplier_id,
}) => {
  const serviceData = {
    name,
    description,
    price,
    available_time_slots,
    images_urls,
    is_support_preference,
    preference_social_media,
    category,
    supplier_id,
  };

  alert(JSON.stringify(serviceData));

  const response = await serviceApi.protected().post("", serviceData);
  return response;
};

export const GetServiceDetail = async (serviceId) => {
  const response = await serviceApi.protected().get(`/detail/${serviceId}`);
  return response;
};

export const GetUserServices = async (userId) => {
  const response = await serviceApi.protected().get("", {
    params: {
      supplier_id: userId,
    },
  });
  return response;
};

export const UpdateService = async (
  serviceId,
  {
    name,
    description,
    price,
    available_time_slots,
    images_urls,
    is_support_preference,
    preference_social_media,
    category,
  }
) => {
  const serviceData = {
    name,
    description,
    price,
    available_time_slots,
    images_urls,
    is_support_preference,
    preference_social_media,
    category,
  };

  const response = await serviceApi
    .protected()
    .put(`/${serviceId}`, serviceData);
  return response;
};

export const DeleteService = async (serviceId) => {
  const response = await serviceApi.protected().delete(`/${serviceId}`);
  return response;
};

const serviceRentalApi = new ApiService("/rental");

export const UpdateServiceRental = async (serviceId, rentalData) => {
  const response = await serviceRentalApi
    .protected()
    .put(`/${serviceId}`, rentalData);
  return response;
};

export const UpdateServiceRentalStatus = async (serviceId, status) => {
  const response = await serviceRentalApi
    .protected()
    .put(`/${serviceId}`, { status });
  return response;
};
