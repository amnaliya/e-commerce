import { createContext,useState } from "react";

export const Cartcontext=createContext();
 export function Cartprovider({children}){
 const[cart,setcart]=useState([])

 const clearcart=()=>{
    setcart([])
 }

 const addtocart=(product)=>{
   
   setcart((previous)=>{
    const existing=previous.find((item)=>item.id === product.id )
    // ?
    // {...item,quantity:item.quantity + 1} : item
    if(existing){
        return previous.map((item)=>(
            item.id === product.id ? {...item,quantity:item.quantity+1}:item
        ))
    }

    return [...previous,{...product,quantity:1}]
   });
 }

 const increasing=(id)=>{
    setcart((previous)=>
    previous.map((item)=>item.id ===id?
    {...item,quantity:item.quantity +1} : item))
    }
    const decreasing=(id)=>{
        setcart((previous)=>
        previous.map((item)=>item.id === id ?
        {...item,quantity: item.quantity > 1 ?item.quantity -1 :1}:item))
    }
    const removing=(id)=>{
      setcart((previous)=>previous.filter((item)=>item.id !== id))
    };

 return (
    <>
    <Cartcontext.Provider value={{cart,setcart,addtocart,increasing,decreasing,removing,clearcart}}>
        {children}
    </Cartcontext.Provider>
    </>
 )
 }

