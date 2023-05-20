const DATA_MY_CALCULET_HEAD_CELLS = [
  { headCell: "계산기 정보", align: "left" },
  { headCell: "공개 상태", align: "left" },
  { headCell: "시간", align: "left" },
  { headCell: "조회수", align: "right" },
  { headCell: "좋아요", align: "right" },
  { headCell: "북마크", align: "right" },
];

const DATA_MY_CALCULET_BLOCKED = [
  { id: 0, status: "공개", color: "success.light" },
  { id: 1, status: "신고 받은 계산기", color: "error.main" },
  { id: 2, status: "임시 계산기", color: "text.disabled" },
];

export { DATA_MY_CALCULET_HEAD_CELLS, DATA_MY_CALCULET_BLOCKED };
