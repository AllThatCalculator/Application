import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  signOut,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

async function signUpWithEmail(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return error.code;
  }
}

async function signInWithEmail(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    return error.code;
  }
}

async function signOutAuth() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
}

async function deleteAuth() {
  try {
    await deleteUser(auth.currentUser);
    return true;
  } catch (error) {
    return error;
  }
}

async function signUpWithSocial(social) {
  let provider;
  switch (social) {
    case "google":
      provider = new GoogleAuthProvider();
      break;
    case "github":
      provider = new GithubAuthProvider();
      break;
    default:
      break;
  }

  try {
    await signInWithPopup(auth, provider);
    // !! (로그인한 사람은 login, signup 페이지에 들어오면 튕겨내기)
    // 이 사람이 이미 가입한 사람인지 확인하기 위해선
    // 암튼 로그인이 진행 될 것임.
    // 근데 이 로그인 된 찰나의 순간에 이 사람은 로그인을 했다고 생각해버려서
    // 튕겨내버리는 문제 때문에, 우선 로그인 진행되도록 하기
    return true;
    // const result = await signInWithPopup(auth, provider);
    // const { isNewUser } = await getAdditionalUserInfo(result);
    // console.log(isNewUser);
    // if (isNewUser) {
    //   // 새로운 유저 -> 회원가입 가능!
    //   return true;
    // } else {
    //   // 이미 존재하는 계정
    //   await signOutAuth();
    //   return false;
    // }
  } catch (error) {
    return error.code;
  }
}

async function signInWithSocial(social) {
  let provider;
  switch (social) {
    case "google":
      provider = new GoogleAuthProvider();
      break;
    case "github":
      provider = new GithubAuthProvider();
      break;
    default:
      break;
  }

  try {
    const result = await signInWithPopup(auth, provider);
    const { isNewUser } = await getAdditionalUserInfo(result);
    if (isNewUser) {
      // 새로운 유저 -> 존재하지 않는 계정
      // 로그인 실패
      await deleteAuth();
      return false;
    } else {
      // 로그인 성공
      return true;
    }
  } catch (error) {
    return error.code;
  }
}

async function checkAuthState() {
  try {
    let result = false;
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        result = true;
      }
    });
    return result;
  } catch (error) {
    return error.code;
  }
}

/**
 * find passward (비밀번호 재설정)
 * @param {*} email
 */
async function findPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    return error.code;
  }
}

/**
 * 현재 사용자가 입력한 현재 비밀번호로부터 credential 발급
 * @param {*} password
 */
function getCredential(password) {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );
  return credential;
}

/**
 * 발급받은 credential로 재로그인
 * @param {*} credential
 * @returns
 */
async function signInWithCredential(credential) {
  try {
    await reauthenticateWithCredential(auth.currentUser, credential);
    return true;
  } catch (error) {
    return error.code;
  }
}

/**
 * 비밀번호 변경
 * @param {*} newPassword
 * @returns
 */
async function updateNewPassword(newPassword) {
  try {
    await updatePassword(auth.currentUser, newPassword);
    return true;
  } catch (error) {
    return error.code;
  }
}

/**
 * get auth state
 * @param {*} refresh : 리프레시 여부
 * @returns
 */
async function getAuthState(refresh) {
  try {
    let result = false;
    const user = auth.currentUser;
    if (user !== null) {
      await user.getIdToken(refresh).then((token) => {
        result = token;
      });
    }
    return result;
  } catch (error) {
    return error.code;
  }
}

/**
 * get user uid
 * @returns
 */
async function getAuthUuid() {
  try {
    let result = false;
    const user = auth.currentUser;
    if (user !== null) {
      result = await user.uid;
    }
    return result;
  } catch (error) {
    return error.code;
  }
}

const firebaseAuth = {
  signUpWithEmail,
  signInWithEmail,
  signOutAuth,
  deleteAuth,
  signUpWithSocial,
  signInWithSocial,
  checkAuthState,
  findPassword,
  getCredential,
  signInWithCredential,
  updateNewPassword,
  getAuthState,
  getAuthUuid,
};
export default firebaseAuth;
