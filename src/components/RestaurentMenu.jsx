import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { RiArrowUpSLine } from "react-icons/ri";
import { AiFillTag } from "react-icons/ai";
import { MdShoppingBag } from "react-icons/md";

import veg from "../assets/ChatGPT Image Sep 13, 2025, 10_28_59 AM.png";
import nonveg from "../assets/ChatGPT Image Sep 13, 2025, 10_20_34 AM.png";

import Logo from "../assets/ChatGPT Image Sep 9, 2025, 08_23_10 AM.png";
import Design from "../assets/ChatGPT Image Sep 10, 2025, 07_55_33 AM.png";
import Design1 from "../assets/ChatGPT Image Sep 10, 2025, 07_58_40 AM.png";
import Discount from "./Discount";
import Toppickstitle from "./Toppickstitle";

import { ToastContext } from "./Context";
import RefPopMassege from "./RefPopMassege";
import { useSelector } from "react-redux";
import AddToCartBtn from "./AddToCartBtn";
import { ResMenuShimmer } from "./Shimmer";
import useResMenuData from "../Hook/useResMenuData";

const RestaurentMenu = () => {

  const [resInfo,discountData,menuData,Value,upperData,RestaurantId,RestaurantAddRes,HandleNext,HandlePrev] = useResMenuData()

   const { visible } = useContext(ToastContext);
  const CardLength = useSelector((state) => state.cartSlice.cartItems);
  

  return (
    <div className="w-full pt-20">
      {
        menuData.length ? (
          <div className="custom-text lg:w-[50%] w-[90%] mx-auto flex gap-3 pt-10 flex-col">
        <p className="text-[#9aa1aa] text-[15px]">
          <Link to="/" className="cursor-pointer">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/">
            <span className="cursor-pointer">{resInfo.city} </span>
          </Link>{" "}
          /{" "}
          <span className="text-[#55554f] text-[15px] font-bold">
            {resInfo.name}
          </span>
        </p>

        <h1 className="text-[rgba(2,6,12,0.92)] text-4xl font-bold pt-6 pl-4">
          {resInfo.name}
        </h1>

        {/* ---------------- CARD TOP DETAIL ---------------- */}
        <div className="h-[270px] w-full bg-[linear-gradient(rgb(255,255,255)_-6.71%,rgb(235,235,242)_56.19%,rgb(223,223,231)_106.56%)] rounded-bl-[45px] rounded-br-[45px] p-4.5 mt-4">
          <div className="w-full h-[230px] rounded-4xl border-slate-300/70 border bg-white pt-4">
            <div className="p-4 w-full">
              <div className="flex gap-1 items-center font-black">
                <FaStar className="bg-green-700 p-1 text-[20px] rounded-full text-white mr-1.5" />
                <span className="text-[20px] text-[#122620]">
                  {resInfo.avgRating}
                </span>
                <span className="text-[20px] text-[#122620]">
                  ({resInfo.totalRatingsString})
                </span>
                <span className="text-[30px] text-gray-400 pb-3">.</span>
                <span className="text-[20px] text-[#122620]">
                  {resInfo.costForTwoMessage}
                </span>
              </div>

              <p className="text-[17px] font-black text-[rgb(255,82,0)] underline cursor-pointer">
                {resInfo?.cuisines?.join(", ") || "No cuisines available"}
              </p>

              {/* OUTLET + TIME */}
              <div className="w-full h-[50px] flex items-center gap-1">
                <div className="h-[40px] w-[8px] flex flex-col items-center justify-center">
                  <div className="bg-[rgb(196,196,196)] h-[8px] w-[8px] rounded-full"></div>
                  <div className="h-[20px] w-[1px] bg-[rgb(196,196,196)]"></div>
                  <div className="bg-[rgb(196,196,196)] h-[8px] w-[8px] rounded-full"></div>
                </div>

                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <p className="text-[#122620] text-[15px] font-black">
                      Outlet
                    </p>
                    <span className="text-[#888888] font-black">
                      {resInfo?.locality}
                    </span>
                  </div>
                  <div>
                    <p className="text-[#122620] text-[15px] font-black">
                      {resInfo?.sla?.slaString}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="text-gray-200" />

            {/* MEMBER / LOYALTY INFO */}
            <div className="flex rounded-b-4xl pl-4 w-full h-12 items-center bg-[linear-gradient(278deg,rgba(255,237,239,0.9)_6.25%,rgba(255,255,255,0)_33.99%,rgba(255,255,255,0)_93.75%)]">
              {resInfo?.loyaltyDiscoverPresentationInfo?.logoCtx?.logo ? (
                <img
                  className="h-[40px] w-[50px]"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${resInfo?.loyaltyDiscoverPresentationInf?.logoCtx?.logo}`}
                  alt="logo"
                />
              ) : (
                <img src={Logo} className="h-[70px] w-[100px]" alt="logo" />
              )}

              <div>
                {resInfo?.loyaltyDiscoverPresentationInfo?.freedelMessage ? (
                  <span className="text-2xl font-bold">
                    {resInfo?.loyaltyDiscoverPresentationInfo?.freedelMessage}
                  </span>
                ) : (
                  <span className="text-[19px] font-bold text-[rgb(255,82,0)]">
                    Free delivery on orders above ₹99
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- DEALS FOR YOU ---------------- */}
        <div className="p-5 mt-0">
          <div className="p-2">
            <div className="w-full">
              <div className="flex justify-between">
                <p className="font-bold text-2xl custom-text ml-4">
                  Deals for you
                </p>

                <div className="flex gap-10">
                  <div
                    onClick={HandlePrev}
                    className={`p-3 cursor-pointer rounded-full ${
                      Value <= 0
                        ? "bg-[rgba(2,6,12,0.10)]"
                        : "bg-[rgba(2,6,12,0.25)]"
                    }`}
                  >
                    <FaArrowLeft />
                  </div>

                  <div
                    onClick={HandleNext}
                    className={`p-3 cursor-pointer rounded-full ${
                      Value >= 57
                        ? "bg-[rgba(2,6,12,0.10)]"
                        : "bg-[rgba(2,6,12,0.25)]"
                    }`}
                  >
                    <FaArrowRight />
                  </div>
                </div>
              </div>

              {/* DEAL CARDS */}
              <div id="tasklist" className="flex overflow-x-auto mt-5">
                <div
                  style={{ translate: `-${Value}%` }}
                  className="flex duration-400 gap-3"
                >
                  {discountData.map((data, index) => (
                    <Discount key={index} data={data} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- MENU DIVIDER ---------- */}
          <div className="w-full h-[80px] flex items-center mt-4">
            <div className="w-full flex items-center justify-center">
              <img className="h-[30px]" src={Design} alt="menuDesign" />
              <p className="text-2xl text-[rgba(2,6,12,0.6)]">MENU</p>
              <img className="h-[30px]" src={Design1} alt="menuDesign" />
            </div>
          </div>

          {/* ---------- SEARCH ---------- */}
          <Link to="/">
            <div className="w-full bg-[rgba(2,6,12,0.1)] h-[55px] rounded-[12px] p-3 items-center flex  flex-row-reverse gap-75">
              <IoIosSearch size={30} className="text-gray-700" />
              <div className="text-[18px] font-black text-[rgba(2,6,12,0.6)]">
                Search for dishes
              </div>
            </div>
          </Link>

          {/* ---------- MENU SECTIONS ---------- */}
          <div className="w-full mt-7">
            {upperData.length > 0 && <Toppickstitle upperData={upperData} />}

            {menuData.map(({ card: { card },i }) => (
              <MenuCard card={card} resInfo={resInfo} index={i} />
            ))}
          </div>

          {/* ---------- FOOTER INFO ---------- */}
          <div className="w-full h-[400px] flex flex-col items-center justify-start bg-gradient-to-t from-[#f5f4f9] via-[#e5e5e5] to-[#e5e5e5]">
            <div className="w-[95%] h-[60px] border-b-2 border-[rgba(2,6,12,0.1)]">
              {RestaurantId.map(
                (
                  {
                    card: {
                      card: { text, imageId },
                    },
                  },
                  index
                ) => (
                  <div
                    key={index}
                    className="flex items-center justify-start gap-7"
                  >
                    <img
                      className="h-[35px]"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                      alt=""
                    />
                    <p className="text-black/60 font-bold mt-2">{text[0]}</p>
                  </div>
                )
              )}
            </div>

            <div className="w-[95%] h-[120px] flex flex-col justify-center border-b-2 border-[rgba(2,6,12,0.1)]">
              {RestaurantAddRes.map(
                (
                  {
                    card: {
                      card: { completeAddress, name, area },
                    },
                  },
                  index
                ) => (
                  <div key={index}>
                    <p className="text-black/60 font-black text-[18px]">
                      {name}
                    </p>
                    <p className="text-[rgba(2,6,12,0.5)] font-bold">
                      (Outlet:{area})
                    </p>
                    <p className="flex items-center gap-2 mt-3 text-black/40 font-bold">
                      <MdLocationPin size={30} />
                      {completeAddress}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ---------- VIEW CART BUTTON ---------- */}
          {CardLength.length > 0 ? (
            <Link to={"/cart"}>
              <div
                className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[90%] lg:w-[50%] bg-[#21A179] text-white flex justify-between items-center px-6 py-3 font-semibold cursor-pointer transition-all duration-300 
              ${visible ? "translate-y-0" : "translate-y-full"}`}
              >
                <p>{CardLength.length} items added</p>
                <button className="flex cursor-pointer items-center gap-2">
                  VIEW CART <MdShoppingBag size={18} />
                </button>
              </div>
            </Link>
          ) : (
            ""
          )}

          <RefPopMassege />
        </div>
      </div>

        ) : <ResMenuShimmer />
      }
  
      
    </div>
  );
};

