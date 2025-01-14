import { createSlice } from "@reduxjs/toolkit";
import getLibraryMovies from "./thunks";

const initialState = {
    movies: [],
    queue: [],
    watched: [],
    loading: false,
    error: false,
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        saveMovie(state, { payload }) {
            if (payload.type === 'watched') {
                return {...state, watched: [payload.id, ...state.watched]}
            } else if (payload.type === 'queue') {
                return {...state, queue: [payload.id, ...state.queue]}
            }
        },
        deleteMovie(state, { payload }) {
            if (payload.type === 'watched') {
                return {...state, watched: state.watched.filter(id => id !== payload.id)}
            } else if (payload.type === 'queue') {
                return {...state, queue: state.queue.filter(id => id !== payload.id)}
            }
        },
        setMovies(state, { payload }) {
            return {...state, watched: payload.watched, queue: payload.queue};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLibraryMovies.pending, (state) => ({...state, loading: true, error: false}));
        builder.addCase(getLibraryMovies.rejected, (state) => ({...state, loading: false, error: true}));
        builder.addCase(getLibraryMovies.fulfilled, (state, { payload }) => ({...state, loading: false, error: false, movies: payload }))
    }
})

export const { saveMovie, deleteMovie, setMovies } = librarySlice.actions;
export default librarySlice;