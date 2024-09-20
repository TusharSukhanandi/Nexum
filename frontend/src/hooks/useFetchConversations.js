import React, { useState } from "react";
import axios from "axios";

const useFetchConversations = () => {
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {

    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/conversations",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchConversations };
};

export default useFetchConversations;
