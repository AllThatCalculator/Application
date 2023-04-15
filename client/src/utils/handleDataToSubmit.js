function handleUserInfoData(dataToSubmit) {
  const formData = new FormData(); // 서버에 보내기 위한 form
  // img file
  if (dataToSubmit.profileImg === null) {
    formData.append("profileImg", "");
  } else {
    formData.append("profileImg", dataToSubmit.profileImg);
  }
  // user info
  formData.append("userInfo", JSON.stringify(dataToSubmit.userInfo)); // object -> json -> payload로 감싸기
  return formData;
}
export { handleUserInfoData };
