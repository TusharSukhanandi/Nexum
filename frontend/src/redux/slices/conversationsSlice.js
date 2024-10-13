import { createSlice } from "@reduxjs/toolkit";

export const conversationsSlice = createSlice({
    name : "conversations",
    initialState : [],
    reducers: {
       setConversations : (state, action) => {
        return action.payload
       }
    }
})

export const {setConversations} = conversationsSlice.actions;
export default conversationsSlice.reducer;