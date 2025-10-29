import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import "../styles/support.css";

export function Support() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("faq");
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "안녕하세요 😊 무엇을 도와드릴까요?" },
  ]);
  const [input, setInput] = useState("");

  // Footer에서 전달된 탭 초기화
  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state.tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.state]);

  // 간단한 자동응답 규칙
  const handleBotResponse = (userInput) => {
    const lower = userInput.toLowerCase();
    if (lower.includes("a/s") || lower.includes("as"))
      return "A/S 관련 문의는 고객센터 > A/S 안내 탭을 참고해주세요.";
    if (lower.includes("자료") || lower.includes("다운로드"))
      return "자료실 탭에서 관련 문서를 다운로드할 수 있습니다.";
    if (lower.includes("문의") || lower.includes("상담"))
      return "문의사항은 고객센터 페이지 하단의 연락처를 이용해주세요.";
    if (lower.includes("운영시간"))
      return "고객센터 운영시간은 평일 09:00 ~ 18:00 입니다.";
    return "죄송합니다. 그 부분은 아직 학습되지 않았어요 😅";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const reply = handleBotResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);

    setInput("");
  };

  return (
    <div className="support-page">
      <h1 className="support-title">고객센터</h1>

      {/* 탭 네비게이션 */}
      <div className="support-tabs">
        <button
          className={activeTab === "faq" ? "active" : ""}
          onClick={() => setActiveTab("faq")}
        >
          자주 묻는 질문
        </button>
        <button
          className={activeTab === "as" ? "active" : ""}
          onClick={() => setActiveTab("as")}
        >
          A/S 안내
        </button>
        <button
          className={activeTab === "data" ? "active" : ""}
          onClick={() => setActiveTab("data")}
        >
          자료실
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <div className="tab-content">
        {activeTab === "faq" && <FAQ />}
        {activeTab === "as" && <ASInfo />}
        {activeTab === "data" && <Resources />}
      </div>

      {/* 고객센터 안내 */}
      <div className="support-contact">
        <p className="support-label">고객센터</p>
        <h2>02-1234-5678</h2>
        <p>평일 오전 9시 ~ 오후 6시</p>
        <p>토요일, 일요일, 공휴일 휴무</p>
        <div className="support-buttons">
          <button onClick={() => setShowChatbot(true)}>1:1 문의하기</button>
        </div>
      </div>

      {/* 💬 챗봇 아이콘 버튼 */}
      {/* <button className="chatbot-toggle" onClick={() => setShowChatbot(true)}>
        <FaQuestionCircle size={30} />
      </button> */}

      {/* 챗봇 팝업 */}
      {showChatbot && (
        <div className="chatbot-popup">
          <div className="chatbot-window">
            <div className="chatbot-header">
              <h4>고객센터 챗봇</h4>
              <button className="close-btn" onClick={() => setShowChatbot(false)}>
                ✕
              </button>
            </div>

            <div className="chatbot-body">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>전송</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------
 *  자주 묻는 질문 (FAQ)
 * ------------------------------ */
function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetch("/data/qna.json")
      .then((res) => res.json())
      .then(setFaqs)
      .catch((err) => console.error("❌ QNA 데이터를 불러오지 못했습니다:", err));
  }, []);

  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="faq-section">
      {currentFaqs.map((item, i) => (
        <div
          key={item.qid}
          className={`faq-item ${openIndex === i ? "open" : ""}`}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          <div className="faq-question">
            <FaQuestionCircle />
            <div className="faq-text">
              <span className="faq-q">{item.q}</span>
              {item.qcode && <small className="faq-category">{item.qcode}</small>}
            </div>
          </div>

          {openIndex === i && (
            <div
              className="faq-answer"
              dangerouslySetInnerHTML={{
                __html: item.a.replace(/\n/g, "<br />"),
              }}
            />
          )}
        </div>
      ))}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

// A/S 안내
function ASInfo() {
  return (
    <div className="as-section">
      <div className="as-div main">
        <div className="as-img-box">
          <img src="/images/as_process_pc.jpg" alt="as process" />
        </div>
        <ul>
          <li>1. 구입 대리점에서 A/S 접수</li>
          <li>2. 구입 대리점에서 A/S 불가한 경우, 대리점에서 본사 서비스팀으로 A/S 접수</li>
          <li>3. 본사 서비스팀에서 A/S 완료된 제품을 대리점으로 배송</li>
          <li>4. 대리점에서 소비자에게 전달</li>
        </ul>
        <p className="as-title">대리점에서 본사 서비스팀으로 A/S 제품 발송 시 주의사항</p>
        <ul>
          <li>대리점에서 공장으로 제품 A/S 접수 시 이상 증상에 대한 정비 의뢰서를 첨부 바랍니다.</li>
          <li className="c-red">(증상에 대한 내용의 전달이 없을 경우 A/S 처리가 지연될 수 있습니다.)</li>
          <li>제품 발송 시 택배 운반 중 파손이 되지 않게 꼼꼼하게 포장하여 발송 부탁드립니다.</li>
          <li className="c-red">(당사는 제품의 운반 및 배송 중에 발생된 제품의 손상 및 손해에 대해선 책임을 지지 않습니다)</li>
          <li>본사는 제조상 결함을 제외한 본 제품의 운행 중 발생하는 사고나 부상 등에 책임이 없으며,</li>
          <li>운송 중 또는 설계 용도 외 사용으로 생긴 파손, 부상 및 손해에 대해서 책임을 지지 않습니다.</li>
        </ul>
      </div>
      <div className="as-div">
        <p className="as-title">1. 품질보증수리</p>
        <p className="as-desc">당사에서 수입, 제조 되는 모든 제품에 대해 당사의 규정에 의거하여 품질 보증을 제공합니다. 공식대리점을 통해 구매하여 조립 및 점검을 받고 정상적으로 사용하였음에도 불구하고 결함이 발생된 경우에 품질보증 규정에 의거하여 보증수리를 지원해 드리고 있습니다. 보증수리 신청은 1차 구매한 대리점을 통해 접수하여 주시기 바랍니다. 대리점에서 보증 수리가 가능합니다.</p>
      </div>
      <div className="as-div">
        <p className="as-title">2. 품질보증기간</p>
        <p className="as-desc">품질보증으로 보증수리를 받는 기간은 제품 구입일이 기준이므로 대리점에서 구입일이 표시된 영수증을 꼭 받아서 보관해 주시기 바랍니다. 판매자 또한 이 영수증을 기록 보관하시기 바랍니다. 만일 구입일이 확인되지 않을 경우 당사에서는 제품 생산일을 기준으로 하여 유통기한을 감안하여 3개월이 추가됩니다. 영수증 분실시 구매 확인이 되지 않을경우 제조사는 품질보증 진행이 원칙적으로 거부될수 있음을 꼭 인지 하시기 바랍니다. (정상적인 범주 안에서의 보증수리 가능 기간 : 부품 6개월 / 차체 1년) (본 품질 보증기간은 첼로 브랜드에 한합니다. 첼로 외 브랜드는 우측 메뉴 [자료실 &lt; 워런티 규정] 를 참고하시기 바랍니다.)</p>
      </div>
      <div className="as-div">
        <p className="as-title">3. 품질보증 신청방법</p>
        <p className="as-desc">제품의 하자 및 제품 이상 발생시에는 1차 구매하신 대리점으로 A/S신청 및 문의 바랍니다.</p>
        <div className="as-img-box">
          <img src="/images/as_apply_pc.jpg" alt="as process" />
        </div>
      </div>
      <div className="as-div">
        <p className="as-title">4. 품질보증 신청방법</p>
        <p className="as-desc">품질보증수리 절차는 아래와 같이 진행해 주시기 바랍니다.</p>
        <ul className="as-box">
          <li>1) 최초 구매자는 1차 구매한 대리점에 제품 접수</li>
          <li>2) 대리점에서 1차 점검 및 제품 검증이 이루어져야 합니다.</li>
          <li>3) 미 해결시 대리점은 영업사원 및 A/S 담당자와 상담후 고객지원팀으로 접수</li>
          <li>4) 고객지원팀으로 접수시 수리의뢰서를 동봉하여 발송해 주시기 바랍니다.</li>
          <li>5) 고객지원팀에서 제품 접수후 대리점으로 접수 통보 안내</li>
          <li>6) 최종 보증 수리후 정비내역서를 동봉하여 대리점으로 발송</li>
          <li>7) 대리점에서 제품 수령후 구매자에게 제품 처리결과 안내</li>
        </ul>
        <p className="as-desc">고객지원팀으로 접수된 A/S는 운송기간을 제외하고 최소 영업일 기준 10일의 판정 및 수리기간이 발생할 수 있으며 모든 보증수리는 해당 부품업체의 결함 판정 기준에 따릅니다. 보증 수리는 경우에 따라 처리시일이 연장될 수 있습니다. 검수가 길어지거나 교체품이 부족한 경우에는 고객님께 별도의 연락을 드립니다.</p>
      </div>
      <div className="as-div">
        <p className="as-title">5. 품질보증제외</p>
        <p className="as-desc">제품의 품질보증 기간 중이라도 아래와 같은 경우에 유상수리에 해당 됩니다.</p>
        <ul className="as-box">
          <li>- 품질보증 기간은 제품 구입 일을 기준으로 산정되오나 대리점 구입 시 구입일자가 표기된 영수증을 반드시 수령해야 합니다. </li>
          <li>- 중고 제품에 대한 품질보증 기간은 최초 구매자의 구매 일을 기준으로 합니다. </li>
          <li>- 제품의 품질 보증이 경과한 후 발생한 제품의 수리 및 교환은 유상으로 진행될수 있습니다. </li>
          <li>- 비정상적으로 사용으로 인한 고장이나 파손 </li>
          <li>- 조립 설명서에 따라 제품 조립 및 세팅을 하지 않은 경우 </li>
          <li>- 제품을 임의로 스펙을 변경한 경우</li>
          <li>- 환경 및 시간이 지남에 따라 자연적으로 발생되는 마모 및 손상인 경우 </li>
          <li>- 자연광에 의한 변색 시 </li>
          <li>- 사용자 부주의로 인한 외부 충격에 의한 파손, 마모</li>
          <li>- 제품 이용중 발생된 도색 벗겨짐이나 부식 </li>
          <li>- 장기간 사용 및 방치에 의해 발생한 오염, 파손, 마모, 소음 </li>
          <li>- 일반적인 사용상에서 발생하는 소모성 부품의 경우 </li>
          <li>- 사용중 제품의 조립과정중 발생하는 흠집이나 도색 벗겨짐 </li>
          <li>- 호환되지 않는 부품조합을 사용하는 경우</li>
          <li>- 고객 인도후 배송 중 발생되는 손상의 경우</li>
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------
 *  자료실 (Resources)
 * ------------------------------ */
