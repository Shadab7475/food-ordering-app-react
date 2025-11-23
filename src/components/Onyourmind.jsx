import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


const Onyourmind = ({data,title}) => {
     const [Value, setValue] = useState(0)
     const HandlePrev = ()=>{
      Value <= 0 ? "" : setValue((prev)=>prev-27)
    }
    const HandleNext = ()=>{
      Value >= 108 ? "" : setValue((prev)=>prev+27)
    }
    return (data && <div className=' w-full'>
        <div className='flex justify-between mt-5'>
            <h1 className='font-bold text-4xl custom-text ml-4'>{title}</h1>
            <div className='flex gap-10'>
              <div onClick={HandlePrev} className={`p-3 cursor-pointer rounded-full ${Value <= 0 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]"}`}><FaArrowLeft /></div>
              <div onClick={HandleNext} className={` p-3 cursor-pointer rounded-full ${Value >=108 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]" }`}><FaArrowRight /></div>
            </div>
          </div>

          <div id='tasklist' className='flex overflow-x-auto mt-5'>
            <div
            style={{translate:`-${Value}%`}}
             className={`flex duration-400`}>
          {
            
          data.map((item,index)=>(
            <img key={index} className='w-[144px] h-[180px]' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`} alt="" />

          ))}
          </div>
          </div>
          <hr className='text-[rgba(2,6,12,0.10)] mt-10 border'/> 
    </div>
  )
}

export default Onyourmind
