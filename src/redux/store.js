import { combineSlices, configureStore } from '@reduxjs/toolkit';
import moviesSlice from './movies/slice';
import genresSlice from './genres/slice';
import librarySlice from './library/slice';
import modalSlice from './modal/slice';

const rootReducer = combineSlices(moviesSlice, genresSlice, librarySlice, modalSlice);

const store = configureStore({
    reducer: rootReducer
})

export default store;