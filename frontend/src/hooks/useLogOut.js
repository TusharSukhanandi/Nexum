import axios from "axios";
import { useState } from "react";
import { useToastContext } from "../context/toastContext";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { removeConversations, setConversations } from "../redux/slices/conversationsSlice";
import { clearSelectedConversation } from "../redux/slices/selectConversationSlice";
import { useDispatch } from "react-redux";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastContext();
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logOut = async () => {
    setLoading(true)
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

      dispatch(removeConversations())
      dispatch(clearSelectedConversation())

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
