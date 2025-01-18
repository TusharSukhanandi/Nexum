import { useState } from "react";
import { useToastContext } from "../context/toastContext";
import axios from "axios";

const useVerifyOtp = () => {
  const showToast = useToastContext();
  const [loadingFromOtp, setLoadingFromOtp] = useState(false);

  const verifyOtp = async ({ email, otp }) => {
    if (!otp) {
      showToast("plase enter OTP", "error");
      return false;
    }

    try {
      setLoadingFromOtp(true)
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/verifyOtp",
        { email, otp }
      );

      showToast(response.data.message, "info");
      if (response?.data?.isOtpCorrect) {
        return true;
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
      return false;
    } finally {
      setTimeout(() => setLoadingFromOtp(false), 500);
    }
  };

  return { verifyOtp, loadingFromOtp };
};

export default useVerifyOtp;
