import React from 'react';
import { ProductList } from '../components/product/ProductList.jsx';
import {Link, NavLink} from "react-router-dom";
import {FaBars, FaHeadset, FaTimes, FaUser} from "react-icons/fa";

export function Products() {
    return (
        <div className='content'>
            <header className="header">
                <nav>
                    <a href="productMountain">산악</a>
                    <a href="#">로드</a>
                    <a href="#">라이프스타일</a>
                    <a href="#">전기</a>
                    <a href="#">브랜드</a>
                </nav>
            </header>
            <h3 className='all-products-title'>All Products</h3>
            <ProductList />
        </div>
    );
}
