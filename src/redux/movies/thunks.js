import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchService } from "../../services";

export const getTrendingMovies = createAsyncThunk(
    'movies/getTrendingMovies',
    async ({ page }, { rejectWithValue }) => {
        try {
            const movies = await fetchService.getTrending({ page });
            return movies;
        } catch (error) {
            return rejectWithValue(error.message);
        }
        
    }
)