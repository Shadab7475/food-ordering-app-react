import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utilsh/FilterSlice';

const OnlineFoodDelivary = ({data,title}) => {

  const filterOptions = [
    {
      filteName : "Ratings 4.0+"
    },
    {
      filteName : "Rs. 300-Rs. 600"
    },
    {
      filteName : "Offers"
    },
    {
      filteName : "Less than Rs. 300"
    },
  ]

  const [Activ, setActiv] = useState(null)
  const dispatch = useDispatch()

  const filterHandle = (filteName)=>{
    setActiv(Activ === filteName ? null : filteName )
  }
  dispatch(setFilterValue(Activ))
  

  return (
    <div className='mt-12  '>
        <h2 className='font-bold text-4xl custom-text ml-4'>{title}</h2>
        <div className='grid grid-cols-2 gap-3 mt-4 pl-4 md:flex md:flex-wrap'> 
          {filterOptions.map((data) => (
            <button
            onClick={()=>filterHandle(data.filteName)}
            key={data.filteName}
            className={"filterBtn flex items-center cursor-pointer " + (Activ === data.filteName ? "active" : "")}
            >
              {data.filteName}
              <span className='hidden'><IoCloseOutline className='text-lg ml-1' /></span>
            </button>
          ))}
        </div>
        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-10'>
        {data?.length > 0 && data.map(({info, cta: {link}})=>(
                <div key={info?.id} className='hover:scale-93 duration-300'>
              <RestaurantCard {...info} link={link} />
            </div>

              ))
              }
          </div>
    </div>
  )
}

export default OnlineFoodDelivary