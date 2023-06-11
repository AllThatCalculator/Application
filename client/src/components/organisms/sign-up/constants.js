import fillOptionsList from "./fillOptionsList";

/** 닉네임 최대 길이 */
const USERNAME_LIMIT = 20;
/** 직업 최대 길이 */
const JOB_LIMIT = 25;
/** 자기소개 문구 최대 길이 */
const BIO_LIMIT = 200;

// 이메일 옵션
const OPTIONS_EMAIL_ADDRESS = [
  { value: "default", name: "직접 입력" },
  { value: "naver", name: "naver.com" },
  { value: "google", name: "google.com" },
  { value: "hanmail", name: "hanmail.net" },
  { value: "ewhain", name: "ewhain.net" },
];

/**
 * 성별 옵션 - 여, 남
 */
const OPTIONS_SEX = [
  { value: "F", name: "여성" },
  { value: "M", name: "남성" },
];

/**
 * 생년월일 옵션 - 년도 (내림차순)
 */
const now = new Date();
const OPTIONS_YEAR = fillOptionsList(
  now.getFullYear() - 100,
  now.getFullYear()
).reverse();
/**
 * 생년월일 옵션 - 월 01~12
 */
const OPTIONS_MONTH = fillOptionsList(1, 12);
/**
 * 생년월일 옵션 - 일 01~31
 */
const OPTIONS_DATE = fillOptionsList(1, 31);

export {
  USERNAME_LIMIT,
  JOB_LIMIT,
  BIO_LIMIT,
  OPTIONS_EMAIL_ADDRESS,
  OPTIONS_SEX,
  OPTIONS_MONTH,
  OPTIONS_YEAR,
  OPTIONS_DATE,
};
