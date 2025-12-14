import { useEffect, useState } from "react";

import RefPopMassege from "./RefPopMassege";
import Dish from "./Dish";
import SearchRestaurent from "./SearchRestaurent";
import { useDispatch, useSelector } from "react-redux";
import { reSetSimilarDish } from "../utilsh/ToogleSlice";
import { useContext } from "react";
import { Coordinates } from "./Context";
import { SearchDish } from "./Shimmer";



const Search = () => {
  const [inputData, setinputData] = useState("");
  const [Activ, setActiv] = useState("Dishes");
  const [Dishes, setDishes] = useState([]);
  const [Restaurent, setRestaurent] = useState([]);
  const [PopCuisines, setPopCuisines] = useState([]);
  const [SelectedDishesh, setSelectedDishesh] = useState(null);
  const [sameRestaurent, setSameRestaurent] = useState([]);
  const {
      coord: { lat, lng },
    } = useContext(Coordinates);
  
  const filterHandle = (filteName) => {
    
    setActiv(Activ === filteName ? Activ : filteName);
  };

  const {isSimilarResDish,city,resLocation,resId,itemId} = useSelector((state) => state.toogleSlice22.similarResDish);


  const dispach = useDispatch();

  const filterOptions = [
    { filteName: "Restaurants" },
    { filteName: "Dishes" }
  ];

  const PopularCuisines = async () => {
    let data = await fetch(
      `${import.meta.env.VITE_MAIN_URL}/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`
    );
    let res = await data.json();
    let finalData =
      res?.data?.cards[1]?.card?.card?.imageGridCards?.info;

    setPopCuisines(finalData);
  };

  const fetchDishes = async () => {
    let data = await fetch(
      `${import.meta.env.VITE_MAIN_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${inputData}&trackingId=undefined&submitAction=ENTER&queryUniqueId=baf154a3-4845-283f-0ed9-a31a682230e3`
    );
    let res = await data.json();

    let finalData =
      res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards.filter(
        (data) => data?.card?.card?.info
      );
    setDishes(finalData);
  };

  const fetchRastaurent = async () => {
    let data = await fetch(
      `${import.meta.env.VITE_MAIN_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${inputData}&trackingId=undefined&submitAction=ENTER&queryUniqueId=baf154a3-4845-283f-0ed9-a31a682230e3&selectedPLTab=RESTAURANT `
     
    );
    let res = await data.json();

    let finalData =
      res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards.filter(
        (data) => data?.card?.card?.info
      );
    setRestaurent(finalData);
  };

  useEffect(() => {
    if (isSimilarResDish) {
      searDish();
      
    }
  }, [isSimilarResDish]);

  const searDish = async () => {
    let pathName = `/city/${city}/${resLocation}`
    let encodedPath = encodeURIComponent(pathName)
    let data = await fetch(
      `${import.meta.env.VITE_MAIN_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${inputData}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest${resId}%3Fquery%3D${inputData}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`
    );
  


    let res = await data.json();
    console.log(res);
    
   
    
    setSelectedDishesh(res?.data?.cards[1]);
    setSameRestaurent(res?.data?.cards[2]?.card?.card?.cards);
    dispach(reSetSimilarDish());
   
  };
 ;
  
  
  

  const HandleSearchQuery = (e) => {
    let val = e.target.value;
    if (e.keyCode == 13) {
      setinputData(val);
      setSelectedDishesh(null);
      setDishes([]);
    }
  };

  useEffect(() => {
    if (inputData === "") return;

    fetchRastaurent();
    fetchDishes();
    PopularCuisines();
  }, [inputData]);

  useEffect(() => {
    PopularCuisines();
  }, []);

  return (
    <div className="h-screen p-30 bg-[#F7F7F7] flex items-center flex-col">
      <div className="md:w-[50%] fixed  w-[400px] h-full bg-[#F7F7F7]  gap-4 flex-col flex">
        <div className="bg-[#F7F7F7] h-30 flex w-full justify-center ">
          <input
            type="text"
            onKeyDown={HandleSearchQuery}
            placeholder="Search for restaurant and food"
            className="text-[#02060c] outline-none text-[17px] font-semibold w-full h-13 pl-4 border border-red rounded-[6px]"
          />
        </div>

        {inputData ? (
          <>
          {
            Dishes.length ? (
              <div className="flex gap-3 flex-wrap w-full ml-1">
              {filterOptions.map((data) => (
                <button
                  onClick={() => filterHandle(data.filteName)}
                  key={data.filteName}
                  className={
                    "filterBtn flex items-center cursor-pointer " +
                    (Activ === data.filteName ? "active" : "")
                  }
                >
                  {data.filteName}
                </button>
              ))}
            </div>
            ) : <SearchDish/>
          }


         
            

            <div
              id="tasklist"
              className={`bg-gray-200 w-[350px] md:w-full flex-col ${Dishes.length ? "block" : "hidden"} overflow-y-auto grid px-5 pt-10 grid-cols-1 md:grid-cols-2 gap-4`}
            >
              {SelectedDishesh ?
              <>
               <div className="gap-5 flex flex-col pl-2 ">
                    <h1 className="text-[rgb(40,44,63)] text-[18px] font-bold">Item added to cart</h1>
                    <Dish  data={SelectedDishesh?.card?.card} />
                    
                    
                    <h1 className="text-[#02060c] text-[20px] font-[500]">More dishes from this restaurant</h1>
                  </div>
                  <br></br>
                  {
                    sameRestaurent &&  sameRestaurent.map((data,i)=><Dish index={i} data={{...data?.card,restaurant:SelectedDishesh?.card?.card?.restaurant}}  />)
                  }
                  </>
                  :  Activ === "Dishes"
                ? Dishes &&
                  Dishes.map((data) => <Dish data={data?.card?.card} />)
                : Restaurent &&
                  Restaurent.map((data) => (
                    <SearchRestaurent data={data} />
                  ))
                  
                  
              }

              <RefPopMassege />
            </div>
          </>
        ) : ( 
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h1 className="text-[19px] font-semibold">
                Recent Searches
              </h1>
              <div className="p-5">
                <h1 className="border-b border-dotted border-gray-400 py-3">
                  Biryani
                </h1>
                <h1 className="border-b border-dotted border-gray-400 py-3">
                  Roll
                </h1>
                <h1 className="border-b border-dotted border-gray-400 py-3">
                  Burger
                </h1>
              </div>
            </div>

            <div className="py-3 text-2xl font-bold">
              Popular Cuisines
            </div>

            <div id="tasklist" className="flex overflow-x-auto mt-5">
              <div className="flex duration-400 gap-2">
                {PopCuisines.map((item, index) => (
                  <img
                    key={index}
                    className="w-[100px] h-[120px] rounded-[13px] object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                    alt=""
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
