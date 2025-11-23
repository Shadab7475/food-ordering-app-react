import { useContext, useEffect, useState} from "react"
import { Link, useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { RiArrowUpSLine } from "react-icons/ri";
import { AiFillTag } from "react-icons/ai";
import { MdShoppingBag } from "react-icons/md";

import veg from "../assets/ChatGPT Image Sep 13, 2025, 10_28_59 AM.png"
import nonveg from "../assets/ChatGPT Image Sep 13, 2025, 10_20_34 AM.png"

import Logo from "../assets/ChatGPT Image Sep 9, 2025, 08_23_10 AM.png";
import Design from "../assets/ChatGPT Image Sep 10, 2025, 07_55_33 AM.png"
import Design1 from "../assets/ChatGPT Image Sep 10, 2025, 07_58_40 AM.png"
import Discount from "./Discount";
import Toppickstitle from "./Toppickstitle";
// import Categories from "./Categories";
import { Coordinates, HandleQuatitis, ToastContext } from "./Context";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart } from "../utilsh/cartSlice";
import toast from "react-hot-toast";

const RestaurentMenu = () => {
  const {id} =  useParams();
  let RestaurentId = id.match(/(\d+)$/)[0];
  // const [isopen, setIsOpen] = useState([])
  

  const [resInfo, setresInfo] = useState([])
  const [discountData, setdiscountData] = useState([])
  const [menuData, setMenuData] = useState([]);
  const [Value, setValue] = useState(0)
  const [upperData, setUpperData] = useState([])
  const [RestaurantId, setRestaurantId] = useState([])
  const [RestaurantAddRes, setRestaurantAddRes] = useState([])
  // const [HideData, setHideData] = useState([])

  const {coord:{lat,lng}} = useContext(Coordinates)
  const {showPopup,setshowPopup,ClearCart} = useContext(HandleQuatitis)

 
  
     const HandleNext = ()=>{
      Value >= 57 ? "" : setValue((prev)=>prev+19)
    }
     const HandlePrev = ()=>{
      Value <= 0 ? "" : setValue((prev)=>prev-19)
     }
  const fetchMenu = async()=>{
    let data = await fetch(`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${RestaurentId}&submitAction=ENTER`);
    let res = await data.json()
    setresInfo(res?.data?.cards[2]?.card?.card?.info)
    setdiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
    let ActualData = res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(data => data?.card?.card?.itemCards ||data?.card?.card?.categories );
    let upperData = res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(option => option?.card?.card?.carousel);
    let RestaurantId = res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(option => option?.card?.card?.text);
    let RestaurantAddRes = res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(option => option?.card?.card?.completeAddress)
    // let Categories = res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(option => option?.card?.card.categories)
    setUpperData(upperData);
    setMenuData(ActualData);
    setRestaurantId(RestaurantId);
    setRestaurantAddRes(RestaurantAddRes)
    // setHideData(Categories)

   
    

    
    
  }
 
  const {visible} = useContext(ToastContext)
  // let CardLength = JSON.parse(localStorage.getItem("CardData"))
  const CardLength = useSelector((state)=>state.cartSlice.cartItems) 
  const dispatch = useDispatch()

  useEffect(() => {
    fetchMenu()
    
    
  }, [RestaurentId])

  return (
    <div className="w-full pt-20 ">
      <div className=" custom-text w-1/2 mx-auto flex gap-3 pt-10 flex-col ">
        <p className="text-[#9aa1aa] text-[15px]"><Link to={"/"} className="cursor-pointer">Home</Link> / <Link to={"/"}><span className=" cursor-pointer">{resInfo.city} </span></Link> / <span className="text-[#55554f] text-[15px] font-bold">{resInfo.name}</span></p>
        <h1 className="text-[rgba(2,6,12,0.92)] text-4xl font-bold pt-6 pl-4 ">{resInfo.name}</h1>
        <div className="h-[270px] w-full bg-[linear-gradient(rgb(255,255,255)_-6.71%,rgb(235,235,242)_56.19%,rgb(223,223,231)_106.56%)] rounded-bl-[45px] rounded-br-[45px] p-4.5  mt-4" >
          <div className="w-full h-[230px] rounded-4xl border-slate-300/70 border  bg-white pt-4  ">
          <div className="p-4 w-full">
             <div className="flex gap-1 items-center font-black">
            <FaStar className='bg-green-700 p-1 text-[20px] rounded-full text-white mr-1.5'/>
            <span className={`text-[20px] text-[#122620]`}>{resInfo.avgRating}</span>
          <span className="text-[20px] text-[#122620]">({resInfo.totalRatingsString})</span>
          <span className="text-[30px] text-gray-400 pb-3">.</span>
          <span className="text-[20px] text-[#122620]">{resInfo.costForTwoMessage}</span>
          </div>
          <p className="text-[17px] font-black text-[rgb(255,82,0)] underline cursor-pointer  ">{resInfo?.cuisines?.join(", ") || "No cuisines available"}</p>
          <div className="w-full h-[50px] flex items-center gap-1">
            <div className="h-[40px] w-[8px] flex flex-col items-center justify-center">
              <div className="bg-[rgb(196,196,196)] h-[8px] w-[8px] rounded-full"></div>
              <div className="h-[20px] w-[1px] bg-[rgb(196,196,196)]" ></div>
              <div className="bg-[rgb(196,196,196)] h-[8px] w-[8px] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <p className="text-[#122620] text-[15px] font-black">Outlet</p><span className="text-[#888888] font-black">{resInfo?.locality}</span>
              </div>
              <div><p className="text-[#122620] text-[15px] font-black">{resInfo?.sla?.slaString}</p></div>
            </div>
          </div>
          </div>
         
          <hr className="text-gray-200"/>
          <div className="flex rounded-b-4xl pl-4 w-full h-12 items-center bg-[linear-gradient(278deg,rgba(255,237,239,0.9)_6.25%,rgba(255,255,255,0)_33.99%,rgba(255,255,255,0)_93.75%)] ">
            {resInfo?.loyaltyDiscoverPresentationInfo?.logoCtx?.logo ? (
              <img className="h-[40px] w-[50px]" src={`https://media-assets.swiggy.com/swiggy/image/upload/${resInfo?.loyaltyDiscoverPresentationInf?.logoCtx?.logo}`}alt="logo"/>) : (
              <img src={Logo} className="h-[70px] w-[100px]"  alt="logo" />
              )}
              <div>
                {resInfo?.loyaltyDiscoverPresentationInfo?.freedelMessage ? (
                <span className="text-2xl font-bold">{resInfo?.loyaltyDiscoverPresentationInfo?.freedelMessage}</span>
              ):(<span className="text-[19px] font-bold text-[rgb(255,82,0)] ">Free delivery on orders above ₹99</span>)}
              </div>

            </div>
          </div>
        </div>
        <div className="p-5 mt-0">
          <div className=" p-2">
            <div className=' w-full'>
                    <div className='flex justify-between '>
                        <p className='font-bold text-2xl custom-text ml-4'>Deals for you</p>
                        <div className='flex gap-10'>
                          <div onClick={HandlePrev} className={`p-3 cursor-pointer rounded-full ${Value <= 0 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]"}`}><FaArrowLeft /></div>
                          <div onClick={HandleNext} className={` p-3 cursor-pointer rounded-full ${Value >=57 ? "bg-[rgba(2,6,12,0.10)]" : "bg-[rgba(2,6,12,0.25)]" }`}><FaArrowRight /></div>
                        </div>
                      </div>
            
                      <div id='tasklist' className='flex overflow-x-auto mt-5'>
                        <div
                        style={{translate:`-${Value}%`}}
                         className={`flex duration-400 gap-3`}>
                          {discountData.map((data, index) => (
                            <Discount key={index} data={data} index={index} />
                            ))}
                      </div>
                      </div>   
                </div>
          </div>
          <div className="w-full h-[80px] flex items-center mt-4">
            <div className="w-full flex items-center justify-center">
              <img className="h-[30px]" src={Design} alt="menuDesign" />
              <p className="text-2xl text-[rgba(2,6,12,0.6)]">MENU</p>
              <img className="h-[30px]" src={Design1} alt="menuDesign" />
            </div>
          </div>
          <Link to={"/"}>
          <div className="w-full bg-[rgba(2,6,12,0.1)] h-[55px] rounded-[12px] p-3 items-center flex  flex-row-reverse  gap-75">
            <IoIosSearch size={30} className="text-gray-700" />
            <div className="text-[18px] font-black text-[rgba(2,6,12,0.6)]">Search for dishes</div>
          </div>
          </Link>
          <div className=" w-full mt-7">
            {
              upperData.length > 0 && <Toppickstitle upperData={upperData} />
            }

            {menuData.map(({card: {card}})=>(
              <MenuCard card={card} resInfo={resInfo}  />
              
              ))
            } 
            </div>
              
              <div className="w-full h-[400px] flex flex-col items-center justify-start bg-gradient-to-t from-[#f5f4f9] via-[#e5e5e5] to-[#e5e5e5]">
                <div className="w-[95%] h-[60px] border-b-2 border-[rgba(2,6,12,0.1)]">
                  {
                    RestaurantId.map(({card:{card: {text,imageId}}},index)=>(
                      <div key={index} className="flex items-center justify-start gap-7">
                        <img className="h-[35px]" src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt="" />
                        <p className="text-black/60 font-bold mt-2">{text[0]}</p>
                      </div>
                    ))
                  }
                </div>
                <div className="w-[95%] h-[120px] flex flex-col justify-center border-b-2 border-[rgba(2,6,12,0.1)]">
                  {
                    RestaurantAddRes.map(({card: {card: {completeAddress,name,area}}},index)=>(
                      <div key={index} className="" >
                      <p className="text-black/60 font-black text-[18px]">{name}</p>
                      <p className="text-[rgba(2,6,12,0.5)] font-bold">(Outlet:{area})</p>
                      <p className="flex items-center gap-2 mt-3 text-black/40 font-bold"><MdLocationPin size={30} />{completeAddress}</p>
                      
                      </div>
                    ))
                  }
                  </div>  
              </div>
              { CardLength.length > 0 ? (<Link to={'/cart'}> 
              <div
              className={`fixed bottom-0 left-99 right-0 cursor-pointer w-[50%] bg-[#21A179] text-white flex justify-between items-center px-6 py-3 font-semibold transition-all duration-300 ${
                visible ? "translate-y-0" : "translate-y-full"
                }`}>
                  <p>{CardLength.length} items added</p>
                  
                  <button className="flex cursor-pointer  items-center gap-2">
                    VIEW CART <MdShoppingBag size={18} /></button>
                 
                    </div></Link>) : ""
 
              }
                {(<div className={`fixed inset-0 flex justify-center items-center  transition-transform duration-300 ease-out ${showPopup ? "translate-y-0" : "translate-y-full"}`}
                style={{ pointerEvents: showPopup ? "auto" : "none" }}>
                  <div className="h-[230px] w-[500px] flex flex-col p-8 gap-2 bg-white shadow-[0_0_30px_rgba(0,0,0,0.4)]">
                    <div>
                      <h1 className="text-2xl font-black">Items already in cart</h1>

                    </div>
                    <div className="text-[18px] text-[#02060ccc]">
                      <p>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>

                    </div>
                   <div className="flex items-center justify-between gap-5">
                     <button onClick={()=>setshowPopup(false)} className="text-[#1ba672] font-bold text-[22px] w-[250px] h-[50px]
                      border-2 border-[#1ba672] cursor-pointer ">NO</button>
                    <button onClick={()=>{
                      dispatch(clearCart())
                      setshowPopup(false);
                      
                    }} className="bg-[#1ba672] text-white font-bold cursor-pointer w-[250px] h-[50px]">YES, START AFRESH</button>
                   </div>

                    </div>
                  </div>
                )}

               
                

              </div>     
        </div> 
        
    </div>
  )  
}

const MenuCard = ({card, resInfo})=>{

  let hello = false

  if (card["@type"]) {
    hello = true
    
  }

  const [IsOpen, setIsOpen] = useState(hello)


  const Toggle = ()=>{
    setIsOpen((prev)=>!prev)
    
  }

  if (card.itemCards) {
    const {title,itemCards}  = card
    return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-[24px] text-black font-black pb-7 pt-6">{title}({itemCards.length})</h1>
        <RiArrowUpSLine size={30} className={`cursor-pointer transition-transform duration-0 ${IsOpen ? "rotate-0" : "rotate-180"}`} onClick={Toggle} />
      </div>
      {
        IsOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />
      }
      <div className="w-full bg-[rgba(2,6,12,0.1)] h-[16px]"></div>
      
      
    </div>
  )

    
}else{
  const {title,categories} = card
  return(
    <div>
      <h1 className="text-[24px] text-[rgba(0,0,0,0.95)] font-extrabold pb-7 pt-3">{title}</h1>
      {
        categories.map((data)=>(
          <MenuCard card={data}  resInfo={resInfo}/>

        ))
      }
    </div>
  )

}
}
const DetailMenu = ({itemCards,resInfo})=>{
  return(
    <div className="">
      {
        itemCards.map(({card:{info}},index)=>(
          
          <DetailmenuCard info={info} index={index} key={index} resInfo={resInfo} />

        ))
      }

    </div>
  )

}

const DetailmenuCard = ({info,resInfo})=>{
  
  
  
  
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
    offerTags = []  
  } = info;
  const [{ title, subTitle } = {}] = offerTags;
  const CardData = useSelector((state)=>state.cartSlice.cartItems)
  
  const {setvisible} = useContext(ToastContext)
  const {setshowPopup} = useContext(HandleQuatitis)
  const dispath = useDispatch()
  const getReasInfoFromLocal = useSelector((state)=>state.cartSlice.resInfo)
 
 
  
  
  


  const handleToCart = ()=>{

    console.log(resInfo.name);
    
    
    
    
    
    const isData = CardData.find((data)=>data.id === info.id);
    if (!isData) {
       if (getReasInfoFromLocal.name === resInfo.name || getReasInfoFromLocal.length === 0) {
        dispath(addToCart({resInfo,info}))
        setvisible(true)
        toast.success("food added to cart") 
      
       }
       else{
         setshowPopup(true); 
       }
    }
    else{
      toast.error("food already added")
    }  

    
    
  }


   

  return(
    <>
          <div  className="">
            
                <div className="flex flex-col w-full ">
                {
                  <div className="">
          
                  <div className="relative w-full py-7 flex-wrap flex justify-between items-center border-b-1 border-[rgba(2,6,12,0.1)]">
                    <div className="w-[70%] flex flex-col">
                      <div className="flex items-center gap-2">
                         
                        
                        {vegClassifier === "VEG" ? <img src={veg} className="h-[25px] w-[26px]" alt="" />
                         : <img src={nonveg} className="h-[25px] w-[28px]" alt="" />
                        }
                        {text === "Bestseller" && (
                          <p className="text-[#FE6D5B] font-bold">✩┈•✦<span className="text-[19px] font-black">B</span>
                          <span className="font-bold">estseller</span>
                          </p>
                        )}
                      </div>
                      <h3 className="text-[22px] font-bold text-[rgba(2,6,12,0.92)]">{name}</h3>
                      {finalPrice ? (
                        <p className="text-[18px] font-black flex items-center gap-1">
                        {defaultPrice ? (
                          <span className="text-[#02060c99] line-through decoration-[#02060c99]">
                            ₹ {defaultPrice/100}
                            </span>) :
                             (<span className="text-[#02060c99] line-through decoration-[#02060c99]">₹ {price/100}
                            
                            </span>)
                        }
                        <span>₹ {finalPrice/100}</span><AiFillTag size={15} className="text-green-700" />
                       
                        </p>) : (price ? (
                          <p className="text-[18px] font-black flex items-center gap-2">₹ {price/100}
                           {title && (<span className="text-[#02060c99] text-[15px] font-bold">{title.toUpperCase()}{subTitle}</span>)
                        }
                        </p>) : (
                        <p className="text-[18px] font-black flex items-center gap-2">₹ {defaultPrice/100}</p>))}
                        {rating && (
                          <p className="text-[5px] flex py-2 items-center">
                            <FaStar size={15} className={`text-[20px] rounded-full ${rating >= 3 ? "text-green-700" : "text-[rgb(230,164,8)]"}`} />
                              <span className={`text-[15px] font-black ${rating >= 3 ? "text-green-700" : "text-[rgb(230,164,8)]"}`}>
                                {rating}</span><span className="text-[15px] font-black">({ratingCountV2})</span>
                          </p>)}
                          <p className="text-[#02060c99] text-[20px] line-clamp-2 font-[500]">{description}</p>
                          </div>
                          <div className={`w-[30%] flex justify-center flex-col ${imageId ? "items-end" : "items-center"} `}>
                            <div className="relative flex flex-col items-center">
                              {imageId && (<img className={`h-[150px] w-[160px] object-cover rounded-2xl ${nextAvailableAtMessage ? "grayscale" : ""}`} 
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt="" />)
                              }
                              <div  className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
                              {nextAvailableAtMessage ? (
                                <button  className={`${imageId ? "" : "ml-15"} bg-white text-black rounded-[8px] text-[12px] hover:bg-[#c0c0c0] duration-200 font-black  border border-[#c0c0c0] w-[100px] h-[40px] whitespace-normal break-words`}>
                                  {nextAvailableAtMessage}
                                </button>) : (
                                  <button  onClick={handleToCart}  className={`bg-white text-green-600 px-9 py-1 rounded-[8px] text-[20px] hover:bg-[#c0c0c0] duration-200 ${imageId ? "" : "ml-18"}  font-black border border-[#c0c0c0] cursor-pointer`}>ADD
                                </button>
                                ) 
                                  
                                
                              }
                              </div>
                          </div>
                    </div>
                  </div>
                  
                </div>
              }
                
                </div>
                
                
              </div>
              </>
              
             
  )

}



export default RestaurentMenu

