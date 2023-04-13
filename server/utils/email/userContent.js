exports.userContent = (title, userName, button) => `
<!-- 제목 -->
<tr>
  <td align="left" style="padding-top: 0; padding-right: 0; padding-bottom: 30px; padding-left: 0;">
    <b style="font-size: 18px;">
      당신의 "${title}"이(가) 등록되었습니다!
    </b>
  </td>
</tr>
<!-- 본문-->
<tr>
  <td align="left" style="padding-top: 0; padding-right: 0; padding-bottom: 30px; padding-left: 0;">
    안녕하세요. ${userName}님, 당신이 등록한 계산기가 이제 세상에 알려지게 되었습니다.<br/>
    지금 바로 확인해보세요!
  </td>
</tr>
<!-- 바로가기 링크 -->
${button}
`;