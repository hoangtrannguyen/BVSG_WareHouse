import axiosInstance from "../Auth/axios";

export const fetchMasterData = async () => {
  const url = `/api/masterdata/feature`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const getFunction = async () => {
  const url = `/api/masterdata/function `;
  const response = await axiosInstance.get(url);
  return response.data;
};
