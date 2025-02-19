

import RightColumn from "../../../components/RightColumn";
import ProductDetailsCarousel from "../../../components/ProductDetailsCarousel";
import RelatedProducts from "../../../components/RelatedProducts";
import Wrapper from "../../../components/Wrapper";
import { fetchDataFromApi } from "../../../../utils/api"




export default async function Product({params}){
    const {slug}= await params
    // const product = await fetchDataFromApi(`/api/products?populate=*&[filters][slug][$eq]=${slug}`);  
    const product = await fetchDataFromApi(`/api/products?populate[image]=true&populate[Thumbnail]=true&populate[product_variations][populate][colors]=true&populate[product_variations][populate][sizes]=true&populate[product_variations][filters][quantity][$gt]=0&filters[slug][$eq]=${slug}`);     
   
    return(
        <div className='w-full md:py-[30px]'>

            <Wrapper>
                <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
                    {/* Left Column Start*/}
                    <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full
                    mx-auto lg:mx-0'>

                        <ProductDetailsCarousel product={product}/>
                    </div>

                    {/* Left Column End*/}

                    {/* Right Column Start*/}
                    <RightColumn product={product} />
                    {/* variants={variants} */}
                    {/*Right Column Start*/}
                </div>
                <RelatedProducts products={product}/>
                
            {/* </div> */}
        </Wrapper>
        </div>
        
    )
}







// import React from 'react'
// import Wrapper from '@/components/Wrapper'
// import { IoMdHeartEmpty } from 'react-icons/io'
// import ProductDetailsCarousel from '@/components/ProductDetailsCarousel'
// import RelatedProducts from '@/components/RelatedProducts'


// const ProductDetails = () => {
//   return (
//     <div className='w-full md:py-5'>
//         <Wrapper className=''>
//             <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
//                 {/* left column start */}
//                 <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
//                     <ProductDetailsCarousel/>
//                 </div>
//                 {/* left column end */}

//                 {/* right column start */}
//                 <div className='flex-[1] py-3'>
//                   {/* PRODUCT TITLE */}
//                   <div className="text-[34px] font-semibold mb-2 leading-tight">
//                     asdsad
//                   </div>

//                   {/* PRODUCT SUBTITLE */}
//                   <div className="text-lg font-semibold mb-5">
//                       aslkdbsad
//                   </div>
//                   {/* PRODUCT PRICE */}
//                   <div className="flex items-center">
//                     <p className="mr-2 text-lg font-semibold">
//                         MRP : &#8377;2700
//                     </p>
                    
//                 </div>

//                 <div className="text-md font-medium text-black/[0.5]">
//                     incl. of taxes
//                 </div>
//                 <div className="text-md font-medium text-black/[0.5] mb-20">
//                     {`(Also includes all applicable duties)`}
//                 </div>

//                 {/* PRODUCT SIZE RANGE START */}
//                 <div className="mb-10">
//                 {/* HEADING START */}
//                   <div className='flex justify-between md-2'>
//                     <div className='text-md font-medium text-black/[0.5] cursor-pointer'>Select Size</div>
//                     <div className='text-md font-medium text-black/[0.5] cursor-pointer'>Select Guide</div>
//                   </div>
//                 {/* HEADING END */}

//                  {/* SIZE START */}
//                  <div className="grid grid-cols-3 gap-2">
//                   <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>M</div>
//                   <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>L</div>
//                   <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-not-allowed bg-black/[0.1] opacity-50'>XL</div>
//                 </div>
//                 </div>

//                 {/* SHOW ERROR START */}
                
//                 <div className="text-red-600 mt-1">
//                         Size selection is required
//                     </div>
                
//                 {/* SHOW ERROR END */}

//                 {/* PRODUCT SIZE RANGE END */}

//                 {/* ADD TO CART BUTTON START */}
//                 <button
//                   className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
//                   // onClick={() => {
//                   //     if (!selectedSize) {
//                   //         setShowError(true);
//                   //         document
//                   //             .getElementById("sizesGrid")
//                   //             .scrollIntoView({
//                   //                 block: "center",
//                   //                 behavior: "smooth",
//                   //             });
//                   //     } else {
//                   //         dispatch(
//                   //             addToCart({
//                   //                 ...product?.data?.[0],
//                   //                 selectedSize,
//                   //                 oneQuantityPrice: p.price,
//                   //             })
//                   //         );
//                   //         notify();
//                   //     }
//                   // }}
//               >
//                   Add to Cart
//               </button>
//               {/* ADD TO CART BUTTON END */}

//               {/* WHISHLIST BUTTON START */}
//               <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
//                   Whishlist
//                   <IoMdHeartEmpty size={20} />
//               </button>
//               {/* WHISHLIST BUTTON END */}

//               <div>
//                 <div className='text-lg font-bold mb-5'>
//                   Product Detail
//                 </div>
//                 <div className='text-md mb-5'>
//                   Fee unbeatab e rom&e tee ox to t e Ina
//                   putt in a design ithat's pure early MJ: speed,
//                   class and laden with true early '90s touches
//                   like visible Air and a translucent rubber sole
//                   that continue to stand the test of time. This
//                   model fuses the strut of 1st MJ's championship
//                   with some of our best golf technology, helping
//                   you make a statement of confidence when it comes time to tame the</div>
//               </div>
//             </div>
                


//                 {/* right column end */}
//             </div>
//             {/* <RelatedProducts/> */}
            
//         </Wrapper>
        
      
//     </div>
//   )
// }

// export default ProductDetails
