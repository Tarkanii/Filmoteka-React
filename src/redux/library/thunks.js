import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchService } from "../../services";

const getLibraryMovies = createAsyncThunk(
    'library/getLibraryMovies',
    async ({ movieIds }, { rejectWithValue }) => {
        try {
            const movies = await Promise.all(movieIds.map(async (id) => await fetchService.getById(id)));
            return movies;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export default getLibraryMovies;