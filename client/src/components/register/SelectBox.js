import styled from "styled-components";
import { StyledIcon } from "../atom-components/ButtonTemplate.js";
import styles from "../styles.js";

// select 스타일 정의
const StyledSelectBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: ${styles.styleColor.blue900};
  padding: 0px 8px 0px 0px;
`;

// 기본 select에 오른쪽 구분선 들어간 스타일 정의
const StyledSelectBoxLine = styled(StyledSelectBox)`
  border-right: 1px solid ${styles.styleColor.blue50};
`;

// select 안 스타일 정의
const StyledSelect = styled.select`
  border: none;
  appearance: none;
  width: 100%;
  color: ${styles.styleColor.gray50};
  ${styles.sytleText.text100};
  option {
    color: ${styles.styleColor.black};
  }
  option:first-child {
    color: ${styles.styleColor.gray50};
  }
  :focus {
    outline: none;
  }
`;

/**
 * 기본 select 박스 컴포넌트
 * @param {object, function}
 * options: select 옵션들
 * onChange: select된 값 관리
 */
function SelectBox({ options, onChange }) {
  return (
    <StyledSelectBox>
      <StyledSelect onChange={onChange}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <StyledIcon name="CaretDownFill" />
    </StyledSelectBox>
  );
}

/**
 * 기본 select 박스에 오른쪽 구분선이 있는 컴포넌트
 * @param {object, function}
 * options: select 옵션들
 * onChange: select된 값 관리
 */
function SelectBoxLine({ options, onChange }) {
  return (
    <StyledSelectBoxLine>
      <StyledSelect onChange={onChange}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
      <StyledIcon name="CaretDownFill" />
    </StyledSelectBoxLine>
  );
}

export { SelectBox, SelectBoxLine };
