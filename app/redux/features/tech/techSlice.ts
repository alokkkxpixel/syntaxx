import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Tech {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  docs?: {
    id: string;
    title: string;
    slug: string;
  }[];
}

interface TechState {
  techs: Tech[];
  loading: boolean;
  error: string | null;
}

const initialState: TechState = {
  techs: [],          // ✅ THIS is what you were missing
  loading: false,
  error: null,
};

const techSlice = createSlice({
  name: "tech",
  initialState,
  reducers: {
    setTechs: (state, action: PayloadAction<Tech[]>) => {
      state.techs = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setTechs, setLoading, setError } = techSlice.actions;
export default techSlice.reducer;
