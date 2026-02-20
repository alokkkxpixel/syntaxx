import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

export interface SearchResult {
  techs: any[]
  docs: any[]
  totalTechs: number
  totalDocs: number
}

interface SearchState {
  query: string
  results: SearchResult | null
  loading: boolean
}

const initialState: SearchState = {
  query: "",
  results: null,
  loading: false,
}

/**
 * Async search action
 */
export const fetchSearchResults = createAsyncThunk<
  SearchResult,
  string
>("search/fetchResults", async (query, { signal }) => {
  const res = await fetch(
    `/api/docs/search?q=${encodeURIComponent(query)}`,
    { signal }
  )

  if (!res.ok) {
    throw new Error("Search failed")
  }

  return res.json()
})

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
    clearSearch(state) {
      state.query = ""
      state.results = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { setQuery, clearSearch } = searchSlice.actions
export default searchSlice.reducer