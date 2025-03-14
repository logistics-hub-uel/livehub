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
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
  return `${baseUrl}/images/${filename}`;
};
