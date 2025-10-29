import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/home.css";

export function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 800, 0);

  return (
    <div className="home">
      {/* Hero 섹션 */}
      <section className="hero-section" style={{ opacity }}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="hero-swiper"
        >
          {["hero1.jpg", "hero2.jpg", "hero3.jpg", "hero4.jpg", "hero5.jpg"].map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={`/images/${img}`} alt={`Hero ${idx + 1}`} className="hero-image" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="hero-text">
          <h1>Explore the World on Two Wheels</h1>
          <p>당신의 라이딩 여정을 지금 시작하세요</p>
        </div>
      </section>

      {/* 자전거 판매 */}
      <section className="section sale">
        <h2>인기 자전거</h2>
        <div className="bike-grid">
          {[
            {
              img: "bike1.png",
              name: "불렛",
              desc: "강력한 퍼포먼스로 최고의 주행력을 선사하는 전기자전거 모델",
            },
            {
              img: "bike2.png",
              name: "엘리엇",
              desc: "수많은 대회 우승을 통해 성능을 검증한 엘리엇은 더욱 높은 에어로 성능을 갖추었습니다.",
            },
            {
              img: "bike3.png",
              name: "케인",
              desc: "풀체인지를 통해 넘치는 개성을 표현한 새로운 케인 시리즈",
            },
          ].map((bike, idx) => (
            <div className="bike-card" key={idx}>
              <img src={`/images/${bike.img}`} alt={bike.name} />
              <h3>{bike.name}</h3>
              <p>{bike.desc}</p>
              <Link to="/purchase" className="btn-outline">구매하기</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 대여 */}
      <section className="section rental">
        <h2>자전거 대여 서비스</h2>
        <p>가볍게 떠나고 싶을 때, 가까운 대여소에서 손쉽게 이용하세요.</p>
        <Link to="/rental" className="btn-primary">대여하러 가기</Link>
      </section>

      {/* 여행지 추천 */}
      <section className="section travel">
        <h2>추천 라이딩 코스</h2>
        <div className="travel-cards">
          {[
            { img: "travel1.png", name: "제주 해안도로 코스" },
            { img: "travel2.jpg", name: "한강 라이딩 코스" },
            { img: "travel3.jpg", name: "남이섬 코스" },
          ].map((course, idx) => (
            <div className="travel-card" key={idx}>
              <img src={`/images/${course.img}`} alt={course.name} />
              <h3>{course.name}</h3>
            </div>
          ))}
        </div>
        <Link to="/travel" className="btn-outline">더보기</Link>
      </section>

      {/* 고객센터 */}
      <section className="section support">
        <h2>도움이 필요하신가요?</h2>
        <p>제품 등록, A/S, 문의사항은 고객센터에서 빠르게 해결하세요.</p>
        <Link to="/support" className="btn-outline2">고객센터 바로가기</Link>
      </section>
    </div>
  );
}
