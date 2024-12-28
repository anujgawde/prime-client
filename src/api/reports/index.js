import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
});

export const getAllReports = async (userId) => {
  try {
    const response = await api.get(`/reports/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getReports = async (getReportsData) => {
  try {
    const response = await api.post(`/reports/`, getReportsData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteReport = async (reportId) => {
  const response = await api.post(`/reports/delete`, { data: reportId });
  return response;
};

export const getRecentReports = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/reports/recent`, data);
  return response.data;
};

export const getAggregateReports = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/reports/aggregate`, data);
  return response;
};
