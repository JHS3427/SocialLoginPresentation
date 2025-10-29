import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductAvatar } from './ProductAvatar.jsx';

import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../feature/product/productAPI.js';
import '../../styles/productList.css';

export function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(()=>{

        dispatch(getProductList());
    }, [dispatch]);
    // --- 데이터 정렬 로직 추가 ---
    const sortedProducts = products
        .slice()
        .sort((a, b) => parseInt(a.pid) - parseInt(b.pid));

    return (
        <div className="product-grid-container">
            {sortedProducts && sortedProducts.map((product) => (
                    <Link to={`/products/${product.pid}`} key={product.pid} className="product-card-link">
                        <div className="product-card">
                            <div className="product-card-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-card-info">
                                <h4 className="product-name">{product.name}</h4>
                                <p className="product-price">{parseInt(product.price).toLocaleString()}원</p>
                            </div>
                        </div>
                    </Link>
                )
            )}
            {sortedProducts.length === 0 && <p>상품 목록을 불러오는 중...</p>}
        </div>
    );
}