import React, { useContext } from 'react'
import { HandleQuatitis, ToastContext } from './Context'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../utilsh/cartSlice'
import toast from "react-hot-toast";

const AddToCartBtn = ({resInfo,info }) => {
    
    
    const {setvisible} = useContext(ToastContext)
  const {setshowPopup} = useContext(HandleQuatitis)
  const dispath = useDispatch()
  const getReasInfoFromLocal = useSelector((state)=>state.cartSlice.resInfo)
  const CardData = useSelector((state)=>state.cartSlice.cartItems)
  
     const handleToCart = ()=>{
        
        
        
    const isData = CardData.find((data)=>data.id === info.id);
    if (!isData) {
       if (getReasInfoFromLocal.name === resInfo.name || getReasInfoFromLocal.length === 0) {
        dispath(addToCart({resInfo,info}))
        setvisible(true)
        toast.success("food added to cart") 
      
       }
       else{
         setshowPopup(true); 
       }
    }
    else{
      toast.error("food already added")
    }  

    
    
  }
  return (
    <>
     <button  onClick={handleToCart}  className={`bg-white text-green-600 px-9 py-1 rounded-[8px] text-[20px] hover:bg-[#c0c0c0] duration-200   font-black border border-[#c0c0c0] cursor-pointer`}>ADD
    </button>

    </>
  )
}

export default AddToCartBtn