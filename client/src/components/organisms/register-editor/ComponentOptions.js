/**
 * 컴포넌트 속성들에 대한 정보를 담은 객체
 * common : 공통으로 쓰이는 속성
 * key : 속성 이름 (mui에서 쓰이는 속성 이름과 동일)
 * value :
 *   - type : string - textfield, bool - checkbox, select - select box
 *   - name : 페이지에 표시되는 이름 (label)
 *   - required : 필수로 입력되어야 하는 속성인지
 *   - options : select box에 표시되는 옵션들
 *     - value : 옵션 id (mui에 넘어갈 value)
 *     - name : 페이지에 표시되는 이름 (label)
 */
const Components = {
  common: {
    id: {
      type: "string",
      name: "변수명",
      required: true,
    },
    label: {
      type: "string",
      name: "설명",
      required: true,
    },
    required: {
      type: "bool",
      name: "필수 여부",
      required: false,
    },
    disabled: {
      type: "bool",
      name: "비활성화",
      required: false,
    },
  },
  textField: {
    isInput: {
      type: "bool",
      name: "입력 여부",
      required: false,
    },
    isOutput: {
      type: "bool",
      name: "출력 여부",
      required: false,
    },
    copyButton: {
      type: "bool",
      name: "복사 버튼",
      required: false,
    },
    type: {
      type: "select",
      options: [
        { value: "text", name: "문자열" },
        { value: "email", name: "이메일" },
        { value: "tel", name: "전화번호" },
        { value: "number", name: "숫자" },
        { value: "password", name: "비밀번호" },
      ],
      required: false,
    },
    placeholder: {
      type: "string",
      name: "placeholder",
      required: false,
    },
    defaultValue: { type: "string", name: "기본값", required: false },
  },
};

export { Components };
