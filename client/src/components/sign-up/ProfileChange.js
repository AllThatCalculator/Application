import { useRef, useState } from "react";
import styled from "styled-components";
import { StyledCircleImg } from "../atom-components/BoxIcon";
import { BtnText } from "../atom-components/ButtonTemplate";
import { FlexColumnLayout, FlexRowLayout } from "../Layout";

/**
 * 가운데 정렬
 */
const Wrapper = styled(FlexColumnLayout)`
  align-items: center;
`;

/**
 * 프로필 이미지 컴포넌트
 * 사진 변경 함수 포함
 *
 * @param {string, funtion}
 * profileImg : 이미지 state
 * setProfileImg : 이미지 state 변경하는 함수
 */
function ProfileChange({ profileImg, setProfileImg }) {
  /**
   * 사용자가 프로필 사진 변경했는지 여부
   */
  const [isUserImg, setIsUserImg] = useState(false);
  /**
   * Ref를 사용해서 input태그 참조
   * -> 사진 번경 버튼 누르면, 사진 선택 가능
   */
  const imageInput = useRef(null);
  function changeImageSrc() {
    imageInput.current.click();
  }
  /**
   * 이미지 제거
   * -> 기본이미지로 변경
   */
  function removeImage() {
    setIsUserImg(false);
    setProfileImg("/img/defaultProfile.png");
  }

  /**
   * 이미지를 인코딩하여 이미지 state를 변경하는 함수
   *
   * <FileReader>
   * File, Blob 객체를 사용해 특정 파일을 읽어들여 자바스크립트에서 파일에 접근할 수 있도록 도와주는 도구
   *
   * <readAsDataURL>
   * File, Blob 을 읽은 뒤 base64로 인코딩한 문자열을 FileReader 인스턴스의 result라는 속성에 담아줌.
   * -> 사용자가 선택한 이미지를 base64로 인코딩하여 profileImg 라는 state 안에 넣어줌.
   *
   * <FileReader.onload>
   * FileReader가 성공적으로 파일을 읽어들였을 때 트리거 되는 이벤트 핸들러
   * -> 이 핸들러 내부에 우리가 원하는 이미지 프리뷰 로직을 넣어줌.
   *
   * resolve를 호출하여 Promise를 이행상태로 만들어줌.
   *
   * @param {Blob}
   *
   * fileBlob : 인코딩할 문자열 image src
   */
  function encodeFileToBase64(fileBlob) {
    setIsUserImg(true);

    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setProfileImg(reader.result);
        resolve();
      };
    });
  }
  /**
   * 변경한 이미지 미리 보기
   * -> 기본 이미지면, 이미지 추가
   * -> 이미지 추가했으면, 이미지 변경 & 이미지 제거
   * @param {*} event
   *
   * event : 선택된 이미지를 참조하기 위한 event
   */
  function onChange(event) {
    encodeFileToBase64(event.target.files[0]);
  }
  return (
    <FlexRowLayout>
      <Wrapper gap="10px">
        <StyledCircleImg src={profileImg} width="64px" height="64px" />
        {!isUserImg ? (
          <BtnText
            text="이미지 추가"
            icon="PencilFill"
            onClick={changeImageSrc}
          />
        ) : (
          <FlexRowLayout gap="10px">
            <BtnText text="변경" icon="PencilFill" onClick={changeImageSrc} />
            <BtnText text="제거" icon="Trash3Fill" onClick={removeImage} />
          </FlexRowLayout>
        )}

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={imageInput}
          onChange={onChange}
        />
      </Wrapper>
    </FlexRowLayout>
  );
}
export default ProfileChange;
