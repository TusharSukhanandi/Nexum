import { configureStore } from "@reduxjs/toolkit";
import selectConversationSlice from "./slices/selectConversationSlice";
import messagesSlice from "./slices/messagesSlice";
import conversationsSlice from "./slices/conversationsSlice";
import profileScreenSlice from "./slices/profileScreenSlice";

export const store = configureStore({
  reducer: {
    selectConversation: selectConversationSlice,
    profileScreen: profileScreenSlice,
    messages: messagesSlice,
    conversations: conversationsSlice,
  },
});
