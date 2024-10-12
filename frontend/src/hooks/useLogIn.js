import React, { useContext, useEffect, useState } from "react";
import { useToastContext } from "../context/toastContext";
import axios from "axios";
import { useUserContext } from "../context/userContext";

const useLogIn = (inputs) => {
  const showToast = useToastContext();
  const {setUser} = useUserContext()

  const [loading, setLoading] = useState(false);

  const logIn = async ({ userName, password }) => {
    const success = handleInputErrors({ userName, password });

    if (!success) {
      return;
    }

    try {
      setLoading(true)
      const response = await axios.post(import.meta.env.VITE_API_URL + "/auth/logIn", {
        userName,
        password,
      }, {withCredentials: true} );

      if(response.data.userId == ""){
      showToast("somthing went wrong", "info")
        return
      }

      localStorage.setItem("Nexum-User", JSON.stringify(response.data))
      setUser(response.data)
      showToast(response.data.message, "info")
      
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      showToast(errorMessage, "error");
      return;
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  function handleInputErrors({ userName, password }) {
    if (!userName || !password) {
      showToast("Please, fill all the fields", "error");
      return false;
    }

    if (password.length < 8) {
      showToast("password must be 8 character long", "error");
      return false;
    }

    return true;
  }

  return { logIn, loading };
};
export default useLogIn;
