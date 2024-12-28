import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
});

export const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await api.post(`/users/create-user`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserDocsAggregate = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/users/document-aggregate-statistics`, data);
  return response;
};

export const updateUserProfile = async (userData) => {
  const response = await api.post("/users/update-profile", userData);
  return response;
};
