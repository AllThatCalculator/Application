/**
 * (임시 사용) 카테고리 바에 들어갈 계산기 대분류 & 소분류 정보
 */
const CategoryItems = [
  {
    category_main: "수학",
    category_sub: [
      {
        name: "계산",
        calculets: ["사칙연산", "변수", "함수", "미적분 계산기"],
      },
      { name: "통계", calculets: [] },
      { name: "기하", calculets: ["각도", "외심내심"] },
    ],
  },
  {
    category_main: "과학-공학",
    category_sub: [
      { name: "과학", calculets: ["단위 변환기", "물리 계산기"] },
      { name: "공학", calculets: ["진법 계산기"] },
    ],
  },
];
export { CategoryItems };
