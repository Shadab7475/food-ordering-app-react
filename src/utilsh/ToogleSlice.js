import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        searchBarToogle : false,
        loginToogle : false,
    },
    reducers : {
        toogleSearchBar : (state)=> {
            state.searchBarToogle = !state.searchBarToogle
        },
        toogleLoginBar : (state)=>{
            state.loginToogle = !state.loginToogle
            
        }

    }
})
export const { toogleSearchBar,toogleLoginBar } =  toogleSlice.actions
export default toogleSlice.reducer