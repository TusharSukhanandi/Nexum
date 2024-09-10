import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "../context/toastContext";
import axios from "axios"

const useLogIn = (inputs) => {

  const showToast = useContext(ToastContext)

  const [loading, setLoading] = useState(false);
 

  const logIn = async ({ userName, password }) => {
    const success = handleInputErrors({ userName, password });

    if(!success){
      return
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/logIn", {userName, password})
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      showToast(errorMessage , "error")
      return
    }
    finally{
      setTimeout(() => setLoading(false), 500); 
    }
  };

  function handleInputErrors({ userName, password }) {
   
    if (!userName || !password) {
      showToast("Please, fill all the fields", "error")
      return false
    }
  
    if(password.length < 8 ) {
      showToast("password must be 8 character long", "error")
      return false
    }

    return true
  }

  return { logIn };
};
export default useLogIn;
