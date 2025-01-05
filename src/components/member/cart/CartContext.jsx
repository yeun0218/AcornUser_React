import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const CartContext = createContext();

const initialState = {
    items: [], // 장바구니 항목 { cartId, customerId, productCode, productName, productPrice, quantity }
    total: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "SET_ITEMS":
            return {
                ...state,
                items: action.payload,
                total: action.payload.reduce((acc, item) => acc + item.productPrice * item.quantity, 0),
            };
        case "ADD_ITEM":
            return {
                ...state,
                items: [...state.items, action.payload],
                total: state.total + action.payload.productPrice * action.payload.quantity,
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(item => item.productCode !== action.payload.productCode),
                total: state.total - action.payload.productPrice * action.payload.quantity,
            };
        case "CLEAR_CART":
            return { ...state, items: [], total: 0 };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const fetchCartItems = async (customerId) => {
        try {
            const response = await axios.get(`/cart/items/${customerId}`);
            dispatch({ type: "SET_ITEMS", payload: response.data });
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    };

    const addItemToCart = async (item) => {
        try {
            await axios.post(`/cart/add`, item);
            dispatch({ type: "ADD_ITEM", payload: item });
        } catch (error) {
            console.error("Failed to add item to cart:", error);
        }
    };

    const removeItemFromCart = async (customerId, productCode) => {
        try {
            await axios.delete(`/cart/remove/${customerId}/${productCode}`);
            const item = state.items.find(item => item.productCode === productCode);
            dispatch({ type: "REMOVE_ITEM", payload: item });
        } catch (error) {
            console.error("Failed to remove item from cart:", error);
        }
    };

    const clearCart = async (customerId) => {
        try {
            await axios.delete(`/cart/clear/${customerId}`);
            dispatch({ type: "CLEAR_CART" });
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ state, fetchCartItems, addItemToCart, removeItemFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
