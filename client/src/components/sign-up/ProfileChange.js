import { useRef } from "react";
import { StyledCircleImg } from "../atom-components/BoxIcon";
import { BtnText } from "../atom-components/ButtonTemplate";
import { FlexColumnLayout, FlexRowLayout } from "../Layout";
/**
 * 프로필 이미지 컴포넌트
 * 사진 변경 함수 포함
 *
 * @param {string, funtion} info
 * profileImg : 이미지 링크
 * setProfileImg : 이미지 링크 변경하는 함수
 */
function ProfileChange({ profileImg, setProfileImg }) {
  /**
   * Ref를 사용해서 input태그 참조
   */
  const fileInput = useRef(null);
  function changeProfileImg() {
    fileInput.current.click();
  }
  /**
   * 선택한 파일로 프로필 사진 업로드 되는 Change 함수
   * @param {*} event
   */
  function onChange(event) {
    setProfileImg("/img/" + event.target.files[0].name);
  }
  return (
    <FlexRowLayout>
      <FlexColumnLayout gap="10px">
        <StyledCircleImg src={profileImg} width="64px" />

        <BtnText text="사진 변경" onClick={changeProfileImg} />
        <input
          type="file"
          ref={fileInput}
          onChange={onChange}
          style={{ display: "none" }}
        />
      </FlexColumnLayout>
    </FlexRowLayout>
  );
}
export default ProfileChange;
