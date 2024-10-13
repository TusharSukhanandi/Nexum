import axios from "axios";
import { useState } from "react";
import { useToastContext } from "../context/toastContext";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastContext();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/logOut",
        {},
        {
          withCredentials: true,
        }
      );

      if (!response.data) {
        showToast("something went wrong", "error");
      }

      showToast("Logged out successfully", "info");

      localStorage.removeItem("Nexum-User");
      navigate("/");
      setUser(null);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      showToast(errorMessage, "error");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return { loading, logOut };
};

export default useLogOut;
