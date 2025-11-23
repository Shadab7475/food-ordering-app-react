// import {configureStore} from "@reduxjs/toolkit"
// import { toogleSlice } from "./ToogleSlice"

// const store = configureStore({
//     reducer: {
//         toogleSlice : toogleSlice

//     }
// })

// export default store


import { configureStore } from "@reduxjs/toolkit";
import toogleReducer from "./ToogleSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./FilterSlice"
import authSlice from "./authSlice"

const store = configureStore({
  reducer: {
    toogleSlice22: toogleReducer,
    cartSlice : cartSlice,
    filterSlice : filterSlice,
    authSlice: authSlice

  }
});

export default store;