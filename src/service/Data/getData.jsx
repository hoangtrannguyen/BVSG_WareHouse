import axios from "axios";

export const fetchData = async (
  searchQuery = "",
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await axios.get(
    `/api/warehouse?AcceptNo=${encodeURIComponent(
      searchQuery
    )}&PageNumber=${pageNumber}&PageSize=${pageSize}`
  );
  return response.data;
};
