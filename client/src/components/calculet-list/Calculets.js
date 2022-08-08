/** 대분류 */
const MATH = "수학";
const SCIENCE = "과학-공학";
const ECONOMY = "경제-사회";
const DAILY = "일상";
const ETC = "기타";

/**계산기 전체 목록 계산기 더미 */
const CALCULETS = [
  {
    category_main: MATH,
    main_items: [
      {
        category_sub: "계산",
        sub_items: [
          {
            id: 1,
            title: "사칙 연산",
          },
          {
            id: 2,
            title: "변수",
          },
          {
            id: 3,
            title: "함수",
          },
          {
            id: 4,
            title: "미적분 계산기",
          },
        ],
      },
      {
        category_sub: "통계",
        sub_items: [],
      },
      {
        category_sub: "기하",
        sub_items: [
          {
            id: 5,
            title: "각도",
          },
          {
            id: 6,
            title: "외심 내심",
          },
        ],
      },
    ],
  },
  {
    category_main: SCIENCE,
    main_items: [
      {
        category_sub: "과학",
        sub_items: [
          {
            id: 7,
            title: "단위 변환기",
          },
          {
            id: 8,
            title: "물리 계산기",
          },
        ],
      },
      {
        category_sub: "공학",
        sub_items: [
          {
            id: 9,
            title: "단위 변환기",
          },
          {
            id: 10,
            title: "진법 계산기",
          },
        ],
      },
    ],
  },
  {
    category_main: ECONOMY,
    main_items: [
      {
        category_sub: "경제",
        sub_items: [
          {
            id: 11,
            title: "적금 계산기",
          },
          {
            id: 12,
            title: "주식계산기",
          },
          {
            id: 13,
            title: "시급 계산기",
          },
        ],
      },
      {
        category_sub: "사회",
        sub_items: [],
      },
    ],
  },
  {
    category_main: DAILY,
    main_items: [
      {
        category_sub: "시간 & 날짜",
        sub_items: [
          {
            id: 14,
            title: "D-Day 계산기",
          },
          {
            id: 15,
            title: "배란일 계산기",
          },
          {
            id: 16,
            title: "세계 시간 계산기",
          },
          {
            id: 17,
            title: "음력 계산기",
          },
        ],
      },
      {
        category_sub: "운동",
        sub_items: [
          {
            id: 14,
            title: "운동량 계산기",
          },
        ],
      },
    ],
  },
  {
    category_main: ETC,
    main_items: [],
  },
];
export { MATH, SCIENCE, ECONOMY, DAILY, ETC, CALCULETS };
