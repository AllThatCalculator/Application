import styled, { keyframes } from "styled-components";
import styles from "../styles";
import { BtnSmallIcon } from "../atom-components/ButtonIcon";
import { FlexColumnLayout, FlexRowLayout } from "../Layout";

//스타일드 애니메이션
const slideDown = keyframes`
from {
  opacity: 0;
  margin-top: -50px;
}
to {
  opacity: 1;
  margin-top: 0;
}
`;
const StyledSlideDown = styled.div`
  animation: ${slideDown} 1s;
`;
// 바깥 검정 배경
const StyledBackground = styled(FlexColumnLayout)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 60px;
  left: 0;
  align-items: center;
  background: ${styles.styleColor.black50a};

  z-index: 99;
`;
// 정가운데 위치
const StyledCenter = styled.div`
  position: absolute;
  z-index: 99;
  top: 110px;
`;
// 모달 Base
const StyledBox = styled.div`
  ${styles.styleSize.modalCalculetInfo};
  background: ${styles.styleColor.blue30};
  padding-top: ${styles.styleLayout.basic1000};
  ${styles.styleBorder.basic200};
  ${styles.styleEffect.opacity300};
`;
// 모달 헤더
const StyledHeader = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;

  justify-content: flex-end;
  padding: ${styles.styleLayout.basic100};
  background: ${styles.styleColor.white300};

  ${styles.styleBorder.basic200};
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;

  ${styles.styleEffect.opacity100};
`;
// 모달 헤더 아랫부분 감쌈
const PositionerUnder = styled.div`
  height: 100%;
`;

/**
 * 모달(팝업창) 반환하는 함수 - 화면 정가운데에 위치 고정 안 함
 *
 * @param {function, function} param0
 * onClick : X 버튼 눌렀을 때 일어나는 이벤트
 * contents : 모달 안에 넣을 내용물
 */
function ModalNonFix({ onClick, contents }) {
  return (
    <StyledSlideDown>
      <StyledBox>
        <StyledHeader>
          <BtnSmallIcon
            text="닫기"
            icon="X"
            color="blue"
            onClick={onClick}
            type="button"
          />
        </StyledHeader>
        <PositionerUnder>{contents}</PositionerUnder>
      </StyledBox>
    </StyledSlideDown>
  );
}

/**
 * 모달(팝업창) 반환하는 함수 - 화면 정가운데에 위치 고정
 *
 * @param {function, function} param0
 * onClick : X 버튼 눌렀을 때 일어나는 이벤트
 * contents : 모달 안에 넣을 내용물
 */
function Modal({ onClick, contents }) {
  return (
    <StyledBackground>
      <StyledCenter>
        <ModalNonFix onClick={onClick} contents={contents} />
      </StyledCenter>
    </StyledBackground>
  );
}
export { Modal, ModalNonFix };
