import axiosInstance from "../Auth/axios"; // Adjust the import path

export const fetchShelveData = async (
  searchQuery,
  pageNumber = 1,
  pageSize = 10
) => {
  const queryParams = Object.keys(searchQuery)
    .filter((key) => searchQuery[key])
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(searchQuery[key])}`
    )
    .join("&");

  const paginationParams = `PageNumber=${pageNumber}&PageSize=${pageSize}`;

  const url = `/api/shelves?${queryParams}&${paginationParams}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const addShelve = async (shelveData) => {
  const response = await axiosInstance.post("/api/shelves", shelveData, {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteShelve = async (item) => {
  const response = await axiosInstance.delete(`/api/shelves/${item}`, {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateShelve = async (id, shelveData) => {
  const response = await axiosInstance.put(`/api/shelves/${id}`, shelveData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getShelveByID = async (id) => {
  const response = await axiosInstance.get(`/api/shelves/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
