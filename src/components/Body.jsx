import React from 'react'
import Onyourmind from './Onyourmind'
import TopRasturent from './TopRasturent'
import OnlineFoodDelivary from './OnlineFoodDelivary'
import { Coordinates } from './Context'
import Unserviceable from './Unserviceable'
import { useSelector } from 'react-redux'
import Shimmer from './Shimmer'
import useRestaurentData from '../Hook/useRestaurentData'


const Body = () => {
  const [onYourMind,topRasturent,titleRes,titleOn,delAddress,Apiresult] = useRestaurentData()

  const filterVal = useSelector((state) => state.filterSlice.filterVal)

  const filterData = topRasturent.filter(item => {
    if (!filterVal) return true
    switch (filterVal) {
      case "Ratings 4.0+":
        return item.info.avgRating > 4
      case "Rs. 300-Rs. 600":
        return item?.info?.costForTwo?.slice(1, 4) >= "300" &&
          item?.info?.costForTwo?.slice(1, 4) <= "600"
      case "Offers":
        return item?.info?.aggregatedDiscountInfoV3
      case "Less than Rs. 300":
        return item?.info?.costForTwo?.slice(1, 4) <= "300"
      default:
        return true
    }
  })

  if (Apiresult?.data?.cards[0]?.card?.card?.title === "Location Unserviceable") {
    return <Unserviceable Apiresult={Apiresult} />
  }

  return (
    <div className='w-full'>
      {
        topRasturent.length ? (
          <div className='w-full sm:w-[90%] lg:w-[80%] mx-auto px-10 overflow-hidden mt-20'>
        {
          onYourMind && 
          <>
          <Onyourmind data={onYourMind} title={titleOn} />
        <TopRasturent data={topRasturent} title={titleRes} /> 
          </>
        }
        
        <OnlineFoodDelivary data={filterVal ? filterData : topRasturent} title={delAddress} />
      </div>
        ) : <Shimmer/>
        
      }
      
      
    </div>
  )
}

export default Body
