import StyledScrollbar from "../atom-components/StyledScrollbar";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Dialog,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import useSx from "../../hooks/useSx";
import CloseIcon from "@mui/icons-material/Close";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { formatDay } from "../../utils/formatTime";
import { useSelector } from "react-redux";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import usePage from "../../hooks/usePage";

/**
 * 계산기 정보 팝업창에 들어갈 내용
 *
 * @param {object} param0
 *
 * info : 계산기 정보 팝업창에 들어갈 내용
 * -> contributorImgSrc: 제작자 프로필 사진
 * -> contributor : 제작자 ID
 * -> statistics
 *    -> view : 조회수
 *    -> user : 누적 사용자 수
 *    -> calculation : 누적 연산 수
 * -> title : 계산기 이름
 * -> categoryMainId : 대분류 ID
 * -> categorySubId : 소분류 ID
 * -> createdAt : 등록일
 * -> updateLog : <배열> 업데이트 날짜,메세지
 */
function ModalCalculetInfo({
  contributor,
  statistics,
  title,
  categoryMainId,
  categorySubId,
  createdAt,
  updateLog,
  onClick,
}) {
  const { isWindowSmDown } = useSx();
  const { profileUserIdPage } = usePage();
  const dateSx = { xs: "10rem", sm: "11rem", md: "12rem" };

  const { calculetCategory } = useSelector((state) => ({
    calculetCategory: state.calculetCategory.category,
  }));
  const categoryMainName = calculetCategory[categoryMainId].name;
  const categorySubName = calculetCategory[categoryMainId][categorySubId];

  // contributor
  function ContributorInfo() {
    const { id, userName, profileImgSrc } = contributor;

    return (
      <Tooltip title={"프로필 보러가기"} placement="top">
        <FlexColumnBox
          sx={{ gap: "0.8rem", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            profileUserIdPage(id);
          }}
        >
          <Avatar src={profileImgSrc} sx={{ width: 56, height: 56 }} />
          <Typography variant="body1">{userName}</Typography>
        </FlexColumnBox>
      </Tooltip>
    );
  }

  // 누적 연산 수, 누적 사용자 수
  function StatisticsInfo() {
    const { calculation, user } = statistics;
    return (
      <>
        <FlexColumnBox sx={{ gap: "0.4rem" }}>
          <Typography variant="subtitle2" color="grey">
            누적 연산 수
          </Typography>
          <Typography variant="body1">{calculation}</Typography>
        </FlexColumnBox>
        <FlexColumnBox sx={{ gap: "0.4rem" }}>
          <Typography variant="subtitle2" color="grey">
            누적 사용자 수
          </Typography>
          <Typography variant="body1">{user}</Typography>
        </FlexColumnBox>
      </>
    );
  }

  // sm up
  function CalculetProfileMd() {
    return (
      <FlexColumnBox
        sx={{
          gap: "2.4rem",
          p: "2.4rem 1.6rem",
          borderRight: 1,
          borderColor: "grey.300",
          backgroundColor: "white",
          width: "36rem", // 임의로 조절
        }}
      >
        <ContributorInfo />
        <Divider />
        <StatisticsInfo />
      </FlexColumnBox>
    );
  }
  // sm down
  function CalculetProfileSm() {
    return (
      <>
        <Toolbar>
          <IconButton onClick={onClick} sx={{ maxWidth: "fit-content" }}>
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
        <FlexBox
          sx={{
            gap: "2.4rem",
            p: "0.4rem 1.6rem 1.6rem",
            borderBottom: 1,
            borderColor: "grey.300",
            backgroundColor: "white",
          }}
        >
          <ContributorInfo />
          <Divider orientation="vertical" />
          <StatisticsInfo />
        </FlexBox>
      </>
    );
  }

  return (
    <Dialog fullScreen={isWindowSmDown} open={true} onClose={onClick}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isWindowSmDown ? "column" : "row",
          backgroundColor: !isWindowSmDown && "atcBlue.100",
        }}
      >
        {/* 왼쪽 */}
        {isWindowSmDown ? <CalculetProfileSm /> : <CalculetProfileMd />}

        {/* 오른쪽 */}
        <Box
          sx={{
            display: "flex",

            p: "1.6rem",
            flexDirection: "column",
            gap: "1.2rem",

            width: isWindowSmDown ? "100%" : "150rem", // 임의로 조절
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {!isWindowSmDown && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton onClick={onClick} sx={{ maxWidth: "fit-content" }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            )}
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {categoryMainName} / {categorySubName}
            </Typography>
          </Box>
          <Card sx={{ width: "100%" }}>
            <CardContent
              sx={{
                "&:last-child": {
                  p: "0.8rem 1.6rem",
                },
                gap: "0.8rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                color="primary"
                sx={{ width: dateSx }}
              >
                {formatDay(createdAt)}
              </Typography>
              <Typography variant="body1" color="primary">
                등록
              </Typography>
              <CakeIcon color="primary" fontSize="small" />
            </CardContent>
          </Card>

          <Card>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "atcBlue.200",
                p: "0.8rem 1.6rem",
                gap: "0.8rem",
              }}
            >
              <Typography
                variant="body1"
                color="grey.600"
                sx={{ width: dateSx }}
              >
                시간
              </Typography>
              <Typography variant="body1" color="grey.600">
                수정 내용
              </Typography>
            </Box>
            <CardContent
              sx={{
                "&:last-child": {
                  p: "0rem",
                },
                gap: "0.8rem",
                display: "flex",
                flexDirection: "column",
                overflow: "auto",
              }}
            >
              <StyledScrollbar>
                <Box
                  sx={{
                    display: "flex",
                    height: isWindowSmDown
                      ? "100%"
                      : { xs: "24rem", sm: "32rem", md: "40rem" },
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  {updateLog.length === 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: "0.8rem",
                        p: "0.8rem 1.6rem",
                      }}
                    >
                      <Typography variant="body1" color="grey.400">
                        수정한 내역이 없습니다.
                      </Typography>
                    </Box>
                  )}
                  {updateLog.map((conts, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        gap: "0.8rem",
                        p: "0.8rem 1.6rem",
                        borderBottom: index !== updateLog.length - 1 && 1,
                        borderColor: "grey.300",
                      }}
                    >
                      {/* {createdAt : 시간,  message : 업데이트 내역 */}
                      <Typography variant="body1" sx={{ width: dateSx }}>
                        {formatDay(conts.createdAt)}
                      </Typography>
                      <Typography variant="body1">{conts.message}</Typography>
                    </Box>
                  ))}
                </Box>
              </StyledScrollbar>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Dialog>
  );
}

export default ModalCalculetInfo;
