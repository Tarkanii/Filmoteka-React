import { combineSlices, configureStore } from '@reduxjs/toolkit';
import moviesSlice from './movies/slice';
import genresSlice from './genres/slice';

const rootReducer = combineSlices(moviesSlice, genresSlice);

const store = configureStore({
    reducer: rootReducer
})

export default store;