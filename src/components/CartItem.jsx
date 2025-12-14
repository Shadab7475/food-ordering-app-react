import React, { useContext } from 'react'
import { HandleQuatitis, ItemQuantities, ToastContext } from './Context'
import veg from "../assets/ChatGPT Image Sep 13, 2025, 10_28_59 AM.png"
import nonveg from "../assets/ChatGPT Image Sep 13, 2025, 10_20_34 AM.png"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../utilsh/cartSlice'
import toast from 'react-hot-toast'
import { toogleLoginBar } from '../utilsh/ToogleSlice'






const CartItem = () => {

  const {setvisible} = useContext(ToastContext)
  const {quantities} = useContext(ItemQuantities)

  const {HandleAdd,HandleRemoveCard} = useContext(HandleQuatitis)
  const CardData = useSelector((state)=>state.cartSlice.cartItems)
  const userData = useSelector((state)=>state.authSlice.userData)
  const getReasInfoFromLocal = useSelector((state)=>state.cartSlice.resInfo)
  const dispatch = useDispatch()

  const checkData = ()=>{
    if (userData) {
      toast.success("food orderd")
        
    }else{
      toast.error("please Login")
      dispatch(toogleLoginBar())
      
    }

  }

  if (CardData.length === 0) {
      localStorage.setItem("resInfo",JSON.stringify([])) 
      
    }
   
  let Totalprice = CardData.reduce((acc,data)=>{
    const price = data.finalPrice ? data.finalPrice/100 : data.price ? data.price/100 : data.defaultPrice/100
    const qty = quantities[data.id] || 1
    const total = price*qty
    return acc + total


  },0)


  if (CardData.length === 0) {
    setvisible(false)
    return (
      <div className='mt-20 w-full '>
        <div className='lg:w-[50%] w-[70%]  mx-auto flex justify-center p-10'>
          <div className='w-[90%] flex flex-col items-center gap-2' >
            <img className='h-[320px] w-[340px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
            <h1 className='text-[22px] font-bold'>Your cart is empty</h1>
            <p className='text-[rgba(2,6,12,.6)] font-[500]'>You can go to home page to view more restaurants</p>
            <Link to={`/`}>
            <button className='bg-[#ff5200] px-10 py-3 text-[15px] text-white font-[700]' onClick={()=>dispatch(clearCart())}>SEE RESTAURANTS NEAR YOU</button>
            </Link>
          </div>
        </div>
      </div>
    )
    
  }
  
  return (
    <div className='mt-20 w-full '>
      <div className=' lg:w-[50%] w-[80%] mx-auto'>
        <div className="h-[150px]   flex items-center justify-between px-6 py-4 ">
          <img
          className="h-28 w-28 rounded-xl object-cover shadow-lg"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${getReasInfoFromLocal?.cloudinaryImageId}`}
          alt=""/>
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm mt-1">Restaurant Name</p>
            <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
              {getReasInfoFromLocal?.name}
            </h1>
            
          </div>
      </div>

        {
          CardData.map((data,i)=>{
            const price = data.finalPrice ? data.finalPrice/100 :data.price ? data.price/100 : data.defaultPrice/100
            const qty = quantities[data.id] || 1;
            const total = price*qty;
            return(
              <>
              <hr className='border-2 border-[rgba(2,6,12,0.1)] w-full'></hr>
            <div className=' w-full flex h-[200px] p-3'>
             
              <div className=' w-[70%] flex flex-col justify-center '>
                {data?.itemAttribute?.vegClassifier === "VEG" ? <img src={veg} className="h-[25px] w-[26px]" alt="" />: <img src={nonveg} className="h-[25px] w-[28px]" alt="" />
                }
                <h1 className='font-bold text-2xl'>{data.name}</h1>
                <p className='text-[20px] font-bold'>₹ {total.toFixed(2)}</p>
                


              </div>
              
                <div className="relative flex flex-col items-center ml-15">
                              {data.imageId && (<img className={`h-[150px]   w-[160px] object-cover rounded-2xl`} 
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${data.imageId}`} alt="" />)
                              }
                              <div  className="absolute bottom-[21px] left-1/2 -translate-x-1/2">
                              
                                <div  className={`bg-white rounded-[8px] text-[14px] ${data.imageId ? "" : "ml-37"}  duration-200 font-black border border-[#c0c0c0] w-[120px] h-[30px] whitespace-normal break-words flex  items-center justify-center`}><p className=' cursor-pointer  text-[20px] flex gap-3'><span onClick={()=>HandleRemoveCard(i,data.id)} className='text-[#bdbcc2] text-2xl'>-</span><span className='text-[17px] text-[#15998e] font-bold mt-1'>{qty}</span><span className='text-[#15998e]' onClick={()=>HandleAdd(data.id)}>+</span></p></div>
                              
                              </div>
                          </div>
            </div>
              </>
            )})}
            
        <hr className='border-4 border-[rgba(2,6,12,0.1)] '></hr>
        
        <div className="flex justify-between items-center bg-gray-100 p-6 rounded-b-2xl shadow-inner">
          <button onClick={checkData}  className="bg-gradient-to-r from-yellow-400  to-[#32cd30] text-black font-semibold text-lg px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Pay ₹{Totalprice.toFixed(2)}
          </button>
          <button onClick={()=>dispatch(clearCart())}  className="bg-gradient-to-r from-red-400 to-[#94c973] text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Clear Cart
          </button>

        </div>
      </div> 
     
      

    </div>
  )
}

export default CartItem