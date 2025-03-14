import ApiService from "./ApiService";

const serviceApi = new ApiService("/services");

export const GetServices = async (filters = {}) => {
  const response = await serviceApi.protected().get("/", { params: filters });
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

  const response = await serviceApi.protected().post("/", serviceData);
  return response;
};

export const GetServiceDetail = async (serviceId) => {
  const response = await serviceApi.protected().get(`/${serviceId}`);
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
