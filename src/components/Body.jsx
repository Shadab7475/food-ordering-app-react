import React, { useContext, useEffect, useState } from 'react'


import Onyourmind from './Onyourmind';
import TopRasturent from './TopRasturent';
import OnlineFoodDelivary from './OnlineFoodDelivary';
import { Coordinates } from './Context';
import Unserviceable from './Unserviceable';
import { useSelector } from 'react-redux';
// localStorage.clear();



const Body = () => {
  const [onYourMind, setOnYourMind] = useState([])
  const [topRasturent, setTopRasturent] = useState([])
  const [titleRes, setTitleRes] = useState("")
  const [titleOn, setTitleOn] = useState("")
  const [delAddress, setDelAddress] = useState("")
  const {coord:{lat,lng}} = useContext(Coordinates)
  const [Apiresult, setApiresult] = useState(null)
  
  
  const fetchData = async()=>{
      const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
      const result = await data.json();
      setApiresult(result)
    
      const card3 =  result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      const card1 = result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setTopRasturent(card1 || card3 || []);
      const title1 = result?.data?.cards[1]?.card?.card?.title;
      const title2 = result?.data?.cards[2]?.card?.card?.title
      setOnYourMind(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
      setTitleRes(result?.data?.cards[1]?.card?.card?.header?.title)
      setTitleOn(result?.data?.cards[0]?.card?.card?.header?.title)
      setDelAddress(title1 || title2 || []);
  }
  useEffect(() => {
    fetchData()
  }, [lat,lng])

  const filterVal = useSelector((state)=>state.filterSlice.filterVal)
 
  const filterData = topRasturent.filter(item=>{
    if (!filterVal) return true
    switch (filterVal) {
      case  "Ratings 4.0+" : return item.info.avgRating > 4
      case  "Rs. 300-Rs. 600" : return item?.info?. costForTwo ?.slice(1,4) >= "300" && item?.info?.costForTwo?.slice(1,4) <= "600"
      case  "Offers" : return item?.info?.aggregatedDiscountInfoV3 
      case  "Less than Rs. 300" : return item?.info?. costForTwo ?.slice(1,4) <= "300"
      default :return true
       
    }
    
  })
 
  if (Apiresult?.data?.cards[0]?.card?.card?.title === "Location Unserviceable") {
    return <Unserviceable Apiresult={Apiresult} />
    
  }

  
  
  
  return (
    <div className='w-full pt-[80px]'>

        <div className='mx-auto max-w-[88%]  '>

          <Onyourmind data={onYourMind} title={titleOn}/>
          <TopRasturent data={topRasturent} title={titleRes}/>
          <OnlineFoodDelivary data={ filterVal ? filterData : topRasturent} title={delAddress} />

          

          
        </div>
          
          
    </div>
  )
}


export default Body