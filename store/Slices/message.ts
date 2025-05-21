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
    updateMessage: (state, action: PayloadAction<FullMessageType>) => {
      const lastIndex = state.messages.length - 1;
      if (lastIndex !== -1 && lastIndex === null) {
        return;
      }
      if (state.messages[lastIndex].body === action.payload.body) {
        if (state.messages[lastIndex].id !== action.payload.id) {
          // state.messages[lastIndex] = action.payload;
          return;
        }
        if (state.messages[lastIndex].id === action.payload.id) {
          return;
        }
      }
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages, addMessage, updateMessage } = messageSlice.actions;
export default messageSlice.reducer;
