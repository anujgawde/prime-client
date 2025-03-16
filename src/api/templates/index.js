import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
});

export const getTemplatesByUser = async (userId) => {
  try {
    const response = await api.get(`/templates/${userId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getTemplates = async (getTemplatesData) => {
  try {
    const response = await api.post(`/templates/`, getTemplatesData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getTemplatesByOrganization = async (organizationTemplatesData) => {
  try {
    const response = await api.get(
      `/templates/get-organization-templates`,
      organizationTemplatesData
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteTemplate = async (templateId) => {
  const response = await api.post(`/templates/delete`, { data: templateId });
  return response;
};

export const getMostUsedTemplates = async (userId) => {
  const data = {
    userId,
  };
  const response = await api.post(`/templates/most-used`, data);
  return response.data;
};
