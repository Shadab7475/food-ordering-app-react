import React from 'react';
import { IoStarSharp } from "react-icons/io5";

const SearchRestaurent = ({
  data: {
    card: {
      card: {
        info: {
          unorderableMessage,
          cloudinaryImageId,
          aggregatedDiscountInfoV3,
          costForTwoMessage,
          cuisines,
          name,
          sla: { slaString },
          avgRatingString,
          promoted
        }
      }
    }
  }
}) => {

  const Discount = aggregatedDiscountInfoV3;

  return (
    <div className="bg-white w-full inset-0 flex gap-1 shadow-md h-[155px] p-3">
      
      <div className="w-[30%] relative">

        {promoted && (
          <div className="bg-[#3e4152] absolute top-2 left-2 -translate-x-1/2 h-5 w-7 rounded-[3px] text-[14px] font-[500] text-[rgba(255,255,255,.9)] p-2 flex items-center justify-center">
            <p>Ad</p>
          </div>
        )}

        <img
          className={`h-[105px] w-[110px] rounded-2xl object-cover ${
            unorderableMessage ? "brightness-[0.9] grayscale" : ""
          }`}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`}
          alt=""
        />

        <div className="absolute left-13 -translate-x-1/2 top-15">
          {Discount?.discountTag && (
            <div className="bg-[#ff5200] h-6 w-18 rounded-t-[12px] text-white font-extrabold text-[10px] items-center justify-center flex">
              FLAT DEAL
            </div>
          )}
        </div>

        {Discount && (
          <div
            className={`bg-[#fff] border-[#e3e3e3] border-1 absolute left-13 -translate-x-1/2 ${
              Discount?.subHeader ? "h-9 w-20 top-20" : "h-8 w-20 top-21"
            } rounded-[5px] text-[14px] font-[500] text-[rgba(255,255,255,.9)] flex items-center justify-center`}
          >
            <div className="w-full flex flex-col items-center justify-center">
              <p className="text-3 font-bold text-[#ff5200]">
                {Discount?.header}
              </p>

              {Discount?.subHeader && (
                <p className="flex items-center text-[10px] font-bold text-[#ff5200]">
                  <span className="text-[12px] pb-1">•</span>
                  <span>{Discount?.subHeader}</span>
                  <span className="text-[12px] pb-1">•</span>
                </p>
              )}
            </div>
          </div>
        )}

      </div>

      <div className="ml-2 flex justify-center flex-col w-[70%]">
        <h2 className="text-[#3e4152] font-bold line-clamp-1 text-[16px]">
          {name}
        </h2>

        <p className="flex items-center gap-1 text-[#696b79] text-[14px] font-semibold">
          <IoStarSharp />
          <span>{avgRatingString}.</span>
          <span>{slaString}.</span>
          <span>{costForTwoMessage}</span>
        </p>

        {unorderableMessage ? (
          <p className="line-clamp-1 text-[14px] font-semibold text-[rgba(2,6,12,.5)]">
            {unorderableMessage}
          </p>
        ) : (
          <p className="line-clamp-1 text-[14px] font-semibold text-[rgba(2,6,12,.5)]">
            {cuisines.map((data) => (
              <span>{data}, </span>
            ))}
          </p>
        )}
      </div>

    </div>
  );
};

export default SearchRestaurent;
