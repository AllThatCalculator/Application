import getUserInfo from "../user-actions/getUserInfo";

async function handleGetUserInfo(idToken) {
  let result = {
    userName: "",
    profileImgSrc: "",
    job: "",
    bio: "",
    email: "",
    birthdate: "",
    sex: "",
  };
  /** set user info */
  await getUserInfo(idToken).then((data) => {
    result = data;
  });

  return result;
}

export { handleGetUserInfo };
