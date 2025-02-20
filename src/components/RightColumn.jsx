'use client'

import { getDiscountedPricePercentage } from "../../utils/helper";
import { useState, useEffect, useCallback  } from "react";
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch} from "react-redux";
import { addToCart } from "@/app/store/cartSlice";







const RightColumn = ({product}) => {
    const p = product?.data[0]
    const colors=[...new Set(p.product_variations.map(item =>item.colors[0].colorname))]

    
    const [selectedColor, setSelectedColor] = useState(null);
    const [size, setSize]=useState(null);



    useEffect(()=>{
        getSizeForColor();
    }, [selectedColor]);
    
    const getSizeForColor=()=>{
        const matchingObjects = p.product_variations.filter(item => item.colors[0].colorname === selectedColor);        
        const sizeNames = [...new Set(matchingObjects.map(item =>item.sizes))]
        setSize(sizeNames);
    }




    const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch()
    const notify=()=> {
        toast.success('Success. Check your Cart', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    return (
        
        // <Provider store={store}>
            <div className='flex-[1] py-3'>
            <ToastContainer/>
                {/* Product Title */}
                <div className='text-[34px] font-semibold mb-2 leading-tight'>
                    {p.name}
                </div>
                {/* Product Subtitle */}
                <div className='text-lg font-semibold mb-5'>
                    {p.subtitle}
                </div>
                {/* Product Price */}
                <div className='flex items-center text-black/[0.5]'>
                    <p className='mr-2 text-lg font-semibold'>Rs. {p.Price}</p>

                    {p.original_price && (
                    <>
                        <p className='text-base font-medium line-through'>Rs. {p.original_price}</p>
                        <p className='ml-auto text-base font-medium text-green-500'>{getDiscountedPricePercentage(p.original_price, p.Price)}% off</p>
                    </>
                    )}
                    
                </div>
                <div className='text-md font-medium text-black/[0.5]'>
                    incl. of taxes
                </div>
                <div className='text-md font-medium text-black/[0.5] mb-20'>
                    {`(Also includes all applicable duties)`}
                </div>


                {/* Product Size Heading Start */}
                {p?.product_variations.length ===0 ?(<div className='text-red-600 mt-1 h-10 font-bold text-center'>Out of stock</div>) : 
                (<div>
                <div className="mb-10">             

                    {/* HEADING START */}
                    <div className='flex justify-between mb-2'>
                            <div className='text-md font-semibold'>Color Select</div> 
                            
                    </div>
                    {/* HEADING END */}
                

                    {/* Product Color Heading Start */}
                    <div className='grid grid-cols-4 gap-2'>
                    
                        {colors.map((item, i)=>(
                                <div 
                                    key={i} 
                                    className={`border rounded-md text-center py-3 font-medium hover:border-black
                                    } ${
                                        selectedColor===item
                                            ? "border-black"
                                            : ""
                                    }`}
                                    onClick={()=>{
                                        setSelectedColor(item);                                     
                                        // handleColorChange;                                 

                                    }}
                                >
                                    {item}
                                    
                                </div>
                            ))}
                            
                                
                    </div>
                    {/* Product Color End */}
                {/* </div> */}
                <div className='mb-10'>
                {size && size.length >0 && (
                    <>
                        {/* HEADING START */}
                        <div className='flex justify-between mb-2'>
                            <div className='text-md font-semibold'>Size Select</div> 
                            <div className='text-md font-medium text-black/[0.5] cursor-pointer'>Select Guide</div>
                        </div>
                        {/* HEADING END */}
                        {/* Product SIZE START */}
                        <div id="sizesGrid" className='grid grid-cols-4 gap-2'>
                        
                            {size.map((item, i)=>(
                                <div 
                                    key={i} 
                                    className={`border rounded-md text-center py-3 font-medium hover:border-black ${
                                        selectedSize===item[0].sizename
                                            ? "border-black"
                                            : ""
                                    }`}
                                    onClick={()=>{
                                        setSelectedSize(item[0].sizename);
                                        setShowError(false);
                                    }}
                                >
                                    {item[0].sizename}
                                </div>
                            ))}

                            
                        </div>
                    </>
                )}
                    {/* Show errro */}                
                    {showError && <div className='text-red-600 mt-1'>Select Color and Size</div>}

                    {/* Product Size End */} 
                </div>
                
                {/* Add to cart Button Strat*/}
                <button 
                    className='w-full py-4 rounded-full bg-black text-white text-lg font-medium
                    transition-transform active:scale-95 mb-3 hover:opacity-75' 
                    onClick={() => {                      
                        if (!selectedSize) {
                            setShowError(true);
                            document.getElementById("sizesGrid").scrollIntoView({
                                block: "center",
                                behavior: "smooth"
                            });
                        } else {     
                            const uniqueId = `${p.id}-${selectedColor}-${selectedSize}`; // Unique ID
                    
                            dispatch(
                                addToCart({
                                    ...p,
                                    id: uniqueId, // Override ID with unique variation ID
                                    selectedSize,
                                    oneQuantityPrice: p.Price,
                                    selectedColor
                                })
                            );                       
                            notify();
                        }
                    }}
                    >
                        Add to cart
                </button>
                {/* Add to cart button end */}
                </div>
                {/* )} */}

                {/* Wish list button Start */}
                <button className='w-full py-4 rounded-full border border-black text-lg
                font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10'>
                    Wish List
                </button>
                {/* Wish list button end */}
                
                <div className='text-lg font-bold mb-5'>
                    Product Detail
                </div>
                <div className='text-md mb-5'>
                {p?.description?.map((item, i)=>(
                            
                    <div key={i} >{item.children[0].text}</div>
                ))}
                                

                </div>
                </div>

            
        
                )}</div>
    // </Provider>
    


        

        
    )
}

export default RightColumn