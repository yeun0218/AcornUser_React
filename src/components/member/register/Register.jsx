import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";
import Header from "../../common/Header.jsx";
import Footer from "../../common/Footer.jsx";
import {
  RBUTTON,
  RDIV,
  RDIV2,
  RDIV3,
  RINPUT,
  RNDIV,
  RTEXTDIV,
  RTEXTDIV2,
  RVALIDDIV,
  RZINPUT,
} from "../../../assets/styles/RegisterStyle.js";
import { LOGINBTN } from "../../../assets/styles/LoginStyle.js";

const RegisterPage = (props) => {
  const [customerShopid, setCustomerShopid] = useState(""); // 아이디
  const [customerShoppw, setCustomerShoppw] = useState(""); // 비밀번호
  const [customerName, setCustomerName] = useState(""); // 이름
  const [customerGender, setCustomerGender] = useState(""); // 성별
  const [customerTel, setCustomerTel] = useState(""); // 전화번호
  const [customerMail, setCustomerMail] = useState(""); // 이메일
  const [customerPostcode, setCustomerPostcode] = useState(""); // 우편번호
  const [customerAddr1, setCustomerAddr1] = useState(""); // 주소
  const [customerAddr2, setCustomerAddr2] = useState(""); // 상세 주소
  const [show, setShow] = useState(false);

  // 오류 메시지 담기
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isName, setIsName] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  ///// 다음 우편번호 찾기 함수 ///////
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setCustomerPostcode(data.zonecode);
    setCustomerAddr1(fullAddress);
    setShow(false);
  };
  ////// 다음 우편번호 함수 끝 //////

  axios.defaults.withCredentials = true;

  const handleSignup = (e) => {
    e.preventDefault();
    const requestBody = {
      customerShopid,
      customerShoppw,
      customerName,
      customerGender,
      customerMail,
      customerTel,
      customerPostcode,
      customerAddr1,
      customerAddr2,
    };

    axios
      .post("http://localhost:8080/user/signup", requestBody)
      .then((response) => {
        if (response.status === 200) {
          alert("회원가입이 완료되었습니다.");
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      })
      .catch((error) => {
  console.error("회원가입 에러: ", error);
  if (error.response) {
    if (error.response.status === 400) {
      // 유효성 검사 실패 처리
      const errorMessages = error.response.data;
      console.error("유효성 검사 실패 메시지: ", errorMessages);
      alert("입력 데이터가 유효하지 않습니다. 다시 확인해주세요.");
    } else {
      const { code } = error.response.data;
      if (code === "DI") {
        alert("이미 사용 중인 아이디입니다.");
      } else if (code === "DM") {
        alert("이미 사용 중인 이메일입니다.");
      } else if (code === "DP") {
        alert("이미 사용 중인 전화번호입니다.");
      } else {
        alert("회원가입 중 문제가 발생했습니다.");
      }
    }
  } else {
    alert("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
  }
});
  };

  return (
    <>
      <Header />
      <RDIV>
        <h2 style={{ fontWeight: "700", borderBottom: "3px solid #5e514d", padding: "20px", color: "#5e514d" }}>
          회원가입
        </h2>
        <RDIV3>
          <form id="f_register" onSubmit={handleSignup}>
            <RDIV2>
              <RTEXTDIV>아이디</RTEXTDIV>
              <RINPUT
                type="text"
                name="customerShopid"
                value={customerShopid}
                onChange={(e) => setCustomerShopid(e.target.value)}
                placeholder="아이디를 입력해주세요"
              />
            </RDIV2>
            <RNDIV>
              <RTEXTDIV>비밀번호</RTEXTDIV>
              <RINPUT
                type="password"
                name="customerShoppw"
                value={customerShoppw}
                onChange={(e) => setCustomerShoppw(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
            </RNDIV>
            <RNDIV>
              <RTEXTDIV2>이름</RTEXTDIV2>
              <RINPUT
                type="text"
                name="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="이름을 입력해주세요"
              />
            </RNDIV>
            <RDIV2>
              <RTEXTDIV>성별</RTEXTDIV>
              <div>
                <label>
                  <input
                    type="radio"
                    name="customerGender"
                    value="male"
                    onChange={(e) => setCustomerGender(e.target.value)}
                  />{" "}
                  남성
                </label>
                <label>
                  <input
                    type="radio"
                    name="customerGender"
                    value="female"
                    onChange={(e) => setCustomerGender(e.target.value)}
                  />{" "}
                  여성
                </label>
              </div>
            </RDIV2>
            <RNDIV>
              <RTEXTDIV>전화번호</RTEXTDIV>
              <RINPUT
                type="text"
                name="customerTel"
                value={customerTel}
                onChange={(e) => setCustomerTel(e.target.value)}
                placeholder="'-' 없이 입력해주세요"
              />
            </RNDIV>
            <RNDIV>
              <RTEXTDIV>이메일</RTEXTDIV>
              <RINPUT
                type="email"
                name="customerMail"
                value={customerMail}
                onChange={(e) => setCustomerMail(e.target.value)}
                placeholder="이메일을 입력해주세요"
              />
            </RNDIV>
            <RDIV2>
              <RTEXTDIV>우편번호</RTEXTDIV>
              <RZINPUT
                name="customerPostcode"
                value={customerPostcode}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleShow}
              >
                우편번호 찾기
              </button>
            </RDIV2>
            <RNDIV>
              <RTEXTDIV>주소</RTEXTDIV>
              <RINPUT
                type="text"
                name="customerAddr1"
                value={customerAddr1}
                readOnly
              />
            </RNDIV>
            <RNDIV>
              <RTEXTDIV>상세주소</RTEXTDIV>
              <RINPUT
                type="text"
                name="customerAddr2"
                value={customerAddr2}
                onChange={(e) => setCustomerAddr2(e.target.value)}
              />
            </RNDIV>
            <RBUTTON>
              <LOGINBTN type="submit">
                회원가입
              </LOGINBTN>
            </RBUTTON>
          </form>
        </RDIV3>
      </RDIV>
      <Footer />

      {/* 우편번호 모달 시작 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
        </Modal.Body>
      </Modal>
      {/* 우편번호 모달 끝 */}
    </>
  );
};

export default RegisterPage;
