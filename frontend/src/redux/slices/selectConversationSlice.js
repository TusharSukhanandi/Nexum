import { createSlice } from     "@reduxjs/toolkit";

const initialState =  {
    selectedConversation: {
        _id: "",  
        userName: "",
        profilePicture : ""
      },
    }

export const selectConversationSlice =  createSlice({
    name: "selectConversation",
    initialState,
    reducers : {
        setSelectedConversation: (state, action) => {
            state.selectedConversation = action.payload
           
        } ,
        clearSelectedConversation: (state) => {
            return initialState
        }
    }
})

export const {setSelectedConversation, clearSelectedConversation} = selectConversationSlice.actions;
export default selectConversationSlice.reducer