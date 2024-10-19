import React, { useState } from "react";
import { useToastContext } from "../context/toastContext";
import axios from "axios";
import { useUserContext } from "../context/userContext";


const useSignUp = () => {
  const [loadingFromSignUp, setLoadingFromSignUp] = useState(false);

  const showToast = useToastContext();
  const { setUser } = useUserContext();

  const signUp = async ({ userName, password, confirmPassword, email }) => {
    const success = handleInputErrors({
      userName,
      password,
      confirmPassword,
    });

    if (!success) {
      return;
    }

    try {
      setLoadingFromSignUp(true)
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/signUp",
        {
          userName,
          password,
          confirmPassword,
          email,
        }, {withCredentials: true}
      );

      if (response.data.userId === "") {
        return showToast("something went wrong", "error");
      }
      showToast(response.data.message, "info");
      delete response?.data?.message;
      localStorage.setItem("Nexum-User", JSON.stringify(response?.data));
      setUser(response?.data);
    } catch (error) {
      console.log("error message", error);
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      showToast(errorMessage, "error");
      return;
    }finally{
      setTimeout(() => setLoadingFromSignUp(false), 500);
    }
  };

  const handleInputErrors = ({ userName, password, confirmPassword }) => {
    if (!userName || !password || !confirmPassword) {
      showToast("Please, fill all the fields", "error");
      return false;
    }
    if (password.length < 8) {
      showToast("password must be 8 character long", "error");
      return false;
    }
    if (password !== confirmPassword) {
      showToast("passwords did not match", "error");
      return false;
    }
    return true;
  };
  return { signUp, loadingFromSignUp };
};

export default useSignUp;
