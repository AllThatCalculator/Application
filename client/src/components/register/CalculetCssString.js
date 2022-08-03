const CalculetCss = `
@font-face {
    font-family: "S-CoreDream-3Light";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "S-CoreDream-4Regular";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-4Regular.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "S-CoreDream-5Medium";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-5Medium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "S-CoreDream-6Bold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-6Bold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "S-CoreDream-7ExtraBold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-7ExtraBold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  *{
    padding: 0px;
    margin: 0px;
}

.atc-calculet-input {
}

.atc-calculet-output {
}

.atc-calculet-save {
  display: flex;
  outline-style: none;
  border: none;
  background-color: #9cb2df;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  padding: 8px;
  height: 30px;
  font-family: "S-CoreDream-4Regular";
  font-size: 14px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition-duration: 0.3s;
}

.atc-calculet-save:hover {
  background-color: #6f8ac3;
  cursor: pointer;
}

.atc-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  gap: 10px;

  height: 37px;

  font-family: "S-CoreDream-5Medium";
  font-size: 12px;
  color: #143578;

  /* white300 */

  outline-style: none;
  border: none;
  background: #ffffff;

  /* opacity100 */

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
}

.atc-button:hover {
  background: #143578;
  color: #ffffff;
  cursor: pointer;
}

.atc-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 10px;

  height: 21px;

  font-family: "S-CoreDream-4Regular";
  font-size: 14px;
  color: #000;

  /* white300 */

  background: #ffffff;
  /* opacity50 */

  outline-style: none;
  border: none;
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
}

.atc-input:placeholder {
    color: #929292bf;
}

.atc-input:focus {
    outline: none;
}

.atc-output {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 10px;

  height: 21px;

  font-family: "S-CoreDream-4Regular";
  font-size: 14px;
  color: #000;

  /* white300 */

  background: #ffffff;
  /* opacity50 */

  border: none;
  box-shadow: inset 0px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
}

.atc-output:focus {
    outline: none;
}
`;

export default CalculetCss;
