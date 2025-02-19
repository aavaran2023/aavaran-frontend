
import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    // addToCart:(state, action)=>{

    //     const item=state.cartItems.find((p)=>p.id===action.payload.id)
    //     console.log("start")
    //     console.log(item)
    //     console.log("start")
    //     if(item){
    //         item.quantity++;
    //         item.price = item.oneQuantityPrice * item.quantity

    //     }else{
    //         state.cartItems.push({...action.payload, quantity:1})
    //     }

    // },
    addToCart: (state, action) => {
        // Check if item with same id *and* selectedSize exists
        const item = state.cartItems.find(
            (p) => p.id === action.payload.id && p.selectedSize === action.payload.selectedSize
        );
    
        if (item) {
            // If item with same size exists, increase quantity
            item.quantity++;
            item.price = item.oneQuantityPrice * item.quantity;
        } else {
            // If it's a new size, add as a new cart item
            state.cartItems.push({ ...action.payload, quantity: 1 });
        }
    },
    // updateCart:(state, action)=>{
    //     state.cartItems = state.cartItems.map((p)=>{
    //         if(p.id ===action.payload.id) {
    //             if(action.payload.key==="quantity") {
    //                 p.price=p.oneQuantityPrice*action.payload.val
    //             }
    //             return{...p, [action.payload.key]: action.payload.val}
    //         }
    //         return p
    //     }) 
    // },
    updateCart:(state, action)=>{
        state.cartItems = state.cartItems.map((p)=>{
            if(p.id ===action.payload.id) {
                if(action.payload.key==="quantity") {
                    p.price=p.oneQuantityPrice*action.payload.val
                }
                return{...p, [action.payload.key]: action.payload.val}
            }
            return p
        }) 
    },
    
    
    removeFromCart:(state, action)=>{
        state.cartItems=state.cartItems.filter((p)=>p.id !=action.payload.id)
    }
  }
})

// Action creators are generated for each case reducer function
export const {  addToCart, updateCart, removeFromCart} = cartSlice.actions

export default cartSlice.reducer
