import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchService } from "../../services";

export const getTrendingMovies = createAsyncThunk(
    'movies/getTrendingMovies',
    async (_, { rejectWithValue }) => {
        try {
            const movies = await fetchService.getTrending();
            return movies;
        } catch (error) {
            return rejectWithValue(error.message);
        }
        
    }
)