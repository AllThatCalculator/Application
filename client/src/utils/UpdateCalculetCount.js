function updateCalculetCount(calculetId) {
  if (Number(calculetId) !== Number(localStorage.getItem("previousCalculet"))) {
    // console.log("update!", calculetId);
    localStorage.setItem("previousCalculet", calculetId);
    localStorage.setItem("continueCnt", 1);
  } else {
    // console.log("continue");
    const cnt = localStorage.getItem("continueCnt");
    localStorage.setItem("continueCnt", Number(cnt) + 1);
  }
}

export default updateCalculetCount;
