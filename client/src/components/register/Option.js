// 카테고리 대분류 옵션
const OPTIONS_BIG_CATEGORY = [
  { value: "math", name: "수학" },
  { value: "science", name: "과학-공학" },
  { value: "social", name: "경제-사회" },
  { value: "life", name: "일상" },
  { value: "etc", name: "기타" },
];

// 카테고리 소분류 옵션
const OPTIONS_SMALL_CATEGORY = [
  {
    big: "math",
    options: [
      { value: "calculation", name: "계산" },
      { value: "statistics", name: "통계" },
      { value: "geometry", name: "기하" },
    ],
  },
  {
    big: "science",
    options: [
      { value: "science", name: "과학" },
      { value: "engineering", name: "공학" },
    ],
  },
  {
    big: "social",
    options: [{ value: "economy", name: "경제" }],
  },
  {
    big: "life",
    options: [
      { value: "time", name: "시간 & 날짜" },
      { value: "exercise", name: "운동" },
      { value: "shopping", name: "쇼핑" },
      { value: "school", name: "학교" },
    ],
  },
];

// 이메일 옵션
const OPTIONS_EMAIL_ADDRESS = [
  { value: "default", name: "직접 입력" },
  { value: "naver", name: "naver.com" },
  { value: "google", name: "google.com" },
  { value: "hanmail", name: "hanmail.net" },
  { value: "ewhain", name: "ewhain.net" },
];

export { OPTIONS_BIG_CATEGORY, OPTIONS_SMALL_CATEGORY, OPTIONS_EMAIL_ADDRESS };
