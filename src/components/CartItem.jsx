'use client'

import { removeFromCart, updateCart } from "@/app/store/cartSlice";
import Image from 'next/image';
import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";


const CartItem = ({data}) => {
    const p=data;
    const pathname = usePathname()
    const dispatch=useDispatch();  

    const colors=[...new Set(p.product_variations.map(item =>item.colors[0].colorname))]

    
    const [selectedColor, setSelectedColor] = useState(p.selectedColor || colors[0]);
    
    
    const [size, setSize]=useState([]);


    // useEffect(()=>{
    //     console.log('selectedColor changed:', selectedColor);
    //     getSizeForColor();
    // }, [selectedColor]);
    useEffect(() => {
        const matchingObjects = p.product_variations.filter(item => item.colors[0].colorname === selectedColor);
        const sizeNames = [...new Set(matchingObjects.flatMap(item => item.sizes.map(size => size.sizename)))];
        setSize(sizeNames);
        console.log(size)
    }, [selectedColor, p.product_variations]);  // Trigger when selectedColor or product_variations changes

    
    // const getSizeForColor=()=>{
    //     const matchingObjects = p.product_variations.filter(item => item.colors[0].colorname === selectedColor);        
    //     const sizeNames = [...new Set(matchingObjects.map(item =>item.sizes))]
    //     setSize(sizeNames);
    // }
    // const getSizeForColor = () => {
    //     if (!selectedColor) return;  // Prevent running on initial render
    
    //     const matchingObjects = p.product_variations.filter(item => 
    //         item.colors[0].colorname === selectedColor
    //     );
    
    //     const sizeNames = [...new Set(matchingObjects.flatMap(item => item.sizes))]; // Flatten & remove duplicates
    
    //     setSize(sizeNames);  // Default to `p.size` if no match found
    // };



    const updateCartItem = (e, key)=> {
        let payload = {
            key,
            val: key==="quantity" ? parseInt(e.target.value) : e.target.value,
            id: data.id 
        }
        dispatch(updateCart(payload))
    }


    return (
        <div className='flex py-5 gap-3 md:gap-5 border-b'>
            {/* Image Start */}
            <div className='shrinl-0 aspect-square w-[50px] md:w-[120px]'>
                <Image
                    height={120}
                    width={120}
                    src={p.Thumbnail[0].url}
                    alt={p.name}/>
                
            </div>
            {/* Image End */}
            <div className='w-full flex flex-col'>
                <div className='flex flex-col md:flex-row justify-between'>
                    {/* Product Title */}
                    <div className='text-lg md:text-2xl font-semibold text-black/[0.8]'>
                        {p.name}
                    </div>
                    {/* Product Subtitle */}
                    <div className='text-sm md:text-md font-medium text-black/[0.5] block md:hidden'>
                        {p.subtitle}
                    </div>
                    {/* Product Price */}
                    <div className='text-sm md:text-md font-bold text-black/[0.5] mt-2'>
                        {p.Price}
                    </div>
                </div>
                {/* Product Subtitle */}
                <div className='text-sm md:text-md font-medium text-black/[0.5] hidden md:block '>
                    {p.subtitle}
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <div className='flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md'>
                        {/* Color Start */}
                        <div className='flex items-center gap-1'>
                            <div className='font-semibold text-[13px]'>Color:</div>
                            <div className='font-semibold text-[13px]'>{p.selectedColor}</div>
                            {/* <select 
                                className='hover:text-black'
                                value={p.selectedColor} // ✅ Use value here
                                onChange={(e) => {
                                    setSelectedColor(e); // ✅ Update state
                                    updateCartItem(e, "selectedColor");
                                    if(!size.includes(p.selectedSize)){
                                        updateCartItem(size[0], "selectedSize");
                                    } // ✅ Update Redux
                                    
                                }}
                            >
                                {colors.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select> */}
                        </div>
                        {/* Color End */}
                        {/* Size Start */}
                        <div className='flex items-center gap-1'>
                            <div className='font-semibold text-[13px]'>Size:</div> 
                            <div className='font-semibold text-[13px]'>{p.selectedSize}</div>
                            {/* <select 
                                className='hover:text-black'
                                // value={p.selectedSize}
                                onChange={(e) => updateCartItem(e, "selectedSize")}
                            >
                                {size.map((item, i) => (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                ))}
                                
                            </select> */}
                        </div>
                        {/* Size End */}


                        {/* Quantity Start */}
                        <div className='flex items-center gap-1'>
                            <div className='font-semibold'>Quantity:</div>
                            {/* <select 
                                className='hover:text-black'
                                onChange={(e)=>updateCartItem(e, "quantity")}
                            >
                                {Array.from({length:10}, (_, i) => i+1).map((q,i)=>{
                                    return(
                                        <option 
                                        value={q}
                                        key={i}
                                        selected={data.quantity===q}>{q}</option>
                                    )
                                })}
                                
                                
                            </select> */}
                            {pathname ==="/cart" &&(
                                <select 
                                    className='hover:text-black'
                                    value={data.quantity} // ✅ Use value instead of defaultValue
                                    onChange={(e) => updateCartItem(e, "quantity")}
                                >
                                    {Array.from({length: 10}, (_, i) => i + 1).map((q) => (
                                        <option key={q} value={q}>
                                            {q}
                                        </option>
                                    ))}
                                </select>) ||
                                (
                                    (data.quantity)
                                )
                                }
                        </div>
                        {/* Quantity end */}
                    </div>
                    {pathname === '/cart' &&(
                        <RiDeleteBin6Line 
                        onClick={()=>dispatch(removeFromCart({id: data.id}))}
                        className='cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]'></RiDeleteBin6Line>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CartItem


