import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchService } from "../../services";

export const getGenres = createAsyncThunk(
    'genres/getGenres',
    async (_, { rejectWithValue }) => {
        try {
            const { genres } = await fetchService.getGenres();
            return genres;
        } catch (error) {
            return rejectWithValue(error.message);
        }
        
    }
)