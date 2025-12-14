import { createSlice } from "@reduxjs/toolkit";

const toogleSlice = createSlice({
    name : "toogleSlice",
    initialState : {
        searchBarToogle : false,
        loginToogle : false,
        similarResDish : {
            isSimilarResDish : false,
            city : "",
            resLocation : "",
            resId : "",
            itemId : ""

        }
        
    },
    reducers : {
        toogleSearchBar : (state)=> {
            state.searchBarToogle = !state.searchBarToogle
        },
        toogleLoginBar : (state)=>{
            state.loginToogle = !state.loginToogle
            
        },
        setSimilarResDish : (state,action)=>{
            state.similarResDish = action.payload   
        },
        reSetSimilarDish : (state)=>{
            state.similarResDish = {
                isSimilarResDish : false,
                city : "",
                resLocation : "",
                resId : "",
                itemId : ""
            }


        }

    }
})
export const { toogleSearchBar,toogleLoginBar,setSimilarResDish,reSetSimilarDish } =  toogleSlice.actions
export default toogleSlice.reducer