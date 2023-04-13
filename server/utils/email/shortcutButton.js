exports.shortcutButton = (url, label) => `
<tr>
  <td align="center" style="padding-top: 0; padding-right: 0; padding-bottom: 30px; padding-left: 0;">
    <a style="
    display: block;
    padding: 10px 12px;
    gap: 10px;
    text-decoration: none;
    color: #ffffff;
    background: #143578;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 7px;" 
    href=${url} target="_blank" >
      바로가기
    </a>
  </td>
</tr>
`;