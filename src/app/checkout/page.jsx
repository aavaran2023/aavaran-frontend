'use client'
import React, { useMemo, useState } from 'react'
import { useSelector } from "react-redux";
import CartItem from '@/components/CartItem'
import { postDataToApi } from "../../../utils/postapi";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useRouter } from "next/navigation";
import {sendTelegramMessage} from '../../../utils/sendTelegramMessage';

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const router = useRouter();
  const SubTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.Price * val.quantity, 0);
  }, [cartItems]);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Move handleSubmit inside the component
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.country || !formData.address || !formData.city) {
        alert("Please fill in all required fields.");
        return;
    }

    try {
        const requests = cartItems.map((item) => {
            const payload = {
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email || undefined,  // Remove empty string
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                region: formData.country,
                postalcode: formData.zipCode ? Number(formData.zipCode) : undefined,  // Convert to number or remove
                productname: item.name,
                color: item.selectedColor,
                size: item.selectedSize,
                quantity: item.quantity,
                price: item.Price * item.quantity,
            };

            return postDataToApi("/api/orders", payload);
            
        });

        await Promise.all(requests);
        await cartItems.map((item) => {
        sendTelegramMessage(
          `🛍 *New Order Placed!*\n\n👤 Name: ${formData.firstName} ${formData.lastName}\n📞 Phone: ${formData.phone}\n📍 Address: ${formData.address}, ${formData.city}, ${formData.country}\n🛒 Items name: ${item.name} \n Color:${item.selectedColor} \n Size: ${item.selectedSize} \n Quantity: ${item.quantity} \n 💰Total: Rs ${item.Price*item.quantity}`
        )});
        setIsPopupOpen(true);

    } catch (error) {
        alert("Failed to place order: " + error.message);
    }
};


  return (
    <div>
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-md rounded-lg mt-16">
      <h2 className="text-2xl font-semibold mb-6 text-center">User Information Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email (Optional)</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-3 border rounded" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-3 border rounded" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-3 border rounded" />
        </div>
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">Delivery Details</h3>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Country/Region</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} required className="w-full p-3 border rounded" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full p-3 border rounded" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full p-3 border rounded" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Zip / Postal Code (Optional)</label>
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full p-3 border rounded" />
        </div>
        <div className='col-span-full'>
          <div className='flex-[2]'>
            <div className='text-lg font-bold mb-4'>Cart Items</div>
            <div className='space-y-4'>
              {cartItems.map((item, i) => (
                <CartItem key={i} data={item} />
              ))}
            </div>
          </div>
          <div className='flex-[1]'>
            <div className='p-5 bg-gray-100 rounded-xl'>
              <div className='flex justify-between mb-4'>
                <div className='uppercase text-md md:text-lg font-medium text-black'>
                  SubTotal
                </div>
                <div className='text-md md:text-lg font-medium text-black'>
                  Rs {SubTotal}
                </div>
              </div>
              <div className='text-sm md:text-md border-t pt-4 text-gray-600'>
                The subtotal reflects the total price of your product, including duties and taxes, before any applicable discounts. It does not include delivery costs and transaction fees.
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 col-span-2'>
          Submit
        </button>
      </form>
      

    </div>
    {/* Popup for successful order placement */}
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
};

export default Checkout;
