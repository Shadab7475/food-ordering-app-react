// import React, { useContext, useState } from 'react'
// import veg from "../assets/ChatGPT Image Sep 13, 2025, 10_28_59 AM.png"
// import nonveg from "../assets/ChatGPT Image Sep 13, 2025, 10_20_34 AM.png"
// import { RiArrowUpSLine } from "react-icons/ri";
// import { AiFillTag } from "react-icons/ai";
// import { FaStar } from "react-icons/fa";
// import {  HandleQuatitis, ToastContext } from './Context';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../utilsh/cartSlice';

// const Categories = ({title,categories,resInfo}) => {
//     const [isopen, setIsopen] = useState(Array(categories.length).fill(false))
//     const CardData = useSelector((state)=>state.cartSlice.cartItems)
//     const dispath = useDispatch()
//     const getReasInfoFromLocal = useSelector((state)=>state.cartSlice.resInfo)
//      const {setvisible} = useContext(ToastContext)
//       const {setshowPopup} = useContext(HandleQuatitis)

//     const toggle = (index)=>{
//         setIsopen((prev)=>{
//           const updated = [...prev];
//           updated[index] = !updated[index]
//           return updated
//         })
//     }

//   return (
//       <div className="">
//            <div className="">
//              <h1 className="text-[24px] text-[rgba(0,0,0,0.95)] font-extrabold pb-7 pt-3">{title}({categories.length})</h1>
             
//            </div>
//            <div className="flex flex-col w-full">
//             {
//             categories.map(({itemCards,title},index)=>(
              
              
//             <div key={index} className="">
             
//               <div className="flex justify-between border-b-1 items-center border-[rgba(2,6,12,0.1)]">
//                 <h1 className='text-[20px] text-[#1F2937] font-bold pb-7 pt-2'>{title}({itemCards.length})</h1>
//                 <RiArrowUpSLine size={30} className={`cursor-pointer transition-transform duration-0 ${isopen[index] ? "rotate-0" : "rotate-180"}`} onClick={()=>toggle(index)} />
//               </div>
//               <div>
                
//                 {
//                 isopen[index] && <div className="">
//                   {
//                   itemCards.map(({card:{info}})=>{
//                     const {
//                       name,imageId,description,nextAvailableAtMessage, offerIds ,defaultPrice,finalPrice,price ,itemAttribute: {vegClassifier},ribbon:{text},ratings:{aggregatedRating:{rating,ratingCountV2}},
//                       offerTags = []
//                     } = info

//                     const [{ title, subTitle } = {}] = offerTags;
//                       const HandleToCart = ()=>{
//                        const isData = CardData.find((data)=>data.id === info.id);
//                            if (!isData) {
//                               if (getReasInfoFromLocal.name === resInfo.name || getReasInfoFromLocal.length === 0) {
                               
//                                dispath(addToCart({resInfo,info}))
//                                setvisible(true)
//                               }
//                               else{
//                                 setshowPopup(true); 
//                               }
//                            }
//                            else{
//                              alert("Item is Added")
//                            } 
//                     }


//                     return (
                    
                   
//                   <div key={index} className="relative w-full py-7 flex-wrap flex justify-between items-center border-b-1 border-[rgba(2,6,12,0.1)]">
                    
//                     <div className="w-[70%] flex flex-col">
//                       <div className="flex items-center gap-2">
//                         {vegClassifier === "VEG" ? <img src={veg} className="h-[25px] w-[26px]" alt="" />: <img src={nonveg} className="h-[25px] w-[28px]" alt="" />
//                         }
//                         {text === "Bestseller" && (
//                           <p className="text-[#FE6D5B] font-bold">✩┈•✦<span className="text-[19px] font-black">B</span><span className="font-bold">estseller</span></p>)}
//                       </div>
//                           <h3 className="text-[22px] font-bold text-[rgba(2,6,12,0.92)]">{name}</h3>
//                           {
//                           finalPrice ? (<p className="text-[18px] font-black flex items-center gap-1">
//                             {defaultPrice ? (<span className="text-[#02060c99] line-through decoration-[#02060c99]">₹ {defaultPrice/100}</span>) :(<span className="text-[#02060c99] line-through decoration-[#02060c99]">₹ {price/100}</span>)
//                             }
//                           <span>₹ {finalPrice/100}</span><AiFillTag size={15} className="text-green-700" />
//                           {offerIds && (<span className="text-[#02060c99] text-[15px] font-bold">25% OFF</span>)}</p>) : (price ? (<p className="text-[18px] font-black flex items-center gap-2">₹ {price/100}
//                             {title && (<span className="text-[#02060c99] text-[15px] font-bold">{title.toUpperCase()}{subTitle}</span>)
//                         }
//                           </p>) : (
//                           <p className="text-[18px] font-black flex items-center gap-2">₹ {defaultPrice/100}</p>))}
//                           {rating && (<p className="text-[5px] flex py-2 items-center"><FaStar size={15} className={`text-[20px] rounded-full ${rating >= 3 ? "text-green-700" : "text-[rgb(230,164,8)]"}`} /><span className={`text-[15px] font-black ${rating >= 3 ? "text-green-700" : "text-[rgb(230,164,8)]"}`}>
//                             {rating}</span><span className="text-[15px] font-black">({ratingCountV2})</span></p>)
//                           }<p className="text-[#02060c99] text-[20px] line-clamp-2 font-[500]">{description}</p>
//                     </div>
//                     <div className={`w-[30%] flex justify-center flex-col ${imageId ? "items-end" : "items-center"} `}>
//                       <div className="relative flex flex-col items-center">
//                         {imageId && (<img className={`h-[150px] w-[160px] object-cover rounded-2xl ${nextAvailableAtMessage ? "grayscale" : ""}`} 
//                         src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`} alt="" />)
//                         }
//                         <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">{nextAvailableAtMessage ? (
//                           <button className="bg-white text-black rounded-[8px] text-[12px] hover:bg-[#c0c0c0] duration-200 font-black border border-[#c0c0c0] w-[100px] h-[40px] whitespace-normal break-words">{nextAvailableAtMessage}
//                           </button>) : (<button onClick={HandleToCart} className={`bg-white text-green-600 px-9 py-1 rounded-[8px] text-[20px] hover:bg-[#c0c0c0] duration-200 ${imageId ? "" : "ml-18"}  font-black border border-[#c0c0c0] cursor-pointer`}>ADD</button>)
//                     }
                    
//                     </div>
                  
//                 </div>
//                     </div>
//                   </div>)})}
//                 </div>
//                 }
//               </div>
//             </div>))}
            
//             <div className="h-4 w-full bg-[rgba(2,6,12,0.1)]"></div>
            
//           </div>

        
//       </div>
      
//   )
// }

// export default Categories