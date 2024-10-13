import {configureStore} from "@reduxjs/toolkit"
import selectConversationSlice  from "./slices/selectConversationSlice"
import messagesSlice from "./slices/messagesSlice"
import  conversationsSlice  from "./slices/conversationsSlice"

export const store = configureStore({
    reducer: {
        selectConversation : selectConversationSlice,
        messages : messagesSlice,
        conversations : conversationsSlice,
    },
})
