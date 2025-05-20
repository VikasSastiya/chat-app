import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Slices/Counter";
import messageReducer from "./Slices/message";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
