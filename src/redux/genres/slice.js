import { createSlice } from "@reduxjs/toolkit";
import { getGenres } from "./thunks";

const initialState = {
    genres: [],
    loading: false,
    error: false
}

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGenres.pending, () => ({...initialState, loading: true}))
        builder.addCase(getGenres.rejected, () => ({...initialState, error: true}))
        builder.addCase(getGenres.fulfilled, (_, { payload }) => ({...initialState, genres: payload }))
    }
})

export default genresSlice;