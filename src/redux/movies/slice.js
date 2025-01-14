import { createSlice } from "@reduxjs/toolkit";
import { getMoviesBySearch, getTrendingMovies } from "./thunks";

const initialState = {
    movies: [],
    loading: false,
    error: false,
    currentPage: null,
    totalPages: null,
    searchError: false
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {...initialState},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTrendingMovies.pending, () => ({...initialState, loading: true }));
        builder.addCase(getTrendingMovies.rejected, () => ({...initialState, error: true}));
        builder.addCase(getTrendingMovies.fulfilled, (_, { payload }) => {
            const { page, total_pages, results } = payload;

            return {
                ...initialState,
                movies: results,
                currentPage: page,
                totalPages: total_pages
            }
        });
        builder.addCase(getMoviesBySearch.pending, () => ({...initialState, loading: true}));
        builder.addCase(getMoviesBySearch.rejected, () => ({...initialState, error: true}));
        builder.addCase(getMoviesBySearch.fulfilled, (_, { payload }) => {
            const { page, total_pages, results } = payload;

            return {
                ...initialState,
                movies: results,
                currentPage: page,
                totalPages: total_pages,
                searchError: !results.length
            }
        });
    }
})

export default moviesSlice;