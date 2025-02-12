import { useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { useToastContext } from "../context/toastContext";


const useChangeProfilePicture = (file) => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastContext();


  const {user, setUser} = useUserContext()

  if (!file) {
    return;
  }
  const sendProfilePicture = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/upload/profilePicture", formData, {withCredentials : true}
      );
      console.log(response);
      localStorage.setItem("Nexum-User", JSON.stringify({...user, profilePicture : response.data.newUrl}))
      setUser({...user, profilePicture : response.data.newUrl})
    } catch (error) {
      console.log(error);
      showToast(error.message, "error")
    }finally{
      setLoading(false)
    }
  };

  return { loading, sendProfilePicture };
};

export default useChangeProfilePicture;