const MenuCard = ({ card, resInfo, index }) => {
  let hello = false;

  if (card["@type"]) {
    hello = true;
  }

  const [IsOpen, setIsOpen] = useState(hello);

  const Toggle = () => {
    setIsOpen((prev) => !prev);
  };

  if (card.itemCards) {
    const { title, itemCards } = card;

    return (
      <div key={index}>
        <div className="flex justify-between">
          <h1 className="text-[24px] text-black font-black pb-7 pt-6">
            {title}({itemCards.length})
          </h1>

          <RiArrowUpSLine
            size={30}
            className={`cursor-pointer transition-transform duration-0 ${
              IsOpen ? "rotate-0" : "rotate-180"
            }`}
            onClick={Toggle}
          />
        </div>

        {IsOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />}

        <div className="w-full bg-[rgba(2,6,12,0.1)] h-[16px]"></div>
      </div>
    );
  } else {
    const { title, categories } = card;

    return (
      <div>
        <h1 className="text-[24px] text-[rgba(0,0,0,0.95)] font-extrabold pb-7 pt-3">
          {title}
        </h1>

        {categories.map((data,i) => (
          <MenuCard card={data} resInfo={resInfo} index={i} />
        ))}
      </div>
    );
  }
};

const DetailMenu = ({ itemCards, resInfo }) => {
  return (
    <div>
      {itemCards.map(({ card: { info } }, index) => (
        <DetailmenuCard info={info} index={index} key={index} resInfo={resInfo} />
      ))}
    </div>
  );
};

