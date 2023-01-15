import { useParams } from "react-router-dom";

/**
 * 현재 url에서 id 뽑아 내기
 */
function useGetUrlParam() {
  // key=value 형태
  //   let param = new URLSearchParams(window.location.search);
  //   let calculetId = param.get(URL.CALCULET_ID);

  // URL에 포함되어있는 Key, Value 형식의 객체를 반환
  // /:id
  let { id } = useParams();

  return { id };
}
export default useGetUrlParam;
