import { configureStore } from "@reduxjs/toolkit";
import techReducer from "../features/tech/techSlice";

export const store = configureStore({
    reducer: {
        tech: techReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;