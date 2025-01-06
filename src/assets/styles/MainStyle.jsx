import styled from "styled-components"

export const LOGO_IMG = styled.img`
  width: 50px; /* 로고의 너비 */
  height: 50px; /* 비율을 유지하며 높이를 자동 조정 */
  margin-right: 10px; /* 로고와 텍스트 사이의 여백 */
`;

export const CONTAINER_TAB = styled.div `
  width: 1020px;
  margin: auto;
  padding-bottom: 3rem;
`
export const SLIDER = styled.div `
  /* 슬라이더가로스크롤바 생기는 문제 */
  overflow: hidden;
  padding-bottom: 3rem; /* 패딩 안주면 dot 버튼 사라짐 */
`
export const SLIDEIMG = styled.img `
  width: 100%;
  height: 740px;
`