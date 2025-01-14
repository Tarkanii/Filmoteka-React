import { combineSlices, configureStore } from '@reduxjs/toolkit';
import moviesSlice from './movies/slice';
import genresSlice from './genres/slice';
import librarySlice from './library/slice';

const rootReducer = combineSlices(moviesSlice, genresSlice, librarySlice);

const store = configureStore({
    reducer: rootReducer
})

export default store;