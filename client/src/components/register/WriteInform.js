import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useSx from "../../hooks/useSx";
import { FlexBox, FlexColumnBox } from "../global-components/FlexBox";
import BoxRecCalculator from "../atom-components/BoxRecCalculator";
import { useSelector } from "react-redux";
import useGetCategoryName from "../../hooks/useGetCategoryName";

/**
 * 계산기 정보 입력창 컴포넌트 (정보 입력 + 배너 미리보기)
 * @param {*} props
 * props: 계산기에 대한 정보 state들
 */
function WriteInform(props) {
  const { subTitleSx } = useSx();
  const { calculetCategory } = useGetCategoryName();
  const { userInfo } = useSelector((state) => ({
    userInfo: state.userInfo,
  }));

  return (
    <Grid container spacing={4} columns={{ xs: 1, sm: 2 }}>
      <Grid item xs={1} sm={1.15}>
        <FlexColumnBox gap="1.6rem">
          <Typography sx={{ ...subTitleSx }}>계산기 정보 입력</Typography>
          <TextField
            label="계산기 이름"
            value={props.title}
            onChange={props.changeTitle}
            required
          />
          <TextField
            label="계산기 요약 설명"
            value={props.description}
            onChange={props.changeDescription}
            required
          />
          <Grid container gap="0.8rem">
            <Grid item xs>
              <FormControl fullWidth required>
                <InputLabel>대분류</InputLabel>
                <Select
                  label="대분류"
                  value={props.categoryMainId}
                  onChange={props.changeCategoryMain}
                >
                  {calculetCategory &&
                    calculetCategory.map((data) => (
                      <MenuItem key={data.value} value={data.value}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl
                fullWidth
                required
                disabled={props.categoryMainId === ""}
              >
                <InputLabel>소분류</InputLabel>
                <Select
                  label="소분류"
                  value={props.categorySubId}
                  onChange={props.changeCategorySub}
                >
                  {calculetCategory &&
                    calculetCategory.map(
                      (mainData) =>
                        mainData.value === props.categoryMainId &&
                        mainData.sub.map((subData) => (
                          <MenuItem key={subData.value} value={subData.value}>
                            {subData.name}
                          </MenuItem>
                        ))
                    )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </FlexColumnBox>
      </Grid>
      <Grid item xs={1} sm={0.85} gap="1.6rem">
        <Typography sx={{ ...subTitleSx }}>배너 미리보기</Typography>
        <FlexBox
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              pointerEvents: "none",
              width: "100%",
              margin: { xs: "0 5.8rem", sm: "0 2.4rem", md: "0 5.8rem" },
            }}
          >
            <BoxRecCalculator
              name={props.title}
              nickName={userInfo.userName}
              description={props.description}
              profile={userInfo.profileImgSrc}
            />
          </Paper>
        </FlexBox>
      </Grid>
    </Grid>
  );
}

export default WriteInform;
