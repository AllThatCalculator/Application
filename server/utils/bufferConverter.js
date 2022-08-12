module.exports = {
  /**
   * buffer 데이터를 string 형태로 바꿔주는 함수
   * @param {buffer}
   * value: buffer 상태 데이터
   * @returns
   */
  bufferToString: (value) => {
    return Buffer.from(value).toString();
  },
  /**
   * buffer 데이터(이미지)를 base64String으로 인코딩해서 src 생성하는 함수
   * @param {buffer}
   * value: buffer 상태 데이터 (이미지)
   * @returns
   */
  bufferToImageSrc: (value) => {
    if (value === null) {
      return "/img/defaultProfile.png";
    }
    const base64String = Buffer.from(value).toString("base64");
    return `data:image/png;base64,${base64String}`;
  },
};
