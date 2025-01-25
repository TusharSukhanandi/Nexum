    import { createSlice } from "@reduxjs/toolkit";

    export const messagesSlice = createSlice({
        name : "messages",
        initialState : [],
        reducers: {
            setMessages : (state, action) => {
                return action.payload
            },
            addMessage: (state, action) => {
                state[state.length - 1] = action.payload
            }
        }
    })

    export const {setMessages, addMessage} = messagesSlice.actions;
    export default messagesSlice.reducer;