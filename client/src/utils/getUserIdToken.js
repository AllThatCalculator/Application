import { auth } from "../firebase";
import firebaseAuth from "../firebaseAuth";

/**
 * 유저 id token 가져오기
 */
async function getUserIdToken() {
  let result = null;

  const request = await firebaseAuth.checkAuthState();

  // 로그인 한 유저
  if (request) {
    await auth.currentUser.getIdToken(true).then((token) => {
      result = token;
    });
  }

  if (result === null) return false;
  return result;
}
export default getUserIdToken;
