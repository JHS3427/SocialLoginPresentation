import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const [showTop, setShowTop] = useState(false);
  const navigate = useNavigate();

  // 스크롤 감지해서 버튼 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowTop(true);
      else setShowTop(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 상단으로 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* 왼쪽 로고 */}
        <div className="footer-logo">
          <img src="/logo192.png" alt="Bicycle Logo" />
        </div>

        {/* 중앙 링크 섹션 */}
        <div className="footer-links">
          <div>
            <h4>고객센터</h4>
            <ul>
              <li>
                <button onClick={() => navigate("/support", { state: { tab: "faq" } })}>
                  자주 묻는 질문
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/support", { state: { tab: "as" } })}>
                  A/S 안내
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/support", { state: { tab: "data" } })}>
                  자료실
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4>하이라이트</h4>
            <ul>
              <li><a href="#">뉴스</a></li>
              <li><a href="#">이벤트</a></li>
              <li><a href="#">리뷰</a></li>
            </ul>
          </div>
          <div>
            <h4>회사 소개</h4>
            <ul>
              <li><a href="#">회사 스토리</a></li>
              <li><a href="#">테크놀로지</a></li>
              <li><a href="#">선수 후원</a></li>
              <li><a href="#">오시는 길</a></li>
            </ul>
          </div>
        </div>

        {/* 오른쪽 회사 정보 */}
        <div className="footer-info">
          <div className="footer-social">
            <a href="https://www.youtube.com/channel/UCgb2432J7dUqZXaWe39FqQw"><i className="fab fa-instagram"></i></a>
            <a href="https://www.instagram.com/cellobike_official/"><i className="fab fa-youtube"></i></a>
            <a href="https://blog.naver.com/celloblog"><i className="fab fa-facebook"></i></a>
          </div>
          <p>
            대표 홍길동 | 사업자등록번호 123-45-67890 <br />
            대표번호 02-1234-5678 <br />
            서울특별시 강남구 테헤란로 123 (테스트빌딩 7층)
          </p>
          <div className="footer-policy">
            <a href="/policies/terms">이용약관</a>
            <a href="/policies/privacy">개인정보 취급방침</a>
            <a href="/policies/internalpolicy">내부정보 관리규정</a>
          </div>

          {/* 언어 선택 */}
          {/* <select className="footer-lang">
            <option>한국어</option>
            <option>English</option>
          </select> */}
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <div className="footer-bottom">
        © 2025 Bicycle-App. All rights reserved.
      </div>

      {/* 🚀 TOP 버튼 */}
      {showTop && (
        <button className="top-btn" onClick={scrollToTop}>
          ▲
        </button>
      )}
    </footer>
  );
}
