import React, { createContext, useReducer, useContext, useState } from "react";
import axios from "axios";
import "../../../assets/styles/Popup"

const CartContext = createContext();

const initialState = {
    items: [], // 장바구니 항목 { cartId, customerShopid, productCode, productName, productPrice, quantity }
    total: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "SET_ITEMS":
            return {
                ...state,
                items: action.payload,
                total: action.payload.reduce(
                    (acc, item) => acc + item.productPrice * item.quantity,
                    0
                ),
            };
        case "ADD_ITEM":
            return {
                ...state,
                items: [...state.items, action.payload],
                total:
                    state.total +
                    action.payload.productPrice * action.payload.quantity,
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.cartId !== action.payload.cartId),
                total:
                    state.total -
                    action.payload.productPrice * action.payload.quantity,
            };
        case "CLEAR_CART":
            return { ...state, items: [], total: 0 };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [popup, setPopup] = useState(null); // 팝업 상태 관리

    const fetchCartItems = async (customerId) => {
        try {
            const response = await axios.get(`http://localhost:8080/cart/items/${customerId}`, {
                withCredentials: true,
            });
            dispatch({ type: "SET_ITEMS", payload: response.data });
        } catch (err) {
            console.error("Failed to fetch cart items", err);
        }
    };

    const addItemToCart = async (item) => {
        try {
            await axios.post("http://localhost:8080/cart/add", item, {
                withCredentials: true,
            });
            setPopup({
                message: "장바구니에 담겼습니다!",
                onConfirm: () => setPopup(null),
            });
        } catch (err) {
            console.error("Failed to add item to cart", err);
        }
    };

    const removeItemFromCart = async (cartId) => {
        const removedItem = state.items.find((item) => item.cartId === cartId);
        setPopup({
            message: `정말로"${removedItem.productName}"를 삭제하시겠습니까?`,
            onConfirm: async () => {
                try {
                    await axios.delete(`http://localhost:8080/cart/remove/${cartId}`, {
                        withCredentials: true,
                    });
                    dispatch({
                        type: "REMOVE_ITEM",
                        payload: removedItem,
                    });
                    setPopup(null);
                } catch (err) {
                    console.error("Failed to remove item from cart", err);
                }
            },
            onCancel: () => setPopup(null),
        });
    };

    const clearCart = async (customerId) => {
        setPopup({
            message: "Are you sure you want to clear the cart?",
            onConfirm: async () => {
                try {
                    await axios.delete(`http://localhost:8080/cart/clear/${customerId}`, {
                        withCredentials: true,
                    });
                    dispatch({ type: "CLEAR_CART" });
                    setPopup(null);
                } catch (err) {
                    console.error("Failed to clear cart", err);
                }
            },
            onCancel: () => setPopup(null),
        });
    };
    

    return (
        <CartContext.Provider
            value={{
                state,
                fetchCartItems,
                addItemToCart,
                removeItemFromCart,
                clearCart,
            }}
        >
            {children}
            {popup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>{popup.message}</p>
                        <div>
                            <button onClick={popup.onConfirm}>확인</button>
                            <button onClick={popup.onCancel}>취소</button>
                        </div>
                    </div>
                </div>
            )}
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
