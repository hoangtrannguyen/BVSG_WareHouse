import axios from "axios";
import Cookies from "js-cookie";

export const refreshToken = async () => {
  const refreshToken = Cookies.get("refresh_token");

  const response = await axios.post(
    "/api/accounts/refresh",
    { refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { token } = response.data.responseData;
  Cookies.set("token", token);
  return token;
};
