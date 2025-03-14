import ApiService from "./ApiService";

const imageApi = new ApiService("/images");

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await imageApi.public().post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const getImageUrl = (filename) => {
  const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
  return `${baseUrl}/images/${filename}`;
};