function Resources() {
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => {
        // ✅ 원본 불변성 유지 + 정렬
        const sorted = [...data].sort((a, b) => a.id - b.id);
        setResources(sorted);
      })
      .catch((err) =>
        console.error("❌ 자료실 데이터를 불러오지 못했습니다:", err)
      );
  }, []);

  // ✅ 필터링된 데이터
  const filtered =
    filter === "전체"
      ? resources
      : resources.filter((item) => item.category === filter);

  // ✅ 페이징 계산
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  // ✅ PDF 열기 (중복 클릭 방지)
  const handleOpenPDF = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="resources-section">
      {/* 필터 드롭다운 */}
      <div className="resources-header">
        <select
          className="resources-filter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // 필터 변경 시 첫 페이지로
          }}
        >
          <option value="전체">전체</option>
          <option value="카탈로그">카탈로그</option>
          <option value="사용설명서">사용설명서</option>
          <option value="기타">기타</option>
        </select>
      </div>

      {/* ✅ 자료 리스트 */}
      <ul className="resources-list">
        {currentItems.map((item) => (
          <li
            key={item.id}
            className="resources-item"
            onClick={(e) => {
              e.preventDefault();
              handleOpenPDF(item.url);
            }}
          >
            <span className="file-icon">
              <i className="fa-solid fa-folder" />
            </span>
            <span className="file-title">{item.title}</span>
            <span className="file-type">
              <i className="fa-solid fa-download" /> PDF
            </span>
          </li>
        ))}

        {currentItems.length === 0 && (
          <li className="no-data">자료가 없습니다.</li>
        )}
      </ul>

      {/* ✅ 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

/* ------------------------------
 *  공통 페이지네이션 컴포넌트
 * ------------------------------ */
function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
}