import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import Popup from "../../../assets/styles/Popup";

const Cart = () => {
    const { state, fetchCartItems, removeItemFromCart, clearCart } = useCart();
    const [popup, setPopup] = useState(null); // 팝업 상태 관리

    // 세션 스토리지에서 customerId 가져오기
    const getCustomerIdFromSession = () => {
        return sessionStorage.getItem("accessToken"); // 로그인 시 저장한 customerId를 가져옵니다.
    };

    const customerShopid = getCustomerIdFromSession();

    useEffect(() => {
        if (customerShopid) {
            fetchCartItems(customerShopid);
        }
    }, [customerShopid, fetchCartItems]);

    const handleRemoveItem = (productCode) => {
        setPopup({
            message: "정말로 이 상품을 삭제하시겠습니까?",
            onConfirm: () => {
                removeItemFromCart(customerShopid, productCode);
                setPopup(null);
            },
            onCancel: () => setPopup(null),
        });
    };

    const handleClearCart = () => {
        setPopup({
            message: "장바구니를 비우시겠습니까?",
            onConfirm: () => {
                clearCart(customerShopid);
                setPopup(null);
            },
            onCancel: () => setPopup(null),
        });
    };

    return (
        <div>
            <h2>장바구니</h2>
            {popup && (
                <Popup
                    message={popup.message}
                    onConfirm={popup.onConfirm}
                    onCancel={popup.onCancel}
                />
            )}
            {state.items.length > 0 ? (
                <ul>
                    {state.items.map((item) => (
                        <li key={item.productCode}>
                            <span>{item.productName}</span> - {item.quantity} x {item.productPrice.toLocaleString()}₩
                            <button onClick={() => handleRemoveItem(item.productCode)}>삭제</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>장바구니가 비어 있습니다.</p>
            )}
            <h3>총 금액: {state.total.toLocaleString()}₩</h3>
            {state.items.length > 0 && (
                <button onClick={handleClearCart}>장바구니 비우기</button>
            )}
        </div>
    );
};

export default Cart;
