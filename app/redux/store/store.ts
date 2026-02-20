import { configureStore } from "@reduxjs/toolkit";
import techReducer from "../features/tech/techSlice";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
    reducer: {
        tech: techReducer,
        search: searchReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;