import React from 'react'

const Unserviceable = ({Apiresult:{data:{cards}}}) => {
   
    const firstCard = cards[0];
    const url = firstCard?.card?.card?.imageLink
    const path = url.match(/upload\/(.+)$/);
    const secoundCard = cards[1]
    let city = secoundCard.card?.card?.cities;
    
    

  return (
    <div className='w-full pt-[80px] '>
      <div className='mx-auto w-ful flex flex-col'>
          <div className=' w-full h-[500px] flex flex-col items-center justify-center'>
            <div className="h-[450px] w-[380px]  flex flex-col items-center justify-center">
                <img className="w-[240px] h-[240px]" src={`https://media-assets.swiggy.com/swiggy/image/upload/${path[1]}`} alt="" />
                <h1 className="text-[rgba(2,6,12,0.92)] tracking-tight text-[20px] font-[800]">{firstCard?.card?.card?.title}</h1>
                <p className="w-[90%] text-[18px]  mx-auto text-center font-[400] text-lg text-gray-600 leading-relaxed">We don’t have any services here till now. Try changing location</p>

            </div>
          </div>
          <div className=" p-4">
            <h1 className=" ml-6 text-[24px] font-bold tracking-tight rgba(2,6,12,0.92)">{secoundCard?.card?.card?.title}</h1>
            <div className="w-full  flex flex-wrap">
                {
                    city.map(({text},i)=>(
                        <div key={i} className="cursor-pointer rounded-2xl p-1 border-2 border-[rgba(2,6,12,0.1)] w-[280px] h-[60px] items-center flex justify-center mt-[16px] mx-auto  ">
                            <h3 className="gap text-[gba(2,6,12,0.75)]">{text}</h3>

                        </div>
                        
                    ))
                }

            </div>
          </div>
          
          
          
      </div>
    
    </div>
  )
}

export default Unserviceable