import axios from "axios";
import Cookies from "js-cookie";

export const fetchData = async (
  searchQuery = {},
  pageNumber = 1,
  pageSize = 10
) => {
  const token = Cookies.get("token");

  const queryParams = Object.keys(searchQuery)
    .filter((key) => searchQuery[key])
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(searchQuery[key])}`
    )
    .join("&");

  const response = await axios.get(
    `/api/warehouse?${queryParams}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
