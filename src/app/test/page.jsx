'use client'
import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const router = useRouter();

    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
        >
          Open Popup
        </button>

        <Popup 
          open={isPopupOpen} 
          modal 
          closeOnDocumentClick={false} // Prevent closing by clicking outside
          lockScroll={true} // Prevent scrolling when popup is open
          overlayStyle={{
            backgroundColor: 'rgba(200, 200, 200, 0.8)',
          }}
        >
          <div className="p-6 bg-black shadow-2xl rounded-xl w-[350px] md:w-[600px] text-center">
            <img src="aavaran-white.png" className="w-[200px] md:w-[250px] block mx-auto mb-4" />
            <h2 className="text-xl text-white mt-3"> Thank you for Shopping</h2>
            <p className="mt-3 text-gray-400 text-sm">
              Your order has been placed successfully. You will receive a confirmation call shortly.
            </p>
            <button 
              onClick={() => {
                setIsPopupOpen(false);
              }} 
              className="mt-5 w-full bg-white text-black font-medium py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
              Continue Shopping
            </button>
          </div>
        </Popup>
      </div>
    );
}

export default Page;
