import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const reducer = combineReducers({
    cart: cartSlice,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Disables serializable check
    }),
})

export const persistor = persistStore(store) // ✅ Persistor setup for redux-persist
export default store
