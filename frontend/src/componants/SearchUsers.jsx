import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "./Conversation";
import { setSelectedConversation } from "../redux/slices/selectConversationSlice";
import { addConversations } from "../redux/slices/conversationsSlice";
import { MdClose } from "react-icons/md";
import LoadingConversation from "./LoadingConversation";

const SearchUsers = ({ handleCloseSearch }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const conversations = useSelector((state) => state.conversations);

  const dispatch = useDispatch();

  useEffect(() => {
    const result = users.filter((user) =>
      user?.userName?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/search/users`,
        { withCredentials: true }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      onClick={(e) => handleCloseSearch(e, false)}
      className="animate-fadeIn w-[100%] h-[100%] absolute flex justify-center items-center bg-gray-800/75 z-40"
    >
      <div className="relative w-[90%] md:w-[50%] h-[80%] rounded-xl overflow-auto no-scrollbar  bg-purple-500/45 shadow-lg backdrop-blur-md py-5">
        <div className="md:w-[80%] w-[100%] m-auto p-5 md:gap-9 gap-3 flex justify-around ">
          <input
            className="w-full p-3 text-white text-center border-b-2 border-white rounded-lg bg-transparent focus:outline-none placeholder:font-poppins"
            ref={inputRef}
            type="text"
            placeholder="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        <button
          onClick={(e) => handleCloseSearch(e, true)}
          className="absolute  z-[51] m-5 top-0 right-0 text-white text-3xl"
        >
          <MdClose />
        </button>

        {loading ? (
          <LoadingConversation />
        ) : (
          filteredUsers &&
          filteredUsers.map((user, index) => (
            <div
              className="mt-3 transition-all  "
              onClick={() => {
                dispatch(
                  setSelectedConversation({
                    _id: user._id,
                    userName: user.userName,
                    profilePicture: user.profilePicture,
                  })
                );
                const ids = conversations.map((conversation) => {
                  return conversation._id;
                });

                if (!ids.includes(user._id)) {
                  dispatch(
                    addConversations({
                      _id: user._id,
                      userName: user.userName,
                      profilePicture: user.profilePicture,
                    })
                  );
                }

                handleCloseSearch(null, true);
              }}
              key={user._id}
            >
              <Conversation conversation={user}></Conversation>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
