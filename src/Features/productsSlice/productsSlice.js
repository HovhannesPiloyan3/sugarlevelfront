import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'auth',
    initialState: {
        products: [],
        error: null,
    },
    reducers: {
       getProducts: (state, { payload }) => {
           state.products = payload
       },
       searchProducts: (state, { payload }) => {

       },
        filterProducts: (state, { payload }) => {

        },
        productsError: (state, { payload }) => {
            state.error = payload
        }
    },
});

export const { getProducts, searchProducts,filterProducts,productsError   } = productSlice.actions;
export default productSlice.reducer;
