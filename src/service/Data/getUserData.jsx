import axiosInstance from "../Auth/axios";

export const fetchUserData = async (
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

  const url = `/api/users?${queryParams}&${paginationParams}`;
  const response = await axiosInstance.get(url);
  return response.data;
};

export const addUser = async (shelveData) => {
  const response = await axiosInstance.post(
    "/api/accounts/signUp",
    shelveData,
    {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteUser = async (item) => {
  const response = await axiosInstance.delete(`/api/users/${item}`, {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axiosInstance.put(`/api/users/${id}`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getUserByID = async (id) => {
  const response = await axiosInstance.get(`/api/users/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
