import { useState } from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { StyledIcon } from "../atom-components/ButtonTemplate.js";
import styles from "../styles.js";

// select 박스와 option 박스를 감싸는 스타일 정의
const Wrapper = styled.div`
  align-items: center;
  position: relative;
  width: 100%;
`;

// select 박스 스타일 정의
const StyledSelectBox = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: none;
  background: ${styles.styleColor.white300};
  color: ${styles.styleColor.blue900};
  padding: 0px 8px 0px 0px;

  cursor: pointer;
`;

// 기본 select에 오른쪽 구분선 들어간 스타일 정의
const StyledSelectBoxLine = styled(StyledSelectBox)`
  border-right: 1px solid ${styles.styleColor.blue50};
`;

// select 안 스타일 정의
const StyledSelectText = styled.input`
  pointer-events: none;
  border: none;
  width: 100%;
  background: ${styles.styleColor.white300};
  color: ${styles.styleColor.black};
  ${styles.sytleText.text100};
  ::placeholder {
    color: ${styles.styleColor.gray50};
  }
  :focus {
    outline: none;
  }
`;

// option box 감싸는 스타일 정의
const OptionWrapper = styled.div`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  padding: 3px 0px;
  margin-top: 14px;
  width: 97%;
  position: absolute;
  z-index: 2;
`;

// option box 스타일 정의
const StyledOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 100%;

  background: ${styles.styleColor.white300};
  border: 1px solid ${styles.styleColor.blue50};
  ${styles.styleEffect.opacity300};
  border-radius: 7px;
`;

// option item 스타일 정의
const StyledOptionItem = styled.button`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 10px;
  gap: 8px;
  border: none;
  background: none;

  width: 100%;

  ${styles.sytleText.text100};

  border-bottom: 1px solid ${styles.styleColor.blue50};

  &: first-child {
    border-radius: 7px 7px 0px 0px;
  }

  &:hover {
    background: ${styles.styleColor.blue30};
  }

  &:last-child {
    border-bottom: none;
    border-radius: 0px 0px 7px 7px;
  }
`;

// 선택된 옵션 아이템 스타일 정의
const StyledOptionSelect = styled.div`
  ${styles.sytleText.buttonWhite};
  pointer-events: none;
`;

// 선택된 옵션 아이템의 아이콘 스타일 정의
const StyledIconSelect = styled.div`
  width: 14px;
  opacity: ${(props) => (props.item === props.value ? `1` : `0`)};
  pointer-events: none;
`;

function Option(props) {
  return (
    <StyledOptionItem value={props.value} onClick={props.onClick}>
      <StyledIconSelect item={props.item} value={props.value}>
        <StyledIcon name="CheckLg" />
      </StyledIconSelect>
      {props.item === props.value ? (
        <StyledOptionSelect>{props.name}</StyledOptionSelect>
      ) : (
        <>{props.name}</>
      )}
    </StyledOptionItem>
  );
}

/**
 * 기본 select 박스 컴포넌트
 * @param {object, function}
 * options: select 옵션들
 * onChange: select된 값 관리
 */
function SelectBox({ options, placeholder, selected, onChange }) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const [item, setItem] = useState(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = (e) => {
    onChange(e);
    console.log(e.target.value);
    const targetId = e.target.value;
    const option = options.filter((x) => x.value === targetId);
    setItem(targetId);
    setIsActive(false);
    if (option) {
      setValue(option[0].name);
    }
  };

  return (
    <Wrapper>
      <StyledSelectBox onClick={onActiveToggle}>
        <StyledSelectText
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={selected}
          disabled
        />
        <StyledIcon name="CaretDownFill" />
      </StyledSelectBox>
      <OptionWrapper isActive={isActive}>
        <StyledOptionBox>
          {options &&
            options.map((option) => (
              <Option
                value={option.value}
                name={option.name}
                key={option.value}
                item={item}
                onClick={onSelectItem}
              />
            ))}
        </StyledOptionBox>
      </OptionWrapper>
    </Wrapper>
  );
}

/**
 * 기본 select 박스에 오른쪽 구분선이 있는 컴포넌트
 * @param {object, function}
 * options: select 옵션들
 * onChange: select된 값 관리
 */
function SelectBoxLine({ options, placeholder, selected, onChange }) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("");
  const [item, setItem] = useState(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = (e) => {
    onChange(e);
    console.log(e.target.value);
    const targetId = e.target.value;
    const option = options.filter((x) => x.value === targetId);
    setItem(targetId);
    setIsActive(false);
    if (option) {
      setValue(option[0].name);
    }
  };

  return (
    <Wrapper>
      <StyledSelectBoxLine onClick={onActiveToggle}>
        <StyledSelectText
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={selected}
          disabled
        />
        <StyledIcon name="CaretDownFill" />
      </StyledSelectBoxLine>
      <OptionWrapper isActive={isActive}>
        <StyledOptionBox>
          {options &&
            options.map((option) => (
              <Option
                value={option.value}
                name={option.name}
                key={option.value}
                item={item}
                onClick={onSelectItem}
              />
            ))}
        </StyledOptionBox>
      </OptionWrapper>
    </Wrapper>
  );
}

export { SelectBox, SelectBoxLine };