const DetailmenuCard = ({ info, resInfo }) => {
  const {
    name,
    imageId,
    description,
    nextAvailableAtMessage,
    defaultPrice,
    finalPrice,
    price,
    itemAttribute: { vegClassifier } = {},
    ratings: { aggregatedRating: { rating, ratingCountV2 } = {} } = {},
    ribbon: { text } = {},
    offerTags = [],
  } = info;

  const [{ title, subTitle } = {}] = offerTags;

  return (
    <>
      <div>
        <div className="flex flex-col w-full">
          <div>
            <div className="relative w-full py-7 flex-wrap flex justify-between items-center border-b-1 border-[rgba(2,6,12,0.1)]">
              <div className="w-[70%] flex flex-col">
                <div className="flex items-center gap-2">
                  {vegClassifier === "VEG" ? (
                    <img src={veg} className="h-[25px] w-[26px]" alt="" />
                  ) : (
                    <img src={nonveg} className="h-[25px] w-[28px]" alt="" />
                  )}

                  {text === "Bestseller" && (
                    <p className="text-[#FE6D5B] font-bold">
                      ✩┈•✦
                      <span className="text-[19px] font-black">B</span>
                      <span className="font-bold">estseller</span>
                    </p>
                  )}
                </div>

                <h3 className="text-[22px] font-bold text-[rgba(2,6,12,0.92)]">
                  {name}
                </h3>

                {finalPrice ? (
                  <p className="text-[18px] font-black flex items-center gap-1">
                    {defaultPrice ? (
                      <span className="text-[#02060c99] line-through decoration-[#02060c99]">
                        ₹ {defaultPrice / 100}
                      </span>
                    ) : (
                      <span className="text-[#02060c99] line-through decoration-[#02060c99]">
                        ₹ {price / 100}
                      </span>
                    )}

                    <span>₹ {finalPrice / 100}</span>
                    <AiFillTag size={15} className="text-green-700" />
                  </p>
                ) : price ? (
                  <p className="text-[18px] font-black flex items-center gap-2">
                    ₹ {price / 100}{" "}
                    {title && (
                      <span className="text-[#02060c99] text-[15px] font-bold">
                        {title.toUpperCase()}
                        {subTitle}
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-[18px] font-black flex items-center gap-2">
                    ₹ {defaultPrice / 100}
                  </p>
                )}

                {rating && (
                  <p className="text-[5px] flex py-2 items-center">
                    <FaStar
                      size={15}
                      className={`text-[20px] rounded-full ${
                        rating >= 3
                          ? "text-green-700"
                          : "text-[rgb(230,164,8)]"
                      }`}
                    />
                    <span
                      className={`text-[15px] font-black ${
                        rating >= 3
                          ? "text-green-700"
                          : "text-[rgb(230,164,8)]"
                      }`}
                    >
                      {rating}
                    </span>
                    <span className="text-[15px] font-black">
                      ({ratingCountV2})
                    </span>
                  </p>
                )}

                <p className="text-[#02060c99] text-[20px] line-clamp-2 font-[500]">
                  {description}
                </p>
              </div>

              {/* IMAGE + ADD BUTTON */}
              <div
                className={`w-[30%] flex justify-center flex-col ${
                  imageId ? "items-end" : "items-center"
                }`}
              >
                <div className="relative flex flex-col items-center">
                  {imageId && (
                    <img
                      className={`h-[150px] w-[160px] object-cover rounded-2xl ${
                        nextAvailableAtMessage ? "grayscale" : ""
                      }`}
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
                      alt=""
                    />
                  )}

                  <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
                    {nextAvailableAtMessage ? (
                      <button
                        className={`${
                          imageId ? "" : "ml-15"
                        } bg-white text-black rounded-[8px] text-[12px] hover:bg-[#c0c0c0] duration-200 font-black border border-[#c0c0c0] w-[100px] h-[40px] whitespace-normal break-words`}
                      >
                        {nextAvailableAtMessage}
                      </button>
                    ) : (
                      <AddToCartBtn resInfo={resInfo} info={info} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    </>
  );
};

export default RestaurentMenu;
