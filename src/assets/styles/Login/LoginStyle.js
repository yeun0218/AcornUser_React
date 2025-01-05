import styled from "styled-components";
import { Link } from "react-router-dom";

/* 전체를 감싸는 컨테이너 */
export const LDIV = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

/* LDIVV 스타일 */
export const LDIVV = styled.div`
  width: 45%;
  margin: 2rem auto;
  padding: 4rem 3rem;
  background-color: #f8eedc;
  border-radius: 1rem;
`;

/* 제목 스타일 */
export const LSPAN = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

/* 추가 제목 스타일 */
export const LSPAN2 = styled.span`
  border-bottom: 4px solid #5e514d;
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0;
  padding: 20px 140px;
  color: #5e514d;
`;

/* 폼 그룹 스타일 */
export const LDIV2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

/* 추가 LDIV3 스타일 */
export const LDIV3 = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
`;

/* 추가 LDIV4 스타일 */
export const LDIV4 = styled.div`
  margin-top: 0.5rem;
`;

/* 입력 필드 스타일 */
export const LINPUT = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #5e514d;
    outline: none;
  }
`;

/* 로그인 버튼 스타일 */
export const LOGINBTN = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #5e514d;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #463e3b;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

/* 자동로그인 체크박스 */
export const CHKDIV = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #555;
`;

/* 체크박스 입력 */
export const CHKINPUT = styled.input`
  margin-right: 0.5rem;
`;

/* 에러 메시지 스타일 */
export const VALIDDIV = styled.div`
  font-size: 0.85rem;
  color: #d9534f;
  text-align: left;
`;

/* 로그인 버튼 감싸는 컨테이너 */
export const LOGINDIV = styled.div`
  width: 80%;
  margin: 1rem auto 0;
  display: grid;
`;

/* 하단 경계선 스타일 */
export const BORDERDIV = styled.div`
  border-top: 1px solid #ddd;
  margin: 20px 0;
  padding-top: 10px;
  color: #888;
`;

/* 소셜 버튼 스타일 */
export const SOCIALBTN = styled.img`
  width: 150px;
  height: auto;
  margin: 10px 0;
  cursor: pointer;
`;

/* 소셜 버튼 컨테이너 */
export const SOCIALDIV = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

/* 회원가입 링크 */
export const REGISTERLINK = styled(Link)`
  font-size: 1rem;
  color: #5e514d;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #463e3b;
  }
`;

/* 회원가입 버튼 스타일 */
export const LJOIN = styled.div`
  display: inline-block;
  padding: 10px 20px;
  border: 2px solid #5e514d;
  border-radius: 5px;
  color: #5e514d;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #5e514d;
    color: #fff;
  }
`;
