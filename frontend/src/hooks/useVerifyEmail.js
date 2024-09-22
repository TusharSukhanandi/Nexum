import { useState } from "react";
import { useToastContext } from "../context/toastContext";
import axios from "axios";

const useVerifyEmail = () => {
  const showToast = useToastContext();
  const [loadingFromEmail, setLoadingFromEmail] = useState(false);

  const verifyEmail = async (email) => {
   
    if (!email) {
      showToast("please enter email", "error");
      return false
    }

    try {
      setLoadingFromEmail(true)
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
      setTimeout(() => setLoadingFromEmail(false), 500);
    }
  };

  return { verifyEmail, loadingFromEmail};
};

export default useVerifyEmail;
