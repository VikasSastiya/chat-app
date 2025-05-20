import { FullMessageType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageState {
  messages: FullMessageType[];
}

const initialState: MessageState = {
  messages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<FullMessageType[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<FullMessageType>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
