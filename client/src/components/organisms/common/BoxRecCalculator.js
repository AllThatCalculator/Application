import {
  Avatar,
  ButtonBase,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { FlexBox, FlexColumnBox } from "./FlexBox.js";
import useSx from "../../../hooks/useSx.js";
import usePage from "../../../hooks/usePage.js";

/**
 *
 * 추천 계산기 컴포넌트(카드 같이 생긴 거)를 반환하는 함수
 *
 * @param {string, string, string, string}
 * name : 계산기 이름
 * nickName : 계산기 저작한 사용자 닉네임
 * description : 계산기에 대한 간단한 설명
 * profile : 프로필 이미지 경로
 * calculetId : 계산기 ID
 */
function BoxRecCalculator({
  name,
  nickName,
  description,
  profile,
  calculetId,
}) {
  const { atcLinearWhite, ellipsis } = useSx();
  const { calculetIdPage } = usePage();

  return (
    <ButtonBase
      type="button"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
      }}
      onClick={() => calculetIdPage(calculetId)}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          background: atcLinearWhite[100],
        }}
        elevation={0}
      >
        <CardContent>
          <FlexBox
            sx={{
              width: "100%",
              gap: "1.6rem",
              alignItems: "center",
            }}
          >
            <Avatar src={profile} sx={{ width: "5.6rem", height: "5.6rem" }} />
            <FlexColumnBox>
              {/* 계산기 제목 */}
              <Typography
                variant="subtitle1"
                align="left"
                sx={{
                  fontWeight: "bold",
                  ...ellipsis,
                  WebkitLineClamp: "1",
                }}
              >
                {name}
              </Typography>
              {/* 닉네임 */}
              <Typography
                variant="subtitle2"
                color="grey.600"
                align="left"
                sx={{
                  ...ellipsis,
                  WebkitLineClamp: "1",
                }}
              >
                {nickName}
              </Typography>
            </FlexColumnBox>
          </FlexBox>
          {/* 설명 */}
          <Typography
            variant="body2"
            align="left"
            sx={{
              mt: "0.8rem",
              ...ellipsis,
              WebkitLineClamp: "2",
            }}
          >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export default BoxRecCalculator;
