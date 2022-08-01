export default function updateCalculetCount(calculetId) {
  if (Number(calculetId) !== Number(localStorage.getItem("previewCalculet"))) {
    console.log("update!", calculetId);
    localStorage.setItem("previewCalculet", calculetId);
    localStorage.setItem("continueCnt", 1);
  } else {
    console.log("continue");
    const cnt = localStorage.getItem("continueCnt");
    localStorage.setItem("continueCnt", Number(cnt) + 1);
  }
}
