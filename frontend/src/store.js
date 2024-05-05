// import { configureStore } from "@reduxjs/toolkit";
// import { updateReducer } from "./reducers/user";

// const store = configureStore({
//   reducer: {
//     update: updateReducer,  
//   },
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import{ updateReducer} from "./reducers/user"; // Correct import path if necessary

const store = configureStore({
  reducer: {
    update: updateReducer,
  },
});

export default store;
