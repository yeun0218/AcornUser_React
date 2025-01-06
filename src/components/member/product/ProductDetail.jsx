import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Alert,FormControl } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../assets/styles/Product/ProductDetail.css";
import { useCart } from "../cart/CartContext";
import Popup from "../../../assets/styles/Popup"

function ProductDetail() {
    const { productCode } = useParams(); // URL에서 productCode 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이션
    const [product, setProduct] = useState(null); // 상품 데이터
    const [error, setError] = useState(null); // 에러 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [quantity, setQuantity] = useState(1); // 상품 수량
    const [totalPrice, setTotalPrice] = useState(0); // 총 상품금액
    const [isLiked, setIsLiked] = useState(false); // 좋아요 상태

    // 장바구니
    const { addItemToCart } = useCart();
    const [customerShopid, setCustomerShopid] = useState(null); // 사용자 Shop ID
    const [popup, setPopup] = useState(null);

    // 로그인 여부 확인
    const isLoggedIn = () => {
        // sessionStorage에서 "accessToken" 키가 존재하는지 확인
        return !!sessionStorage.getItem("accessToken");
    };

    // 상품 데이터 가져오기
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/product/${productCode}`
                );
                const fetchedProduct = response.data;
                setProduct(fetchedProduct);
                setTotalPrice(fetchedProduct.productPrice); // 초기 총 가격 설정
                setIsLoading(false); // 로딩 완료
            } catch (err) {
                setError("상품 정보를 불러오는 데 실패했습니다.");
                setIsLoading(false); // 로딩 완료
            }
        };

        fetchProduct();
    }, [productCode]);

    // 수량 증가
    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1);
        setTotalPrice((prev) => prev + product.productPrice);
    };

    // 수량 감소
    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
            setTotalPrice((prev) => prev - product.productPrice);
        }
    };

    // 수량 입력 핸들러
    const handleQuantityChange = (event) => {
        const inputQuantity = event.target.value;

        // 빈 값 허용
        if (inputQuantity === "") {
            setQuantity("");
            setTotalPrice(0);
            return;
        }

        const numericValue = Number(inputQuantity);
        if (numericValue > 0) {
            setQuantity(numericValue);
            setTotalPrice(numericValue * product.productPrice);
        }
    };

    // 입력창이 포커스를 잃었을 때 (Blur 이벤트)
    const handleBlur = () => {
        if (quantity === "" || quantity <= 0) {
            alert("한 개 이상부터 주문 가능합니다.");
            setQuantity(1); // 기본값으로 설정
            setTotalPrice(product.productPrice);
        }
    };

    // 좋아요 버튼 클릭 핸들러
    const toggleLike = () => {
        if (!isLoggedIn()) {
            alert("로그인이 필요합니다.");
            navigate("/login"); // 로그인 페이지로 이동
            return;
        }

        const savedLikes = JSON.parse(localStorage.getItem("likedProducts")) || {};
        savedLikes[productCode] = !isLiked; // 현재 상품의 좋아요 상태 토글
        localStorage.setItem("likedProducts", JSON.stringify(savedLikes)); // 저장

        // 좋아요 상태 업데이트 및 얼럿 표시
        if (!isLiked) {
            alert("위시리스트에 추가되었습니다.");
        } else {
            alert("위시리스트에서 제거되었습니다.");
        }

        setIsLiked(!isLiked);
    };

     // 사용자 Shop ID 가져오기
     useEffect(() => {
        const fetchCustomerShopid = () => {
            const cookies = document.cookie.split("; ");
            const accessTokenCookie = cookies.find(cookie => cookie.startsWith("accessToken="));
            if (accessTokenCookie) {
                const token = accessTokenCookie.split("=")[1];
                try {
                    // JWT 디코딩을 통해 customerShopid 추출
                    const payload = JSON.parse(atob(token.split(".")[1])); // JWT payload 디코딩
                    setCustomerShopid(payload.customerShopid); // customerShopid 설정
                } catch (err) {
                    console.error("Failed to decode token:", err);
                }
            } else {
                console.error("No accessToken found in cookies.");
            }
        };

        if (isLoggedIn()) {
            fetchCustomerShopid();
        }
    }, [isLoggedIn]);

    
    // 장바구니 버튼 클릭 핸들러
    const handleAddToCart = () => {
        if (!isLoggedIn()) {
            setPopup({
                message: "로그인이 필요합니다.",
                onConfirm: () => navigate("/login"),
            }); // 로그인 페이지로 이동
            return;
        }

        if (!customerShopid) {
            setPopup({
                message: "사용자 정보를 가져오지 못했습니다. 다시 로그인 해주세요.",
                onConfirm: () => navigate("/login"),
            });
            return;
        }

        if (totalPrice === 0) {
            setPopup({
                message: "한 개 이상 구매 가능합니다.",
                onConfirm: () => setPopup(null),
            });
        } else {
            const newItem = {
                cartId: null, // 백엔드에서 자동 생성
                customerShopid, // 현재 로그인한 사용자
                productCode: product.productCode,
                productName: product.productName,
                productPrice: product.productPrice,
                quantity,
            };

            addItemToCart(newItem);

            setPopup({
            message: "장바구니에 상품이 추가되었습니다.",
            onConfirm: () => navigate("/cart"),
        });
        }
    };

    if (isLoading) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <div>로딩 중...</div>
            </Container>
        );
    }
    if (isLoading) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <div>로딩 중...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="product-detail mt-5">
            <Row>
                {/* 왼쪽 이미지 */}
                <Col md={6}>
                    <Image
                        src={product.productImagePath || "/default-product.png"}
                        alt={product.productName}
                        className="product-image"
                        fluid
                    />
                    <div className="thumbnail-container mt-3">
                        {product.thumbnails &&
                            product.thumbnails.map((thumb, index) => (
                                <Image
                                    key={index}
                                    src={thumb}
                                    alt={`Thumbnail ${index}`}
                                    className="thumbnail"
                                />
                            ))}
                    </div>
                </Col>

                {/* 오른쪽 상세 정보 */}
                <Col md={6}>
                    <h2>{product.productName}</h2>
                    <p className="price">
                        <span className="original-price">
                            {product.productPrice.toLocaleString()}원
                        </span>
                    </p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                    {/* 수량 조절 */}
                    <div className="quantity-control mt-4">
                        <h5>수량 </h5>
                        <div className="d-flex align-items-center">
                            <Button
                                variant="outline-secondary"
                                className="quantity-btn"
                                onClick={decrementQuantity}
                            >
                                -
                            </Button>  &nbsp;
                            <input
                                type="String"
                                className="quantity-input"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            /> &nbsp;
                            <Button
                                variant="outline-secondary"
                                className="quantity-btn"
                                onClick={incrementQuantity}
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    {/* 상품금액 합계 */}
                    <div className="total-price">
                        <h5>상품금액 합계</h5>
                        <span className="total-price-amount">
                            {totalPrice.toLocaleString()}원
                        </span>
                    </div>
                    <div className="price-divider"></div>

                    {/* 버튼 그룹 */}
                    <div className="button-group mt-4">
                        <Button className="styled-cart-btn me-2" onClick={handleAddToCart}>장바구니</Button>
                        {/*<Button className="styled-buy-btn me-2">바로구매</Button>*/}
                        <Button
                            className={`styled-icon-btn wishlist-btn ${
                                isLiked ? "liked" : ""
                            }`}
                            onClick={toggleLike}
                        >
                            ♥
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetail;