function handleUserInfoData(dataToSubmit) {
  const { profileImg, userInfo } = dataToSubmit;

  const formData = new FormData(); // 서버에 보내기 위한 form
  // img file
  // if (profileImg === null) {
  //   formData.append("profileImg", "");
  // } else {
  // }

  formData.append("profileImg", profileImg === null ? "" : profileImg);

  // user info
  formData.append("userInfo", JSON.stringify(userInfo)); // object -> json -> payload로 감싸기

  return formData;
}
export { handleUserInfoData };
