import { Components } from "./ComponentOptions";

const TEXT_LIMIT = { label: 10 };

/**
 * 컴포넌트 하나에 필요한 속성 모두 입력되었는지 검사
 * @param {object} inputs: 컴포넌트 속성 입력값
 * @param {object} properties: 컴포넌트 속성을 컴포넌트로 만들기 위한 속성 정보
 */
function validateOneComponent(components, inputs) {
  const properties = Components[inputs.componentType];
  for (const key in properties) {
    if (
      Boolean(properties[key].required) &&
      (!inputs[key] || Object.keys(inputs[key]).length === 0)
    ) {
      // 필수로 입력되어야 하는 속성인데, inputs에 없다면
      return false;
    }
    if (
      // 글자 수 제한 있는 속성이 길이를 넘었다면
      Object.keys(TEXT_LIMIT).includes(key) &&
      !validateCharacterLimit(String(inputs[key]), TEXT_LIMIT[key])
    ) {
      return false;
    }
  }
  // isInput or isOutput 속성 확인
  if (!inputs.isInput && !inputs.isOutput) {
    return false;
  }
  // 변수명이 존재한다면
  if (
    properties.id &&
    Boolean(validateDuplicatedId(components, inputs)) === false
  ) {
    return false;
  }
  // 옵션이 있는 컴포넌트라면 옵션 value 중복 확인
  if (inputs.options) {
    for (const key in inputs.options) {
      if (
        !validateDuplicateOptionValue(inputs.options, key, inputs.options[key])
      ) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 변수명 중복 검사
 * @param {object} components: 컴포넌트 속성 입력값 객체를 여러 개 담고있는 컴포넌트 객체
 * @param {object} target: 확인하려는 컴포넌트의 속성
 */
function validateDuplicatedId(components, target) {
  if (!target.id) {
    return null;
  }
  for (const key in components) {
    if (String(target.componentId) === String(components[key].componentId)) {
      continue;
    }
    if (String(target.id) === String(components[key].id)) {
      return false;
    }
  }
  return true;
}

// 옵션 아이템 value값 중복 검사
function validateDuplicateOptionValue(options, targetKey, target) {
  if (!target.value) {
    return null;
  }
  for (const optionKey in options) {
    if (String(optionKey) === String(targetKey)) {
      continue;
    }
    if (String(options[optionKey].value) === String(target.value)) {
      return false;
    }
  }
  return true;
}

// 글자 수 제한하는 속성(ex. label)에 대한 검사
function validateCharacterLimit(targetText, limit) {
  if (targetText.length > limit) {
    return false;
  }
  return true;
}

// 모든 컴포넌트 입력 완료되었는지 검사
function validateAllComponents(components) {
  for (const key in components) {
    if (!validateOneComponent(components, components[key])) {
      return false;
    }
  }
  return true;
}

export {
  validateOneComponent,
  validateAllComponents,
  validateCharacterLimit,
  validateDuplicatedId,
  validateDuplicateOptionValue,
};
