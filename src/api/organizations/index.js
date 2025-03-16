import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/`,
});

export const getOrganization = async (organizationId) => {
  try {
    const response = await api.get(`/organizations/${organizationId}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getEmployeesByOrganization = async (data) => {
  try {
    const response = await api.post(`/organizations/get-org-employees`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const inviteEmployee = async (employeeData) => {
  try {
    const response = await api.post(
      `/organizations/invite-employee`,
      employeeData
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const respondToInvite = async (inviteData) => {
  try {
    const response = await api.post(
      `/organizations/invite-response`,
      inviteData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserInvitations = async (userId) => {
  try {
    const response = await api.post(`/organizations/get-user-invitations`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrganization = async (organizationData) => {
  try {
    const response = await api.post(
      `/organizations/create-organization`,
      organizationData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const leaveOrganization = async (leaveOrganizationData) => {
  try {
    const response = await api.post(
      `/organizations/leave-organization`,
      leaveOrganizationData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrganization = async (organizationId) => {
  try {
    const response = await api.post(`/organizations/delete-organization`, {
      organizationId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeEmployee = async (removeEmployeeData) => {
  try {
    const response = await api.post(
      `/organizations/remove-employee`,
      removeEmployeeData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const promoteEmployee = async (promoteEmployeeData) => {
  try {
    const response = await api.post(
      `/organizations/promote-employee`,
      promoteEmployeeData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const demoteEmployee = async (demoteEmployeeData) => {
  try {
    const response = await api.post(
      `/organizations/demote-employee`,
      demoteEmployeeData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editOrganization = async (editOrganizationData) => {
  try {
    const response = await api.post(
      `/organizations/edit-organization`,
      editOrganizationData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
