import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalOpen: false,
    movieDetails: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers : {
        closeModal() {
            return initialState;
        },
        openModal(_, { payload }) {
            return { modalOpen: true, movieDetails: payload };
        }
    }
})

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice;