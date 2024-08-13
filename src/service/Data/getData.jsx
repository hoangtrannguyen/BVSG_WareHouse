import axios from "axios";

export const fetchData = async (
  searchQuery = "",
  acceptDate = "",
  pageNumber = 1,
  pageSize = 10
) => {
  const response = await axios.get(
    `/api/warehouse?AcceptNo=${encodeURIComponent(
      searchQuery
    )}&AcceptDate=${acceptDate}&PageNumber=${pageNumber}&PageSize=${pageSize}`
  );
  return response.data;
};
