import React from 'react'
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';

const RestaurantCard = (info) => {
  
  
  let parts = info.link.split("/");
  let result = parts.slice(4,6).join("/")


  
  return (
    <Link to={`/restaurantMenu/${result}`}>
          <div className='min-w-[295px] h-[185px] relative '>
                <img className='rounded-xl w-full h-full object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`} alt="" />
                <div className='absolute bottom-0  w-full h-1/2 rounded-b-xl bg-gradient-to-t from-black/100 to-transparent '></div>
                <p className='absolute bottom-1 text-white ml-3 text-[20px] font-black custom-text '>{info?.aggregatedDiscountInfoV3 &&`${info?.aggregatedDiscountInfoV3?.header || ""} ${info?.aggregatedDiscountInfoV3?.subHeader || ""}`}</p>
          </div>
              <h2  className='font-semibold text-[20px] line-clamp-1 custom-text'>{info?.name}</h2>
              <p className='flex items-center font-semibold'><FaStar className='bg-green-700 p-1 text-[20px] rounded-full text-white mr-1.5'/>{info?.avgRating}<span className="my-2 ml-1.5 text-lg leading-none">•</span> <span>{info?.sla?.slaString}</span></p>
              <p className='line-clamp-1 text-black/60 font-semibold'>{info?.cuisines.join(", ")}</p>
              <p className='line-clamp-1 text-black/60 font-semibold'>{info?.areaName}</p>
    </Link>
    
  )
}

export default RestaurantCard