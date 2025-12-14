import { useContext, useEffect, useState } from "react"
import { Coordinates } from "../components/Context"

const useRestaurentData = () => {
  const [onYourMind, setOnYourMind] = useState([])
  const [topRasturent, setTopRasturent] = useState([])
  const [titleRes, setTitleRes] = useState("")
  const [titleOn, setTitleOn] = useState("")
  const [delAddress, setDelAddress] = useState("")
  const { coord: { lat, lng } } = useContext(Coordinates)
  const [Apiresult, setApiresult] = useState(null)

  const fetchData = async () => {
    const data = await fetch(
      `${import.meta.env.VITE_MAIN_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    )
    const result = await data.json()
    setApiresult(result)
   
    
    

    let mainData = result?.data?.cards.find((data)=>data?.card?.card?.id === "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants
    
    let mainData2 = result?.data?.cards.find((data)=>data?.card?.card?.id === "restaurant_grid_listing_v2")?.card?.card?.gridElements?.infoWithStyle?.restaurants
    setTopRasturent(mainData || mainData2)
    let data2 = result?.data?.cards.find((data)=>data?.card?.card?.id === "whats_on_your_mind")?.card?.card?.imageGridCards?.info
    setOnYourMind(data2)

    
    
    // ?.card?.card?.gridElements?.infoWithStyle?.restaurants

    // const card1 = result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    
    // console.log(card1);
    // console.log(card3);whats_on_your_mind
    
    

    const title1 = result?.data?.cards[1]?.card?.card?.title
    const title2 = result?.data?.cards[2]?.card?.card?.title
     setDelAddress(title1 || title2 || [])

    
    setTitleRes(result?.data?.cards[1]?.card?.card?.header?.title)
    setTitleOn(result?.data?.cards[0]?.card?.card?.header?.title)
   
  }

  useEffect(() => {
    fetchData()
  }, [lat, lng])


  return [onYourMind,topRasturent,titleRes,titleOn,delAddress,Apiresult]
  
}

export default useRestaurentData