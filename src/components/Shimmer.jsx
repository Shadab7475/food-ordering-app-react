import React from 'react'

const Shimmer = () => {
  return (
    <div className='w-full'>
        <div className='w-full flex justify-center flex-col items-center bg-[#171a29] h-110'>
          <div className='relative '>
            <img className='h-10 w-10' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"	 alt="" />
          </div>
          <span className="loader absolute  -top-4  -translate-y-1/2"></span>
          <p className='text-[rgba(255,255,255,.8)] text-2xl'>Looking for great food near you ...</p>
            

        </div>
        <div className=' w-full justify-center   '>
          <div className='w-[80%] gap-1 p-5 mx-auto flex-col grid grid-cols-4'>
            {
            Array(12).fill("").map((data,i)=>{
              return <div key={i} className='w-full gap-2 flex flex-col'>
              <div className='animate rounded-2xl w-[310px]  p-2 h-[200px]'>
              </div>
              <p className='animate rounded-[4px] h-4 w-[80%]'></p>
              <p className='animate w-[50%] h-4 rounded-[4px]'></p>
              </div>
            })
          }
          </div>
        </div>
        
    </div>
  )
}

export default Shimmer



export const ResMenuShimmer = () => {
  return (
    <div className='w-full'>
      <div className=' w-[55%] flex flex-col gap-3 p-4 mx-auto pt-10'>
        <p className=' animate h-4 w-40 rounded-[4px]'></p>
        <h2 className='animate h-10 rounded-[6px] w-60'></h2>
        <div className='animate w-full h-70 rounded-b-3xl'></div>
        <p className='animate h-6 w-40 rounded-[4px]'></p>
        <div className=' flex items-center justify-center gap-5 w-full h-20'>
          <div className='animate h-full w-100 rounded-3xl '></div>
          <div className='animate h-full w-100 rounded-3xl'></div>
        </div>
        <div className=' w-full flex h-10 items-center justify-center'>
          <p className='animate mx-auto w-40 h-7 rounded-[4px]'></p>
        </div>
        <div className='animate h-15 rounded-[20px]'>

        </div>
      </div>
      
      
    </div>
  )
}

export const SearchDish = () => {
  return (
    <div  className=' animate grid grid-cols-2 flex-col gap-2 overflow-y-auto  p-4 w-full ' >
     
 
     {
      Array(4).fill("").map((i)=>(
        <div key={i} className='animate h-[270px] w-[400px] rounded-2xl'></div>

      ))
     }
              
    </div>
  )
}



 