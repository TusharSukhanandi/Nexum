import React from 'react'
import { useUserContext } from '../context/userContext'

function ProfileIcon() {

    const {user} = useUserContext()


  return (
    <div className="w-10 h-10 rounded-full cursor-pointer border-x-2 border-y-2 border-white flex justify-center items-center ">
        <img className='w-[90%]' src={user?.profilePicture}></img>
    </div>
  )
}

export default ProfileIcon