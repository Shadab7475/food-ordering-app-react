import React from "react";
import veg from "../assets/ChatGPT Image Sep 13, 2025, 10_28_59 AM.png";
import nonveg from "../assets/ChatGPT Image Sep 13, 2025, 10_20_34 AM.png";
import { FaStar } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch, useSelector } from "react-redux";
import { setSimilarResDish,  } from "../utilsh/ToogleSlice";
import { Link } from 'react-router-dom';



const Dish = ({
  data: {
     info,
     restaurant: { info: resInfo },
     hideRestaurantDetails = false,

       }, 
}) => {
  let {imageId, name, price, isVeg = 0,id:itemId } = info;
 
  
  let {
    id,
    name: resName,
    avgRating,
    sla: { slaString },
    slugs : {
      city,
      restaurant : resLocation
    }

  } = resInfo;

  
  const dispath = useDispatch();
 
  const {id:cartResId} = useSelector((state)=>state.cartSlice.resInfo)
  
  const HandleSameRes = () => {
    if (cartResId === id || !cartResId) {
      
    
    dispath(setSimilarResDish({
            isSimilarResDish : true,
            city,
            resLocation,
            resId : id,
            itemId 

    }))
      }
  };
 
  
 

  return (
   
     <div key={resName} className={`bg-white border-none rounded-4xl w-full flex flex-col gap-3 ${hideRestaurantDetails ? "h-[200px] p-4" :"h-[270px] p-3" } shadow-md   border-2`}>
      {!hideRestaurantDetails && 
      <Link to={`/restaurantMenu/${resLocation}-${id}`}>
      <div className="flex cursor-pointer border-b border-dotted border-gray-400 h-[60px] p-1 justify-between">
        <div className="max-w-[90%] flex flex-col">
          <p className="whitespace-nowrap text-[15px] text-[rgba(2,6,12,.7)] font-bold overflow-hidden text-ellipsis">
            By<span>{resName}</span>
          </p>

          <p className="flex text-[rgba(2,6,12,.6)] items-center text-[12px] font-semibold gap-2">
            <span>
              <FaStar />
            </span>
            <span>{avgRating}</span>
            <span>.</span>
            {slaString}
          </p>
        </div>

        <div className="flex items-center justify-end w-[10%]">
          <GoArrowRight size={30} />
        </div>
      </div>
      </Link>
     

      }

      

      <div className="flex">
        <div className="w-[50%] p-1 flex flex-col">
          {isVeg === 1 ? (
            <img src={veg} className="h-[25px] w-[26px]" alt="" />
          ) : (
            <img src={nonveg} className="h-[25px] w-[28px]" alt="" />
          )}

          <h1 className="text-[18px] font-[700] line-clamp-2 text-[rgba(2,6,12,0.75)]">
            {name}
          </h1>

          <p className="text-[rgba(2,6,12,0.92)] text-[16px] font-[700]">
            ₹ {price / 100}
          </p>

          <div className="mt-auto flex items-center cursor-pointer">
            <button className="cursor-pointer text-[rgba(2,6,12,0.6)] font-semibold flex items-center rounded-[10px] border-1 border-gray-300 px-3 py-1">
              More Details{" "}
              <MdKeyboardArrowRight
                size={20}
                className="text-[rgba(2,6,12,0.6)]"
              />
            </button>
          </div>
        </div>

        <div className="w-[50%] p-1 flex items-center justify-end relative">
          {imageId && (
            <img
              className="h-35 w-40 rounded-[15px] object-cover"
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
            />
          )}

          <div className="absolute bottom-[-18px] left-[55%] -translate-x-1/2">
            <div onClick={HandleSameRes}>
              <AddToCartBtn info={info} resInfo={resInfo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
