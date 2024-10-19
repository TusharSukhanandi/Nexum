import { createSlice } from "@reduxjs/toolkit";

export const conversationsSlice = createSlice({
    name : "conversations",
    initialState : [],
    reducers: {
       setConversations : (state, action) => {
        return action.payload
       },
       addConversations : (state, action) => {
        state.push(action.payload)
       },
       removeConversations : (state) => {
        return []
       }
    }
})

export const {setConversations, removeConversations, addConversations} = conversationsSlice.actions;
export default conversationsSlice.reducer;