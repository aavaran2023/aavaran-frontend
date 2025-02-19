
'use client'
import CartItem from '@/components/CartItem'
import Image from 'next/image'
import Link from 'next/link'
import React, {useMemo, useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";



const Cart = () => {
  const {cartItems}=useSelector((state=>state.cart))
  const SubTotal=useMemo(()=>{
    return cartItems.reduce((total, val)=>total + (val.Price*val.quantity), 0)
  },[cartItems])

  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const goToCheckout = () => {
    // Set a flag in sessionStorage when the user clicks "Proceed to Checkout"
    sessionStorage.setItem("visitedCheckout", "true");
    router.push("/checkout"); // Navigate to checkout
  };

  useEffect(() => {
      setCartCount(cartItems.length);
  }, [cartItems]);

  return (
    <div className='w-full md:py-20'>
        <div className='w-full max-w-[1280px] px-5 md:px-10 mx-auto'>
          {cartCount > 0 && (
            <>
              {/* Heading and Paragraph start */}
              <div className='text-center max-w-[800px] mx-auto mt-8 md:mt-0'>
                <div className='text-[28p] md:text-[34px] mb-5 font-semibold leading-tight'>
                  Shopping Cart
                </div>
              </div>
              {/* Heading and paragraph end`` */}

              {/* Cart Content start*/}
              <div className='flex flex-col lg:flex-row gap-12 py-10'>
                {/* Cart Items start*/}
                <div className='flex-[2]'>
                  <div className='text-lg font-bold'>Cart Item</div>
                  {cartItems.map((item,i)=>(
                    <CartItem key={i} data={item}/>
                  ))}
                  
                </div>
                {/* Cart Item end */}

                {/* Cart Summary Start */}
                <div className='flex-[1]'>
                  <div className='text-lg font-bold'>Summary</div>

                  <div className='p-5 my-5 bg-black/[0.05] rounded-xl'>
                    <div className='flex justify-between'>
                      <div className='uppercase text-md md:text-lg font-medium text-black'>
                        SubTotal
                      </div>
                      <div className='text-md md:text-lg font-medium text-black'>
                        Rs {SubTotal}.
                      </div>
                    </div>
                    <div className='text-sm md:text-md py-5 border-t mt-5'>
                      The subtotal reflects the total price of your product, including duties and taxes,
                      before any applicable discounts. It does not include delivery costs and transaction fees.
                    </div>
                  </div>

                  {/* Button Start */}

                    <button className='w-full py-4 rounded-full bg-black text-white text-lg font-medium
                    transition-transform active:scale-95 mb-3 hover:opacity-75' onClick={goToCheckout} >
                      Checkout
                    </button>

                  {/* Button End */}
                </div>
                {/* Cart Summary End */}

              </div>
              {/* Cart Content end */}
            </>
          )}
          
          

          {/* ---------------------------This is Empty Screen--------------------------- */}

          {cartCount<1 &&(
            <div className='flex-[2] flex flex-col items-center pb-[50px] md:-mt-14'>
              <Image 
                src='/empty-cart.jpg' 
                width={300} 
                height={300}
                className='w-[300px] md:w-[400px]'
                alt='empty-cart'
              />
              <span className='text-xl font-bold'>
                Your Cart is empty
              </span>
              <span className='text-center mt-4'>
                Looks like you haven't added anything in your cart.
                <br/>
                Go ahead and expore top Categories.
              </span>
              <Link 
                href='/'
                className='py-4 px-8 rounded-full bg-black text-white text-lg font-medium
                transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8'
              >
                Continue Shopping
              </Link>
            </div>
            )}

        </div>
    </div>
  )
}

export default Cart