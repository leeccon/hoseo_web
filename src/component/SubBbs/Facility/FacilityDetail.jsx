import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { Fragment } from "react";

const FacilityDetail = () => {
  const location = useLocation();
  const { facilityList, data } = location.state || {};
  const navigate = useNavigate();
  const cate = "facility";
  const { decodeS1 } = useAuth();

  const handleDownload = (fileName) => {
    const link = document.createElement("a");
    window.open(
      `http://101.101.216.95:3001/api/download/${fileName}`,
      "_blank"
    );
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTitle = () => {
    if (facilityList && facilityList.title) {
      return facilityList.title;
    } else if (data && data.title) {
      return data.title;
    } else {
      return "";
    }
  };

  const getWriter = () => {
    if (facilityList && facilityList.writer) {
      return facilityList.writer;
    } else if (data && data.writer) {
      return data.writer;
    } else {
      return "";
    }
  };

  const getDate = () => {
    if (facilityList && facilityList.date) {
      return facilityList.date;
    } else if (data && data.date) {
      return data.date;
    } else {
      return "";
    }
  };

  const getHit = () => {
    if (facilityList && facilityList.hit) {
      return facilityList.hit;
    } else if (data && data.hit) {
      return data.hit;
    } else {
      return "";
    }
  };

  const getContent = () => {
    if (facilityList && facilityList.content) {
      return facilityList.content.replace(/(<([^>]+)>)/gi, "");
    } else if (data && data.content) {
      return data.content.replace(/(<([^>]+)>)/gi, "");
    } else {
      return "";
    }
  };

  const getAttachmentCount = () => {
    let count = 0;
    for (let i = 1; i <= 5; i++) {
      if (facilityList && facilityList[`img${i}`]) {
        count++;
      } else if (data && data[`img${i}`]) {
        count++;
      }
    }
    return count;
  };

  const getImg = () => {
    const images = [];
    for (let i = 1; i <= 5; i++) {
      if (facilityList && facilityList[`img${i}`]) {
        images.push(facilityList[`img${i}`]);
      } else if (data && data[`img${i}`]) {
        images.push(data[`img${i}`]);
      }
    }
    return images;
  };

  // console.log("LIST 데이터:", facilityList);
  // console.log("HOME 데이터:", data);

  const boardEdit = () => {
    navigate(`/board/${cate}/modify`, {
      state: {
        facilityList: facilityList,
        data: data,
        img1: facilityList.img1,
        img2: facilityList.img2,
        img3: facilityList.img3,
        img4: facilityList.img4,
        img5: facilityList.img5,
      },
    });
  };

  const boardDel = async () => {
    const confirmDelete = window.confirm(`해당 게시글을 삭제하시겠습니까?`);
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.post(
        "http://101.101.216.95:3001/api/post/facility_delete",
        {
          idx: facilityList.idx,
          cate: cate,
        }
      );
      alert("게시글이 삭제되었습니다.");
      navigate(`/board/${cate}`, { state: { cate: cate } });
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  return (
    <div className="detail_wrap">
      <div className="detail_back">
        {getTitle() && (
          <div className="detail_top_box">
            <div className="detail_title">{getTitle()}</div>
            <div className="title_sub_box">
              <div className="sub_row">
                <div className="sub_title">작성자</div>
                <div className="sub_text">{getWriter()}</div>
              </div>
              <div className="sub_row">
                <div className="sub_title">작성일</div>
                <div className="sub_text">{getDate()}</div>
              </div>
              <div className="sub_row">
                <div className="sub_title">조회수</div>
                <div className="sub_text">{getHit()}</div>
              </div>
            </div>
          </div>
        )}
        <div
          className="detail_contents_box"
          dangerouslySetInnerHTML={{ __html: facilityList.content }}
        ></div>
        <div className="detail_file_box">
          <div className="file_title">
            첨부파일 <span>{getAttachmentCount()}</span>
          </div>
          <div
            className="file_contents_box"
            onClick={(event) => handleDownload(event.target.textContent)}
          >
            {getImg().length > 0 ? (
              getImg().map((img, index) => (
                <div className="file_row" key={index}>
                  <div className="file_icon"></div>
                  <div className="file_text">{img}</div>
                </div>
              ))
            ) : (
              <div className="file_row">
                <div className="file_text" style={{ paddingRight: "10px" }}>
                  첨부파일이 존재하지 않습니다.
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="detail_btn_box">
          {/* <div className="detail_btn color">교육신청하기</div> */}

          <div className="detail_btn color" onClick={() => navigate(-1)}>
            목록으로
          </div>
          {decodeS1() === "admin" && (
            <Fragment>
              <div className="detail_btn short" onClick={() => boardEdit()}>
                수정
              </div>
              <div className="detail_btn short" onClick={() => boardDel()}>
                삭제
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacilityDetail;
