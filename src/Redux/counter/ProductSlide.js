import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

export const ProductSlide = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    SearchValue: (state, payload) => {
      state.search = payload.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SearchValue } = ProductSlide.actions;

export default ProductSlide.reducer;
