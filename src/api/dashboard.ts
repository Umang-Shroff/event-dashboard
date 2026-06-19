import api from "./client";

export const getOverview = async () => {
  const response = await api.get("/dashboard/overview");
  return response.data;
};

export const getEventTypes = async () => {
  const response = await api.get("/dashboard/event-types");
  return response.data;
};

export const getTenantAnalytics = async () => {
  const response = await api.get("/dashboard/tenants");
  return response.data;
};

export const getRevenueAnalytics = async () => {
  const response = await api.get("/dashboard/revenue");
  return response.data;
};

export const getCampaignAnalytics = async () => {
  const response = await api.get("/dashboard/campaigns");
  return response.data;
};

export const getHourlyAnalytics = async () => {
  const response = await api.get("/dashboard/hourly");
  return response.data;
};

export const getPartitionAnalytics = async () => {
  const response = await api.get("/dashboard/partitions");
  return response.data;
};

export const getTopUsers = async () => {
  const response = await api.get("/dashboard/users");
  return response.data;
};

export const getDeviceAnalytics = async () => {
  const response = await api.get("/dashboard/devices");
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get("/dashboard/health");
  return response.data;
};
