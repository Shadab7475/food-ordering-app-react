import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Toppickstitle = ({upperData}) => {

  
  const [TopPickes, setTopPickes] = useState(0)


  const TopPicksNext = ()=>{
      TopPickes >= 50 ? "" : setTopPickes((prev)=>prev+20)

    }
    const TopPicksPrev = ()=>{
      TopPickes <= 0 ? "" : setTopPickes((prev)=>prev-20)

    }
  return (
    <>
    {
            upperData ? (
               <div className='mt-14 w-full'>
                <div className='flex justify-between mt-5'>
                  <h1 className='font-bold text-4xl custom-text '>{upperData[0]?.card?.card?.title || "Top Picks"}</h1>
                  <div className='flex gap-10'>
                    <div onClick={TopPicksPrev} className={`p-3 cursor-pointer rounded-full ${TopPickes <= 0 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]"}`}><FaArrowLeft /></div>
                    <div onClick={TopPicksNext} className={` p-3 cursor-pointer rounded-full ${TopPickes >=50 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]" }`}><FaArrowRight /></div>
                    </div>
                    </div>
                    <div id='tasklist' className='flex overflow-x-auto mt-5'>
                      <div
                      style={{translate:`-${TopPickes}%`}}
                      className={`flex duration-400 gap-5`}>
                        {upperData.map(({card: {card : {carousel}}})=>(
                          carousel.map(({creativeId, dish: {info: {price,defaultPrice,finalPrice}}},index)=>(
                          <div key={index} >
                            <div className='min-w-[295px] h-[350px] rounded-[30px] relative '>
                              <img className='h-[320px] w-[295px]'  src={`https://media-assets.swiggy.com/swiggy/image/upload/${creativeId}`} alt="" />
                              <div className='absolute bottom-16 left-4  text-white px-2 py-1 rounded-md text-sm flex items-center w-full gap-14 group:'>
                                <div className='flex flex-col h-14 w-20 justify-center '>
                                  {
                                                finalPrice ? (<p className="text-[18px] font-black flex flex-col items-start ">
                                                  {
                                                    defaultPrice ? (
                                                      <span className="text-white line-through decoration-white">
                                                       ₹ {defaultPrice/100}
                                                      </span>
                                                    ) : (
                                                      <span className="text-white line-through decoration-white">
                                                       ₹ {price/100}
                                                      </span>
                                                    )}
                                                    <span className="">₹ {finalPrice/100}</span>
                                                    
                                                </p>)
                                                : ( price ? (<p className="text-[18px] font-black flex items-center gap-2">₹ {price/100}</p>) : (<p className="text-[18px] font-black flex items-center gap-2">₹ {defaultPrice/100}</p>)
                                                   
                                                )
                                              }
                                  </div>
                                <button className='bg-white text-green-700 h-[40px] w-[120px] rounded-[8px] text-2xl px-3 hover:bg-[#c0c0c0] '>ADD</button>
                              </div>
                              </div>
                              </div>
                              ))
                            ))}
                            </div>
                            </div>
                            
                            <div className="h-4 w-full bg-[rgba(2,6,12,0.1)] rounded-[4px]"></div>
                            </div>
                            ) : ""
                            } 
                             
    </>
  )
}

export default Toppickstitle