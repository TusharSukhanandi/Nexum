import React from 'react'
import { useUserContext } from "../context/userContext";


function Profile() {
    const { user } = useUserContext();
  
  return (
    <>
         <div className="min-w-full h-[15%] flex justify-center flex-col items-center text-4xl font-lobster">
        Profile
        <div className="w-20 h-[2px] bg-black"></div>
      </div>

      <div className="min-w-full md:h-[25%] h-[15%] flex justify-center items-center ">
        <div className="w-24 h-24 rounded-full p-2 border-x-4 border-y-4 border-gray-500">
          <img src={user.profilePicture} className="w-full " />
        </div>
      </div>

      <div className="min-w-full md:h-[60%] h-[70%] flex flex-col md:gap-9   gap-10 justify-center items-center ">
        <div className="w-[90%] md:h-[15%]  h-[12%] relative flex bg-[#A78D78] rounded-xl items-center text-lg font-poppins pb-1 pl-4 ">
          <h4 className="absolute md:-top-6 -top-8 md:text-sm text-lg font-poppins">
            username
          </h4>
          {user.userName}
        </div>
        <div className="w-[90%] md:h-[15%] h-[12%] relative flex bg-[#A78D78] rounded-xl items-center text-lg font-poppins pb-1 pl-4">
          <h4 className="absolute md:-top-6 -top-8 md:text-sm text-lg font-poppins">
            Email
          </h4>
          {user.email}
        </div>
        <div className="w-[90%] md:h-[30%] h-[35%] relative flex bg-[#A78D78] rounded-xl items-center text-lg font-poppins pb-1 pl-4">
          <h4 className="absolute md:-top-6 -top-8 md:text-sm text-lg font-poppins">
            About
          </h4>
          {user?.about}
        </div>
      </div>
    </>
  )
}

export default Profile