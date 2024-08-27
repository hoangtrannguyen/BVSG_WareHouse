import axiosInstance from "../Auth/axios"; // Adjust the import path

export const fetchShelveItemData = async (
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

  const url = `/api/inventory?${queryParams}&${paginationParams}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const addShelveItem = async (shelveItemData) => {
  const response = await axiosInstance.post("/api/inventory", shelveItemData, {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
