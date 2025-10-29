import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeadset, FaUser, FaBars, FaTimes } from "react-icons/fa";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* 좌측 로고 */}
      <div className="header-left">
        <Link to="/" className="logo">
          Bicycle-App
        </Link>
      </div>

      {/* 중앙 메뉴 (데스크톱용) */}
      <nav className={`header-center ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/product" onClick={() => setMenuOpen(false)}>
              자전거 구매
            </NavLink>
          </li>
          <li>
            <NavLink to="/rental" onClick={() => setMenuOpen(false)}>
              자전거 대여
            </NavLink>
          </li>
          <li>
            <NavLink to="/travel" onClick={() => setMenuOpen(false)}>
              여행지 추천
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* 우측 메뉴 */}
      <div className="header-right">
        <NavLink to="/support" className="icon-link">
          <FaHeadset className="icon" />
          <span className="text">고객센터</span>
        </NavLink>
        <NavLink to="/login" className="icon-link">
          <FaUser className="icon" />
          <span className="text">로그인</span>
        </NavLink>
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        {/* 햄버거 버튼 (모바일용) */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}
