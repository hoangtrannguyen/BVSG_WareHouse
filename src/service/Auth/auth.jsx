import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();

  const loginMutation = useMutation(
    async ({ userName, password }) => {
      const response = await axios.post(
        "/api/accounts/signIn",
        {
          userName,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      const { token, refreshToken, fullName } = response.data.responseData;
      Cookies.set("token", token);
      Cookies.set("refresh_token", refreshToken);
      Cookies.set("user", fullName);
      return response.data.responseData;
    },
    {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error(
          "Login failed:",
          error.response ? error.response.data : error.message
        );
      },
    }
  );

  return { loginMutation };
}
