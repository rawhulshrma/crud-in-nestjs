import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  message: null,
  error: null,
};

export const updateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('ADD_PRODUCT_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('ADD_PRODUCT_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('ADD_PRODUCT_FAILURE', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('DELETE_PRODUCT_REQUEST', (state) => {
      state.loading = true;
    })
    .addCase('DELETE_PRODUCT_SUCCESS', (state, action) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase('DELETE_PRODUCT_FAILURE', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase('CLEAR_ERRORS', (state) => {
      state.error = null;
    })
    .addCase('CLEAR_MESSAGE', (state) => {
      state.message = null;
    });
});
