import { useContext, useState } from "react";
import { ToastContext } from "../context/toastContext";
import axios from "axios";

const useVerifyEmail = () => {
  const showToast = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const verifyEmail = async (email) => {
    if (!email) {
      showToast("plase enter email", "error");
      return false
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/verifyEmail",
        { email }
      );
      showToast(response.data.message, "info");
      if (response.data.isOtpSent) {
        return true;
      }
    } catch (error) {
      showToast(error.response.data.message, "error");
      return false;
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return { verifyEmail };
};

export default useVerifyEmail;
