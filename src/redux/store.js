import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import productReducer from "./slice/productSlice";
import filterReducer from './slice/filterSlice';
import cartReducer from './slice/cartSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,

});

const store = configureStore({
    reducer: rootReducer,
    // Check why they did this. i've forgotten
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;