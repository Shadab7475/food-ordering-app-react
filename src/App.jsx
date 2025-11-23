import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Body from './components/Body'
import {Route, Routes} from "react-router-dom"
import RestaurentMenu from './components/RestaurentMenu'
import {  Coordinates,  HandleQuatitis,  ItemQuantities, ToastContext, } from './components/Context'
import CardItem from './components/CardItem'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from './utilsh/cartSlice'

// localStorage.clear();




const App = () => {
  const [coord, setCoord] = useState(()=>{
    const seved = localStorage.getItem("coord")
    return seved ? JSON.parse(seved) : {lat:18.9821101,lng:72.826509}
  })
  // const [CardData, setCardData] = useState([])
  
  
 const [visible, setvisible] = useState(true)
 const [quantities, setquantities] = useState(()=>{
  const seved = localStorage.getItem("total");
  return seved ? JSON.parse(seved) : 1;
 })
 const [total, settotal] = useState([])
 const [showPopup, setshowPopup] = useState(false);

 useEffect(() => {
  localStorage.setItem("total",JSON.stringify(quantities));
 }, [quantities])

 const dispatch = useDispatch()

 




  // const Handle_from_localStorage = ()=>{
  //   let data = JSON.parse(localStorage.getItem("CardData")) || []
  //   setCardData(data)

  // }

  // useEffect(() => {
  //   Handle_from_localStorage()
  // }, [])

  const CardData = useSelector((state)=>state.cartSlice.cartItems)
 
  
  


  
 
  useEffect(() => {
    localStorage.setItem("coord", JSON.stringify(coord))
  }, [coord])



  const HandleAdd = (id)=>{
    
    
    setquantities((prev)=>({...prev,[id]:(prev[id] || 1)+1}))
    
  
  }


    const HandleRemoveCard = (i,id)=>{
     
    setquantities((prev)=>{  
      const current = prev[id] || 1
      if (current>1) {
        return {...prev,[id]:current-1} 
      }
      else{
        let UpdateData = [...CardData]
        UpdateData.splice(i,1);
        dispatch(deleteItem(UpdateData))
         const { [id]: _, ...rest } = prev;

         return rest ;
         
         

      }
    })
    
}

// const ClearCart = ()=>{
//   // setCardData([]);
//   dispatch(clearCart())
 
//  }


  
  
  return (
    <HandleQuatitis.Provider value={{HandleAdd, HandleRemoveCard,showPopup,setshowPopup }}>
    <ItemQuantities.Provider value={{quantities,setquantities, total, settotal}}>
    <ToastContext.Provider value={{visible,setvisible}} >
    {/* <CardContext.Provider value={{CardData,setCardData}} > */}
    <Coordinates.Provider value={{coord, setCoord}}>
    <Routes>
      <Route path='/' element={<Header/>}>
      <Route path='/' element={<Body/>}/>
      <Route path='restaurantMenu/:city/:id' element={<RestaurentMenu />}/>
      <Route path='/cart' element={<CardItem />}/>
      <Route path='/*' element={<h1 className='m-100'>coming....</h1>}/>     
      </Route>
    </Routes>
    </Coordinates.Provider>
    {/* </CardContext.Provider> */}
    </ToastContext.Provider>
    </ItemQuantities.Provider>
    </HandleQuatitis.Provider>
   
  )
}

export default App