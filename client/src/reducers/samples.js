import { EDIT_STREAM } from "../actions/types";

// Sample Code

// Array-based approach
const streamsReducer1 = (state = [], action) => {
  switch (action.type) {
    case EDIT_STREAM:
      return state.map(stream => {
        if (stream.id === action.payload.id) {
          return action.payload;
        } else {
          return stream;
        }
      });

    default:
      return state;
  }
};

// Object-based approach
const streamsReducer2 = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STREAM:
      //   const newState = { ...state };
      //   newState[action.payload.id] = action.payload;
      //   return newState;

      //      equals to below

      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
