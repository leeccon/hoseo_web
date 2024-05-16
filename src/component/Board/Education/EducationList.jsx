import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EducationList = () => {
  const { category } = useParams();
  const [boardData, setBoardData] = useState([]);
  const [tab, setTab] = useState("management");
  const [page, setPage] = useState(1);

  //교육 상세데이터
  const categoryDataSet = (category) => {
    axios
      .get(`http://localhost:3001/api/education/${category}`)
      .then((response) => {
        setBoardData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    categoryDataSet(category);
  }, [category]);

<<<<<<< HEAD
  // 직원정보 등록 페이지로 이동
  const moveEditor = () => {
    window.location.href = `/education/${category}/editor`;
  };

  // 각 카테고리별 테이블 내용
  const renderTable = () => {
    return (
      <div>
        <div>
          <div onClick={moveEditor}>직원정보 등록</div>
        </div>
        <div>
          <input type="text" placeholder="검색..." />
        </div>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>직위</th>
              <th>업무</th>
              <th>전화번호</th>
              <th>이메일</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.spot}</td>
                <td>{employee.work}</td>
                <td>{employee.tel}</td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  let content = null;

  switch (category) {
    case "management":
      content = renderTable();
      break;
    case "enterprise":
      content = renderTable();
      break;
    case "resources":
      content = renderTable();
      break;
    case "founded":
      content = renderTable();
      break;
    default:
      content = <p>잘못된 카테고리입니다.</p>;
=======
  const infoWrite = () => {

>>>>>>> e793564cd547e99a764211ffa8d0b2cb271c0010
  }

  const handleTab = (num) => {
    setTab(num)
  }
  const handlePage = (cate) => {
    setPage(cate);
  };


  // 각 카테고리별 테이블 내용
  return (
    <div className='board_wrap'>
      <div className='board_back'>

        <div className='board_container'>
          <div className='title_box'>
            <div className='navi_text'>
              홈{">"}알림 및 소식{">"}직원정보
            </div>
            <div className='title_text'>직원정보</div>
            <div className="tab_area fourth">
              <div className={`tab_box ${tab === "management" && "active"}`} onClick={() => handleTab("management")}>경영혁신실</div>
              <div className={`tab_box ${tab === "enterprise" && "active"}`} onClick={() => handleTab("enterprise")}>기업지원실</div>
              <div className={`tab_box ${tab === "resources" && "active"}`} onClick={() => handleTab("resources")}>인재개발실</div>
              <div className={`tab_box ${tab === "founded" && "active"}`} onClick={() => handleTab("founded")}>창업지원실</div>
            </div>

          </div>

          <div className='list_area'>
            <div className='search_box'>
              <input className='search_input' placeholder='검색어를 입력해주세요'></input>
              <div className='search_btn'></div>
            </div>
            <div className='list_box'>
              <table className="board_table">
                <thead className="table_head">
                  <tr className="head_row">
                    <th className="head_section ">이름</th>
                    <th className="head_section date">직위</th>
                    <th className="head_section title">업무</th>
                    <th className="head_section date">전화번호</th>
                    <th className="head_section date">이메일</th>
                  </tr>
                </thead>
                <tbody className="table_body">
                  {boardData.map((data, index) => {
                    return (
                      <tr
                        className="body_row"
                        key={index}
                      >
                        <td className="body_section">{data.name}</td>
                        <td className="body_section date">{data.spot}</td>
                        <td className="body_section title">{data.work}</td>
                        <td className="body_section date">{data.tel}</td>
                        <td className="body_section ">{data.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
            <div className="write_box">
              <div className="write_btn" onClick={infoWrite}>직원정보 등록</div>
            </div>
            <div className='pagination_box'>
              <div className='arrow_btn'>{"<"}</div>
              {[...Array(parseInt(5))].map((data, index) => {
                return (
                  <div className={`page_number ${page === index + 1 && "active"}`} onClick={() => handlePage(index + 1)}>{index + 1}</div>
                );
              })}

              <div className='arrow_btn'>{">"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default EducationList;