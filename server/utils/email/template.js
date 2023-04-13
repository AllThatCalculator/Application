exports.emailTemplate = (content) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"> -->
  <body>
    <!-- OUTERMOST CONTAINER TABLE -->
    <table
      style="
        width: 100% !important;
        height: 100% !important;
        margin: 0;
        padding: 0;
        font-family: S-CoreDream-4Regular;
        padding: 20px 0 30px 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      "
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      id="bodyTable"
    >
      <tr>
        <td>
          <!-- 600px - 800px CONTENTS CONTAINER TABLE -->
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="600"
            style="font-size: 16px"
          >
            <!-- 너비 고정용 이미지 -->
            <tr>
              <td style="font-size: 0; line-height: 0; height: 0" height="0">
                <img
                  alt=""
                  src="http://via.placeholder.com/600x1"
                  style="display: block"
                  width="600"
                  height="0"
                />
              </td>
            </tr>
            <!-- 로고 이미지 -->
            <tr>
              <td
                align="center"
                style="
                  padding-top: 0;
                  padding-right: 0;
                  padding-bottom: 30px;
                  padding-left: 0;
                "
              >
                <img
                  src="https://allthatcalculator.io/ATCLogoBlueImgText.png"
                  alt="ATC logo"
                  width="60%"
                  style="
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                  "
                />
              </td>
            </tr>
            ${content}
            <tr>
              <table width="100%">
                <tr>
                  <td
                    align="left"
                    valign="middle"
                    style="
                      padding-top: 0;
                      padding-right: 0;
                      padding-bottom: 30px;
                      padding-left: 0;
                    "
                  >
                    <img
                      src="https://allthatcalculator.io/ATCLogoBlueImg_32x32.png"
                      alt="ATC logo"
                      height="32px"
                      width="32px"
                      style="
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                      "
                    />
                  </td>
                  <td
                    align="left"
                    style="
                      padding-top: 0;
                      padding-right: 0;
                      padding-bottom: 30px;
                      padding-left: 0;
                    "
                  >
                    <b style="font-size: 18px"> All That Calculator<br /> </b>
                    contact: allthatcalculator@gmail.com
                  </td>
                </tr>
              </table>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
