import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../utilsh/cartSlice'
import { HandleQuatitis } from './Context'

const RefPopMassege = () => {
  const { showPopup, setshowPopup, ClearCart } = useContext(HandleQuatitis)
  const dispatch = useDispatch()

  return (
    <div
      className={`fixed inset-0 flex justify-center  items-center  transition-transform duration-300 ease-out ${showPopup ? "translate-y-0" : "translate-y-full"}`}
      style={{ pointerEvents: showPopup ? "auto" : "none" }}
    >
      <div className="h-[230px] w-[500px] flex flex-col p-8 gap-2 bg-white shadow-[0_0_30px_rgba(0,0,0,0.4)]">
        
        <div>
          <h1 className="text-2xl font-black">Items already in cart</h1>
        </div>

        <div className="text-[18px] text-[#02060ccc]">
          <p>
            Your cart contains items from other restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
        </div>

        <div className="flex items-center justify-between gap-5">
          <button
            onClick={() => setshowPopup(false)}
            className="text-[#1ba672] font-bold text-[22px] w-[250px] h-[50px] border-2 border-[#1ba672] cursor-pointer "
          >
            NO
          </button>

          <button
            onClick={() => {
              dispatch(clearCart())
              setshowPopup(false)
            }}
            className="bg-[#1ba672] text-white font-bold cursor-pointer w-[250px] h-[50px]"
          >
            YES, START AFRESH
          </button>
        </div>

      </div>
    </div>
  )
}

export default RefPopMassege
