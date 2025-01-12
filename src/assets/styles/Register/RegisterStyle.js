import styled from "styled-components";

/* 기본 입력 필드 스타일 */
export const RINPUT = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #000000; /* 검정색 테두리 */
  border-radius: 5px;
  font-size: 1rem;
  background-color: #ffffff; /* 흰색 배경 */
  color: #000000; /* 검정색 텍스트 */
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #333333; /* 어두운 검정색 포커스 */
    outline: none;
  }
`;

/* 우편번호 입력 필드 */
export const RZINPUT = styled(RINPUT)`
  width: calc(100% - 110px); /* 너비 조정 */
  display: inline-block;
  margin-right: 10px;
`;

/* 기타 스타일 */
export const RBUTTON = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const RDIV = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 40px 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const RDIV2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const RNDIV = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
`;

export const RTEXTDIV = styled.div`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #000000;
`;

export const RDIV3 = styled.div`
  margin: 20px auto;
  padding: 20px;
  border-bottom: 2px solid #000000;
  text-align: left;
`;

export const LOGINBTN = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #000000;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333333;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;


/* 에러 메시지 스타일 */
export const RVALIDDIV = styled.div`
  font-size: 0.85rem;
  color: #d9534f; /* 빨간색 텍스트 */
  margin-top: 5px;
  text-align: left;
`;
