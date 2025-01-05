import React, { useEffect } from "react";
import { useCart } from "./CartContext";

const Cart = ({ customerId }) => {
    const { state, fetchCartItems, addItemToCart, removeItemFromCart, clearCart } = useCart();

    useEffect(() => {
        fetchCartItems(customerId);
    }, [customerId, fetchCartItems]);

    const handleAddItem = () => {
        const newItem = {
            cartId: null,
            customerId,
            productCode: "P001",
            productName: "Example Product",
            productPrice: 1000,
            quantity: 1,
        };
        addItemToCart(newItem);
    };

    const handleRemoveItem = (productCode) => {
        removeItemFromCart(customerId, productCode);
    };

    const handleClearCart = () => {
        clearCart(customerId);
    };

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {state.items.map(item => (
                    <li key={item.productCode}>
                        {item.productName} - {item.quantity} x {item.productPrice}₩
                        <button onClick={() => handleRemoveItem(item.productCode)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: {state.total}₩</h3>
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={handleClearCart}>Clear Cart</button>
        </div>
    );
};

export default Cart;
