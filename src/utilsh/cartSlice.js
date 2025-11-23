import { createSlice } from "@reduxjs/toolkit";

const cartSlice =   createSlice({
    name :  "cartSlice",
    initialState : {
        cartItems: JSON.parse(localStorage.getItem("CardData")) || [],
        resInfo : JSON.parse(localStorage.getItem("resInfo")) || [],
        
    },
    reducers : {
        addToCart : (state,action)=>{
            const {info,resInfo} = action.payload
            state.cartItems = [...state.cartItems ,info]
                state.resInfo = resInfo;

            localStorage.setItem("CardData",JSON.stringify(state.cartItems))
            localStorage.setItem("resInfo",JSON.stringify(resInfo))
        },
        deleteItem : (state,action)=>{
            state.cartItems = action.payload
            localStorage.setItem("CardData",JSON.stringify(state.cartItems))
        },
        clearCart : (state)=>{
            state.cartItems = [];
            state.resInfo = [];
            localStorage.setItem("CardData", JSON.stringify([]))  
            localStorage.setItem("resInfo", JSON.stringify([]))
        }
    }
})



export const {addToCart, deleteItem, clearCart} = cartSlice.actions
 
export default cartSlice.reducer









