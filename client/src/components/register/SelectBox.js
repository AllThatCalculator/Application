import { useEffect, useRef, useState } from "react";
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

  border-right: ${(props) =>
    props.isLine ? `1px solid ${styles.styleColor.blue50}` : `0px`};

  cursor: pointer;
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

  cursor: pointer;
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

/**
 * select 박스의 option 하나에 대한 컴포넌트
 * @param {object} props
 * value: 각 option의 value
 * onClick: option 클릭 시 실행되는 onClick 함수
 * item: 현재 선택된 option의 value
 * name: 각 option의 name
 * @returns
 */
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
 * 기본 select 박스에 대한 컴포넌트
 * @param {array, string, string, function, boolean}
 * options: select 박스에 대한 option 리스트들
 * placeholder: select 박스 선택 전 보이는 회색 글씨에 대한 내용
 * selected: 선택된 option의 name 저장
 * onChange: 선택한 option이 바뀔 때 일어나는 함수
 * isLine: select 박스의 오른쪽에 구분선이 있는지 없는지를 나타내는 변수
 * @returns
 */
function DefaultSelectBox({
  options,
  placeholder,
  selected,
  onChange,
  isLine,
}) {
  // option box 활성화 상태에 대한 변수
  const [isActive, setIsActive] = useState(false);
  // 현재 선택된 option item의 value 저장
  const [item, setItem] = useState(null);

  // 현재 컴포넌트에 접근하기 위한 useRef (컴포넌트 밖 영역 클릭 시 컴포넌트 닫히도록 하기 위해 필요)
  const modalRef = useRef();

  function onActiveToggle() {
    setIsActive((prev) => !prev);
  }

  function onSelectItem(event) {
    onChange(event);
    const targetValue = event.target.value;
    setItem(targetValue);
    setIsActive(false);
  }

  function clickModalOutside(event) {
    if (!modalRef.current.contains(event.target)) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  }, []);

  return (
    <Wrapper ref={modalRef}>
      <StyledSelectBox onClick={onActiveToggle} isLine={isLine}>
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
 * 구분선이 없는 select 박스 컴포넌트
 * @param {array, string, string, function}
 * options: select 박스에 대한 option 리스트들
 * placeholder: select 박스 선택 전 보이는 회색 글씨에 대한 내용
 * selected: 선택된 option의 name 저장
 * onChange: 선택한 option이 바뀔 때 일어나는 함수
 */
function SelectBox({ options, placeholder, selected, onChange }) {
  return (
    <DefaultSelectBox
      options={options}
      placeholder={placeholder}
      selected={selected}
      onChange={onChange}
      isLine={false}
    />
  );
}

/**
 * 구분선이 있는 select 박스 컴포넌트
 * @param {array, string, string, function}
 * options: select 박스에 대한 option 리스트들
 * placeholder: select 박스 선택 전 보이는 회색 글씨에 대한 내용
 * selected: 선택된 option의 name 저장
 * onChange: 선택한 option이 바뀔 때 일어나는 함수
 */
function SelectBoxLine({ options, placeholder, selected, onChange }) {
  return (
    <DefaultSelectBox
      options={options}
      placeholder={placeholder}
      selected={selected}
      onChange={onChange}
      isLine={true}
    />
  );
}

export { SelectBox, SelectBoxLine };
