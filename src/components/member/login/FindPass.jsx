import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BROWN_BTN2 } from "../../../assets/styles/NoticeStyle.js";
import { FORM } from "../../../assets/styles/PaymentStyle.js";
import { P_SMALL } from "../../../assets/styles/SubStyle.js";

const FindPass = (props) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleInputId = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const handleInputName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleInputPhone = (e) => {
    console.log(e.target.value);
    setPhone(e.target.value);
  };
  const findPass = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SPRING_IP + "sendmail", null, {
        params: {customer_mail: email, customer_name: name, customer_tel: phone },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data === 1) {
          alert("임시 비밀번호가 메일로 발급되었습니다.");
          navigate("/login");
        } else if (res.data === 0) {
          alert("해당하는 회원정보가 없습니다.");
        }
      })
      .catch();
  };
  return (
    <>
      <FORM>
        <br />
        <P_SMALL>비밀번호 찾기</P_SMALL>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">이메일</label>
          <div className="col-sm-5">
            <input
              type="email"
              placeholder="이메일"
              name="customer_mail"
              value={email}
              onChange={handleInputId}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">이름</label>
          <div className="col-sm-5">
            <input
              type="text"
              placeholder="이름"
              name="customer_name"
              value={name}
              onChange={handleInputName}
              className="form-control"
            />
          </div>
        </div>

        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">전화번호</label>
          <div className="col-sm-5">
            <input
              type="text"
              placeholder="전화번호"
              name="customer_tel"
              value={phone}
              onChange={handleInputPhone}
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <BROWN_BTN2 onClick={findPass}>임시비밀번호 발급</BROWN_BTN2>
        </div>
        <br />
      </FORM>
    </>
  );
};

export default FindPass;
