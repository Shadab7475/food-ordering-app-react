  import React, { useContext, useEffect, useState } from 'react'
  import { PiCaretDown } from "react-icons/pi";
  import { MdClose } from "react-icons/md";
  import { MdMyLocation } from "react-icons/md";
  import { PiClockCounterClockwiseFill } from "react-icons/pi";
  import { IoSearch } from "react-icons/io5";
  import { PiSuitcaseSimple } from "react-icons/pi";
  import { CiDiscount1 } from "react-icons/ci";
  import { FaHandsHelping } from "react-icons/fa";
  import { FaUserAlt } from "react-icons/fa";
  import { FiShoppingCart } from "react-icons/fi";
  import {  Link, Outlet } from 'react-router-dom';
  import { Coordinates } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { toogleLoginBar, toogleSearchBar } from '../utilsh/ToogleSlice';
import ShigninBtn from './ShigninBtn';
  const Header = () => {

    // const [togle, settogle] = useState(false);
    
    const [SearchRes, setSearchRes] = useState([])
    const [SearchData, setSearchData] = useState("")
    const [resentSearch, setresentSearch] = useState(()=>{
      const seved = localStorage.getItem("resentSearch")
      return seved ? JSON.parse(seved) : []
    })
    const [Address, setAddress] = useState(()=>{
      return localStorage.getItem("Address") || "mumbai";
    })
    const {setCoord} = useContext(Coordinates);
    // const {CardData} = useContext(CardContext)


    const togle = useSelector((state)=>state.toogleSlice22.searchBarToogle)
    const loginToogle = useSelector((state)=>state.toogleSlice22.loginToogle)
    
    const dispatch = useDispatch()
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const CardData = useSelector((state)=>state.cartSlice.cartItems)
    const userData = useSelector((state)=>state.authSlice.userData)
   
    
    
    
    const showTogle = ()=>{
      dispatch(toogleSearchBar())
      
    }

    const loginTogle = ()=>{
      dispatch(toogleLoginBar())
    }

    useEffect(() => {
      localStorage.setItem("resentSearch",JSON.stringify(resentSearch))
    }, [resentSearch])
    

    useEffect(() => {
      localStorage.setItem("Address",Address)
      
    }, [Address])
    

    useEffect(() => {
      document.body.classList.toggle("no-scroll", togle);
    }, [togle]);
    useEffect(() => {
      document.body.classList.toggle("no-scroll", loginToogle);
    }, [loginToogle]);

    

    const Links = [
     
      {
        icon: <IoSearch className='text-2xl'/> ,
        name : "Search",
        path : "/search"
      },
     
     
      {
        icon: <FaUserAlt className='text-2xl'/> ,
        name : "Sign In",
        path : "/sign"
      },
      {
        icon: <FiShoppingCart className='text-[40px]'/> ,
        name : "Cart",
        path : "/cart"
      },
      
    ]

    const searchResult = async(val)=>{
      if (val === "") return
      const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`)
      const data = await res.json()
      
      setSearchRes(data.data);
      
      
    }

    const FetchLatandLat = async(id)=>{
      if (id === "") return
      
      const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
      const data = await res.json()
      
      
      setCoord({
        lat: data.data[0].geometry.location.lat,
        lng: data.data[0].geometry.location.lng,
        
      })
      // hideTogle()
      setSearchData("")

      setAddress(data.data[0].formatted_address);
        
    }

    const HandleSelect  = (item)=>{
  
      setresentSearch((prev)=>{
        const filterd = prev.filter((x)=> x.place_id !== item.place_id);
        return [item, ...filterd].slice(0, 5);
      }) 
    }
    return (
      <>
      <div className='fixed top-0 left-0 w-full h-screen z-[9999] black-overlay transition-opacity duration-300' 
      onClick={showTogle}
       style={{
        opacity : togle ? 1 : 0,
        visibility: togle ? "visible" : "hidden"
      }}>
        <div onClick={(e)=>{
          e.stopPropagation()
        }} className='bg-white h-full w-[530px] absolute duration-[500ms] ease-in-out z-40 transition-all' style={{
          left: togle ? "0%" : "-100%"
        }}>
          <div className='h-screen w-full flex  items-center flex-col z-40 overflow-y-auto '>
            <div className='sticky top-0 pt-10 pb-6 z-50 bg-white'>
                <div className='mb-7'><MdClose className='text-[30px]'
                onClick={showTogle}
                 /></div>
              <div className=' sticky top-0 z-50 bg-white border-1 border-[rgba(2,6,12,0.3)] p-4 w-[400px] transition-shadow duration-200 focus-within:shadow-[0_0_10px_rgba(0,0,0,0.5)]'>
                <input type="text" placeholder='Search for area, Street name' className='text-[rgba(2,6,12,0.5)] border-none outline-none text-[20px] w-[400px]' value={SearchData} onChange={(e) => {setSearchData(e.target.value);searchResult(SearchData);}} />
              </div>
              </div>
            <div className='m-10 gap-10 flex flex-col  '>
              
              <div className='overflow-y-auto h-[calc(100%-64px)] p-5'>
                <ul>
                  {
                    SearchRes.map((item,index)=>(
                      <div className='flex p-2  mt-2 group'>
                      <MdMyLocation className='text-[22px] mt-4'/>
                      <Link to={"/"}>
                      <li className='w-full p-5 border-black border-b-1 border-dashed hover:text-orange-500 cursor-pointer text-[17px] font-[700] text-[#02060c]' onClick={()=>{FetchLatandLat(item.place_id);setSearchRes([]);HandleSelect(item); showTogle()}} key={index}>{item?.structured_formatting?.main_text} <ul className='text-[14px] font-[700]  text-[rgba(2,6,12,.5)]'>{item?.structured_formatting?.secondary_text}</ul></li>
                     </Link>
                      </div>
                    ))}
                </ul>
              </div>
              <div className='bg-white border-1 border-[rgba(2,6,12,0.3)] p-2 h-[120px] w-[400px] flex justify-start items-center group cursor-pointer'>
                <div className='w-[300px] h-[120px] flex justify-start items-center gap-4 '>
                  <div className=' h-[40px] text-[rgba(2,6,12,0.6)] '><MdMyLocation className='text-[25px]'/></div>
                  <div>
                    <div className='text-black group-hover:text-orange-500 font-bold font-serif custom-text text-2xl'><a href="https://www.google.com/">Get Current Location</a></div>
                    <div className='text-[18px] text-[rgba(2,6,12,0.5)] '>Using GPS</div>
                  </div>
                </div>
              </div>
              <div className=' border-1 border-[rgba(2,6,12,0.3)]  w-[400px] group '>
                <div className='text-[15px] flex mt-10 justify-center text-[rgba(2,6,12,0.5)] font-bold h-10'>RECENT SEARCHES</div>
                <div className='relative cursor-pointer flex ml-5 gap-2'>
                  <div className='  text-[rgba(2,6,12,0.7)] '>
                    {
                    resentSearch.slice(0, 5).map((item,index)=>(
                      <div key={index} className=' flex p-2 gap-2 '>
                        <div className='flex items-center'>
                          <PiClockCounterClockwiseFill className='text-[22px]'/>
                        </div>
                        <div className='border-b-1 group p-8 border-dashed border-black w-full'>
                          <Link to={"/"}>
                          <li className='cursor-pointer list-none hover:text-orange-500' onClick={()=>{FetchLatandLat(item.place_id);setSearchRes([]);HandleSelect(item);showTogle()}} key={index}><ul className='text-[17px] font-[700] text-[#02060c]'>{item?.structured_formatting?.main_text}</ul> <ul className='text-[14px] font-[700]  text-[rgba(2,6,12,.5)]'>{item?.structured_formatting?.secondary_text}</ul></li>
                          </Link>
                          </div>
                      </div>
                    ))}
                    </div>
                </div>
              </div>
            </div>
            

          </div>
          
          
        </div>

      </div>
       <div className='fixed top-0 left-0 w-full h-screen z-[9999] black-overlay transition-opacity duration-300' 
      onClick={loginTogle}
       style={{
        opacity : loginToogle ? 1 : 0,
        visibility: loginToogle ? "visible" : "hidden"
      }}>
        <div onClick={(e)=>{
          e.stopPropagation()
        }} className='bg-white h-full w-[530px] absolute duration-[500ms] ease-in-out z-40 transition-all' style={{
          right: loginToogle ? "0%" : "-100%"
        }}>
          <div className='h-screen w-full flex flex-col  gap-3 z-40 overflow-y-auto '>
            <div className='sticky top-0 pt-10 pb-6 z-50 bg-white'>
                <div className='ml-24' ><MdClose className='text-[30px]'
                onClick={loginTogle}/>
                 </div>
              </div>
              <div className='flex items-center justify-center gap-40'>
                <h2 className='text-2xl font-bold'>Login</h2>
                <img className='h-25 w-25' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy.f_auto.q_auto/image-login_btpq7r " alt="" />
              </div>
              <div className=' items-center flex-col justify-center flex'>
                <ShigninBtn />
                <p className="text-center text-gray-600 mt-4 w-[60%] text-sm leading-relaxed">
                  By clicking on Login, I accept the
                  <span className="text-orange-500 cursor-pointer"> Terms & Conditions </span>&
                  <span className="text-orange-500 cursor-pointer"> Privacy Policy</span>
                </p>
              </div>
          </div>
        </div>

      </div>
      <header className='fixed top-0 left-0 w-full h-[80px] bg-white z-50 shadow'>
          <div className='  mx-auto max-w-[1400px] flex items-center bg-wh justify-between gap-2'>
            
            <div className='w-[100px] fixed '>
              <Link to={"/"}>
              <img className='w-full'  src="/images/images (1).png" alt="" />
              </Link>
            </div>
            <div className=' ml-40 max-w-[300px]'>
              <p
            onClick={showTogle}
            className="flex cursor-pointer items-center group gap-1 p-2"
          >
            <span className=" group-hover:text-[#fc8019]  font-bold border-b-2 text-[16px] text-[rgba(2,6,12,.9)]">
              Other
            </span>
            <span className="group-hover:text-[rgba(2,6,12,.5)] text-[14px] ml-3 font-[500] text-[rgba(2,6,12,.7)] truncate ">
              {Address}
            </span>
            <PiCaretDown className="  ml-6 text-[#fc8019] text-[25px] font-black" />
          </p>
            </div>
            <nav className='flex list-none text-[20px] font-bold h-[80px] justify-end mr-10 group items-center gap-15 w-[900px] '>
              {Links.map((even,index)=>(

                even.name == "Sign In" ? 
                <div onClick={loginTogle}>
                <li key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className='relative flex items-center gap-2  py-4  cursor-pointer '>
                 {
                  even.name === "Cart" && <p className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" :""} text-[18px] top-[22px] font-black absolute ${CardData.length > 9 ? "left-4" : "left-5"} number-text text-[#4a7212]`}>{CardData.length > 0 ?  CardData.length : ""}</p>
                }
                    <i className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" : even.name === "Cart" && CardData.length > 0 ? "text-[#1ba672]" : ""}  `}>{even.icon}</i>
                  
                  <p className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" : ""}  `} >{userData ? userData.name.split(" ")[0] : even.name }</p>
                 
              </li>
                </div>
                :
                 <Link to={even.path}>
                <li key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className='relative flex items-center gap-2  py-4  cursor-pointer '>
                 {
                  even.name === "Cart" && <p className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" :""} text-[18px] top-[22px] font-black absolute ${CardData.length > 9 ? "left-4" : "left-5"} number-text text-[#4a7212]`}>{CardData.length > 0 ?  CardData.length : ""}</p>
                }
               
                  <i className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" : even.name === "Cart" && CardData.length > 0 ? "text-[#1ba672]" : ""}`}>{even.icon}</i>
                  <p className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" : ""}whitespace-nowrap `}>{even.name}</p>
                 
                
                
              </li>
                </Link>
              ))}
            </nav>
            {/* <nav className='flex list-none text-[20px] font-bold h-[80px] justify-end mr-10 group items-center gap-15 w-[900px] '>
              {Links.map((even,index)=>(

                even.name == "Sign In" ? 
                <div onClick={loginTogle}>
                <li key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className='relative flex items-center gap-2  py-4  cursor-pointer '>
                 {
                  even.name === "Cart" && <p className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" :""} text-[18px] top-[22px] font-black absolute ${CardData.length > 9 ? "left-4" : "left-5"} number-text text-[#4a7212]`}>{CardData.length > 0 ?  CardData.length : ""}</p>
                }
               
                   
                    <i className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" : even.name === "Cart" && CardData.length > 0 ? "text-[#1ba672]" : ""}  `}>{even.icon}</i>
                  
                 
                 
              </li>
                </div>
                :
                 <Link to={even.path}>
                <li key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className='relative flex items-center gap-2  py-4  cursor-pointer '>
                 {
                  even.name === "Cart" && <p className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" :""} text-[18px] top-[22px] font-black absolute ${CardData.length > 9 ? "left-4" : "left-5"} number-text text-[#4a7212]`}>{CardData.length > 0 ?  CardData.length : ""}</p>
                }
               
                  <i className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" : even.name === "Cart" && CardData.length > 0 ? "text-[#1ba672]" : ""}`}>{even.icon}</i>
                  <p className={`${hoveredIndex === index ? "text-[#ff5200] transition-colors duration-100" : ""}whitespace-nowrap `}>{even.name}</p>
                 
                
                
              </li>
                </Link>
              ))}
            </nav> */}
          </div>
      </header>
      <Outlet />
      </>
    )
  }

  export default Header
