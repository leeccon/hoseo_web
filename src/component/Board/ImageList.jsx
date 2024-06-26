import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ImageList = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [select, setSelect] = useState(0);
  const [tab, setTab] = useState(1);
  const [menuData, setMenuData] = useState([]);
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const navigate = useNavigate();
  const pageSize = 10; // 페이지당 항목 수

  useEffect(() => {
    axios
      .get(
        `http://101.101.216.95:3001/api/get/board_list?cate=archive&page=${page}&pageSize=${pageSize}`
      )
      .then((response) => {
        setMenuData(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  const handleSelect = (num) => {
    if (select === num) {
      setSelect(0);
    } else {
      setSelect(num);
    }
  };

  const handlePage = (num) => {
    setPage(num);
  };

  const handleTab = (num) => {
    setTab(num);
  };

  const hitCount = async (idx) => {
    try {
      await axios.post(
        `http://101.101.216.95:3001/api/post/board/hit_count/${idx}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleRowClick = (idx) => {
    const selectedItem = menuData.find((item) => item.idx === idx);
    if (selectedItem) {
      hitCount(idx);
      navigate(`/board/archive/${idx}`, { state: { menuData: selectedItem } });
    }
  };
  const moveBoard = (cate) => {
    navigate(`/board/${cate}`, { state: { cate: cate } });
  };
  const movePage = (path) => {
    navigate(path);
  };
  const handleWrite = () => {
    navigate(`/board/archive/write`);
  };

  //페이징처리
  const renderPagination = () => {
    const pages = [];
    // 이전버튼
    pages.push(
      <div key="prev" className="arrow_btn">
        <button
          className="page_button prev"
          onClick={() => handlePage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        ></button>
      </div>
    );
    // 페이지수
    const totalPagesToShow = totalPages === 0 ? 1 : totalPages;
    for (let i = 1; i <= totalPagesToShow; i++) {
      pages.push(
        <button
          key={i}
          className={`page_number ${page === i ? "active" : ""}`}
          onClick={() => handlePage(i)}
        >
          {i}
        </button>
      );
    }
    // 다음버튼
    pages.push(
      <div key="next" className="arrow_btn">
        <button
          className="page_button"
          onClick={() => handlePage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        ></button>
      </div>
    );

    return pages;
  };

  //날짜계산
  const isNew = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="board_wrap">
      <div className="board_back">
        <div className="navi_area">
          <div className="navi_back">
            <div className="navi_box" onClick={() => handleSelect(1)}>
              <div className="navi_main_text">알림 및 소식</div>
              <div className="navi_arrow"></div>
              <div className={`navi_select_box ${select === 1 && "active"}`}>
                <div className="select_row" onClick={() => moveBoard("notice")}>
                  알림 및 소식
                </div>
                <div
                  className="select_row"
                  onClick={() => movePage("/company")}
                >
                  기업연구동
                </div>
                <div className="select_row" onClick={() => movePage("/intro")}>
                  융합원소개
                </div>
                <div className="select_row" onClick={() => movePage("/empty")}>
                  사업분야
                </div>
                <div className="select_row" onClick={() => movePage("/empty")}>
                  인프라
                </div>
              </div>
            </div>
            <div className="navi_box" onClick={() => handleSelect(2)}>
              <div className="navi_main_text">아카이브</div>
              <div className="navi_arrow"></div>
              <div className={`navi_select_box ${select === 2 && "active"}`}>
                <div className="select_row" onClick={() => moveBoard("notice")}>
                  공지사항
                </div>
                <div
                  className="select_row"
                  onClick={() => moveBoard("business")}
                >
                  사업공고
                </div>
                <div
                  className="select_row"
                  onClick={() => moveBoard("education")}
                >
                  교육공고
                </div>
                <div
                  className="select_row"
                  onClick={() => moveBoard("employment")}
                >
                  채용공고
                </div>
                <div className="select_row" onClick={() => moveBoard("bid")}>
                  입찰공고
                </div>
                <div
                  className="select_row"
                  onClick={() => moveBoard("related")}
                >
                  유관기관공고
                </div>
                <div className="select_row" onClick={() => moveBoard("news")}>
                  융합원뉴스
                </div>
                <div
                  className="select_row"
                  onClick={() => moveBoard("reference")}
                >
                  자료실
                </div>
                <div
                  className="select_row"
                  onClick={() => moveBoard("archive")}
                >
                  아카이브
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="board_container">
          <div className="title_box">
            <div className="navi_text">
              <div className="home_icon"></div>
              {"> "}알림 및 소식{" > "}
              융합원 아카이브
            </div>
            <div className="title_text">융합원 아카이브</div>
          </div>
          <div className="list_area">
            <div className="write_box">
              <div className="write_btn" onClick={handleWrite}>
                아카이브 등록
              </div>
            </div>
            <div className="search_box">
              <input
                className="search_input"
                placeholder="검색어를 입력해주세요"
              ></input>
              <div className="search_btn"></div>
            </div>
            <div className="list_box image">
              <div className="img_table">
                {menuData.length === 0 ? (
                  <div
                    className="no_data_message"
                    style={{
                      width: "100%",
                      height: "200px",
                      backgroundColor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    데이터가 존재하지 않습니다.
                  </div>
                ) : (
                  menuData.map((item, index) => (
                    <div
                      className="img_row"
                      onClick={() => handleRowClick(item.idx)}
                    >
                      <div
                        className="img_box"
                        style={{
                          backgroundImage: `url(http://101.101.216.95:3001/uploads/${item.img1})`,
                        }}
                      ></div>
                      <div className="img_text_box">
                        {isNew(item.date) && (
                          <div className="new_icon">NEW</div>
                        )}

                        <div className="img_title">{item.title}</div>
                        <div className="img_text">
                          {item.content.replace(/(<([^>]+)>)/gi, "")}
                        </div>
                        <div className="img_bottom_box">
                          <div className="bottom_row">작성자</div>
                          <div className="bottom_row">{item.writer}</div>
                          <div className="bottom_row">{item.date}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pagination_box">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageList;
