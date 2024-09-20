import {configureStore} from "@reduxjs/toolkit"
import selectConversationSlice  from "./slices/selectConversationSlice"
import messagesSlice from "./slices/messagesSlice"

export const store = configureStore({
    reducer: {
        selectConversation : selectConversationSlice,
        messages : messagesSlice
    },
})
