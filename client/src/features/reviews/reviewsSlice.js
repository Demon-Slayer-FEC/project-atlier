import { createSlice } from "@reduxjs/toolkit";
import { api } from '../api/apiSlice';

const initialState = {
  reviews: {},
  meta: {},
  ratingBarSelect: [],
};
// eslint-disable-next-line default-param-last
function setRating(state = initialState, action) {
  return { ...state, ratingBarSelect: action.payload };
}

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    reset: (state) => initialState,
    newSetRating: (state, action) => {
      if (!state.ratingBarSelect.includes(action.payload)) {
        state.ratingBarSelect.push(action.payload);
      } else {
        state.ratingBarSelect = state.ratingBarSelect.filter((rating) => rating !== action.payload);
      }
    },
    newResetRating: (state, action) => {
      state.ratingBarSelect = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getProductReviews.matchFulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addMatcher(api.endpoints.getMetaReviews.matchFulfilled, (state, action) => {
        state.meta = action.payload;
      });
  },
});

export const { reset, newSetRating, newResetRating} = reviewsSlice.actions;

export default reviewsSlice.reducer;
