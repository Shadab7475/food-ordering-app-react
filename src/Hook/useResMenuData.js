import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Coordinates, ToastContext } from "../components/Context";


const useResMenuData = () => {
    const { id } = useParams();
  let RestaurentId = id.match(/(\d+)$/)[0];

  const [resInfo, setresInfo] = useState([]);
  const [discountData, setdiscountData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [Value, setValue] = useState(0);
  const [upperData, setUpperData] = useState([]);
  const [RestaurantId, setRestaurantId] = useState([]);
  const [RestaurantAddRes, setRestaurantAddRes] = useState([]);

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);
  const HandleNext = () => {
    Value >= 57 ? "" : setValue((prev) => prev + 19);
  };

  const HandlePrev = () => {
    Value <= 0 ? "" : setValue((prev) => prev - 19);
  };

 

  const fetchMenu = async () => {
    let data = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${RestaurentId}&submitAction=ENTER`);
    let res = await data.json();
    
    

    

    setresInfo(res?.data?.cards[2]?.card?.card?.info);
    setdiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);

    let ActualData =
      res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) =>
          data?.card?.card?.itemCards || data?.card?.card?.categories
      );

    let upperData =
      res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (option) => option?.card?.card?.carousel
      );

    let RestaurantId =
      res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (option) => option?.card?.card?.text
      );

    let RestaurantAddRes =
      res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (option) => option?.card?.card?.completeAddress
      );

    setUpperData(upperData);
    setMenuData(ActualData);
    setRestaurantId(RestaurantId);
    setRestaurantAddRes(RestaurantAddRes);

     
  };
  
  

 

  useEffect(() => {
    fetchMenu();
  }, [RestaurentId]);

  return [resInfo,discountData,menuData,Value,upperData,RestaurantId,RestaurantAddRes,HandleNext,HandlePrev]
  
}
    



export default useResMenuData