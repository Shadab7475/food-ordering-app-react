
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import RestaurantCard from './RestaurantCard';
const TopRasturent = ({data,title}) => {
  const [Value, setValue] = useState(0)


  const HandlePrev = ()=>{
    Value <= 0 ? "" : setValue((prev)=>prev-20)
   }

   
   const HandleNext = ()=>{
    Value >= 80 ? "" : setValue((prev)=>prev+20)
  }
  return (
    <div className='mt-14 w-full'>
        <div className='flex justify-between mt-5'>
            <h1 className='font-bold text-4xl custom-text ml-4'>{title}</h1>
            <div className='flex gap-10'>
              <div onClick={HandlePrev} className={`p-3 cursor-pointer rounded-full ${Value <= 0 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]"}`}><FaArrowLeft /></div>
              <div onClick={HandleNext} className={` p-3 cursor-pointer rounded-full ${Value >=80 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]" }`}><FaArrowRight /></div>
            </div>
          </div>

          <div id='tasklist' className='flex overflow-x-auto mt-5'>
            <div
            style={{translate:`-${Value}%`}}
             className={`flex duration-400 gap-5`}>

              {data?.length > 0 && data.map(({info, cta: {link}})=>(
                <div key={info?.id} className='hover:scale-93 duration-300'>
              <RestaurantCard {...info} link={link} />
            </div>

              ))
              }
          </div>
          </div>
          <hr className='text-[rgba(2,6,12,0.10)] mt-10 border'/> 
    </div>
  )
}

export default TopRasturent
