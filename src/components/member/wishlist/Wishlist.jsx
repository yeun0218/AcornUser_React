import { useEffect, useState } from "react";

function Wishlist() {
    const [customerData, setCustomerData] = useState({}); // 고객 데이터 상태
    const [products, setProducts] = useState([]); // 상품 데이터 상태
    const [wishlists, setWishlists] = useState([]); // 위시리스트 데이터 배열로 초기화

    // 고객 데이터 및 위시리스트 데이터 가져오기
    useEffect(() => {
        fetch('http://localhost:8080/wishlist/user', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setCustomerData(data);
                // 고객 데이터를 기반으로 위시리스트 데이터 가져오기
                fetch(`http://localhost:8080/wishlist/${data.customerId}`)
                    .then((response) => response.json())
                    .then((data) => setWishlists(Array.isArray(data) ? data : [])) // 배열로 변환
                    .catch((err) => console.error('Error fetching wishlists:', err));
            })
            .catch((err) => console.error('Error fetching customerData:', err));
    }, []);

    // 위시리스트 데이터를 기반으로 상품 데이터 가져오기
    useEffect(() => {
        if (wishlists.length > 0) {
            const productCodes = wishlists.map((item) => item.productCode).join(','); // productCode 배열을 ','로 연결
            fetch(`http://localhost:8080/wishlist/products?codes=${productCodes}`, {
                method: 'GET',
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    return response.json(); // JSON으로 변환
                })
                .then((data) => {
                    if (Array.isArray(data)) {
                        setProducts(data);
                    } else {
                        console.error('Invalid response format:', data);
                        setProducts([]);
                    }
                })
                .catch((err) => console.error('Error fetching products:', err));
        }
    }, [wishlists]);

    // 위시리스트와 상품 데이터를 병합
    const mergedWishlist = Array.isArray(wishlists)
        ? wishlists.map((wishlist) => {
            const product = products.find((p) => p.productCode === wishlist.productCode);
            return { ...wishlist, ...product };
        })
        : [];

    // 위시리스트에서 상품 삭제
    const handleDelete = (customerId, productCode) => {
        fetch(`http://localhost:8080/wishlist?customerId=${customerId}&productCode=${productCode}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setWishlists(wishlists.filter((item) => item.productCode !== productCode));
                }
            })
            .catch((err) => console.error('Error deleting wishlist item:', err));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Wishlist</h1>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>상품</th>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {mergedWishlist.length > 0 ? (
                    mergedWishlist.map((item, index) => (
                        <tr key={item.wishlistId}>
                            <td>
                                <img
                                    src={item.productImagePath}
                                    alt={item.productName}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{item.productName || 'N/A'}</td>
                            <td>{item.productPrice ? `${item.productPrice}원` : 'N/A'}</td>
                            <td>
                                <button
                                    style={{
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleDelete(customerData.customerId, item.productCode)}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>위시리스트에 상품이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default Wishlist;
