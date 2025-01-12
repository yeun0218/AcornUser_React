import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import DaumPostcodeEmbed from "react-daum-postcode";
import axios from "axios";
import Footer from "../../common/Footer.jsx";
import {
  RBUTTON,
  RDIV,
  RDIV2,
  RINPUT,
  RTEXTDIV,
  RVALIDDIV,
  RZINPUT,
} from "../../../assets/styles/Register/RegisterStyle.js";
import { LOGINBTN } from "../../../assets/styles/Login/LoginStyle.js";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({
    customerShopid: "",
    customerShoppw: "",
    customerName: "",
    customerGender: "",
    customerTel: "",
    customerMail: "",
    customerPostcode: "",
    customerAddr1: "",
    customerAddr2: "",
  });

  const [errors, setErrors] = useState({}); // 에러 메시지 상태
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" }); // 입력 중인 필드의 에러 메시지 초기화
  };

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
    setFormValues({
      ...formValues,
      customerPostcode: data.zonecode,
      customerAddr1: fullAddress,
    });
    setShow(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/user/signup", formValues)
      .then(() => {
        alert("회원가입이 완료되었습니다.");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrors(error.response.data); // 서버에서 보낸 에러 메시지 상태에 저장
        } else {
          alert("서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
        }
      });
  };

  return (
    <>
      <RDIV>
        <h2 style={{ fontWeight: "700", borderBottom: "3px solid #000", padding: "20px", color: "#000" }}>
          회원가입
        </h2>
        <form id="f_register" onSubmit={handleSignup}>
          <RDIV2>
            <RTEXTDIV>아이디</RTEXTDIV>
            <RINPUT
              type="text"
              name="customerShopid"
              value={formValues.customerShopid}
              onChange={handleInputChange}
              placeholder="아이디를 입력해주세요"
            />
            {errors.customerShopid && (
              <RVALIDDIV>{errors.customerShopid}</RVALIDDIV>
            )}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>비밀번호</RTEXTDIV>
            <RINPUT
              type="password"
              name="customerShoppw"
              value={formValues.customerShoppw}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.customerShoppw && (
              <RVALIDDIV>{errors.customerShoppw}</RVALIDDIV>
            )}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>이름</RTEXTDIV>
            <RINPUT
              type="text"
              name="customerName"
              value={formValues.customerName}
              onChange={handleInputChange}
              placeholder="이름을 입력해주세요"
            />
            {errors.customerName && (
              <RVALIDDIV>{errors.customerName}</RVALIDDIV>
            )}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>성별</RTEXTDIV>
            <div>
              <label>
                <input
                  type="radio"
                  name="customerGender"
                  value="남자"
                  checked={formValues.customerGender === "남자"}
                  onChange={handleInputChange}
                />{" "}
                남성
              </label>
              <label>
                <input
                  type="radio"
                  name="customerGender"
                  value="여자"
                  checked={formValues.customerGender === "여자"}
                  onChange={handleInputChange}
                />{" "}
                여성
              </label>
            </div>
            {errors.customerGender && (
              <RVALIDDIV>{errors.customerGender}</RVALIDDIV>
            )}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>전화번호</RTEXTDIV>
            <RINPUT
              type="text"
              name="customerTel"
              value={formValues.customerTel}
              onChange={handleInputChange}
              placeholder="'-' 없이 입력해주세요"
            />
            {errors.customerTel && <RVALIDDIV>{errors.customerTel}</RVALIDDIV>}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>이메일</RTEXTDIV>
            <RINPUT
              type="email"
              name="customerMail"
              value={formValues.customerMail}
              onChange={handleInputChange}
              placeholder="이메일을 입력해주세요"
            />
            {errors.customerMail && (
              <RVALIDDIV>{errors.customerMail}</RVALIDDIV>
            )}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>우편번호</RTEXTDIV>
            <RZINPUT
              name="customerPostcode"
              value={formValues.customerPostcode}
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleShow}
            >
              우편번호 찾기
            </button>
            {errors.customerPostcode && (
              <RVALIDDIV>{errors.customerPostcode}</RVALIDDIV>
            )}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>주소</RTEXTDIV>
            <RINPUT
              type="text"
              name="customerAddr1"
              value={formValues.customerAddr1}
              readOnly
            />
            {errors.customerAddr1 && (
              <RVALIDDIV>{errors.customerAddr1}</RVALIDDIV>
            )}
          </RDIV2>
          <RDIV2>
            <RTEXTDIV>상세주소</RTEXTDIV>
            <RINPUT
              type="text"
              name="customerAddr2"
              value={formValues.customerAddr2}
              onChange={handleInputChange}
              placeholder="상세 주소를 입력해주세요"
            />
            {errors.customerAddr2 && (
              <RVALIDDIV>{errors.customerAddr2}</RVALIDDIV>
            )}
          </RDIV2>
          <RBUTTON>
            <LOGINBTN type="submit">회원가입</LOGINBTN>
          </RBUTTON>
        </form>
      </RDIV>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우편번호 찾기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterPage;
