import React from 'react'
import { useUserContext } from '../context/userContext'
import { useDispatch, useSelector } from 'react-redux'
import { toggleProfileScreen } from '../redux/slices/profileScreenSlice'

function ProfileIcon() {

    const {user} = useUserContext()

    const dispatch = useDispatch()

   
  return (
    <div onClick={() => dispatch(toggleProfileScreen())} className="w-10 h-10 rounded-full cursor-pointer border-x-2 border-y-2 border-white flex justify-center items-center ">
        <img className='w-[90%]' src={user?.profilePicture}></img>
    </div>
  )
}

export default ProfileIcon