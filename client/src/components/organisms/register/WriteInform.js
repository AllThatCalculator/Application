import { useSelector } from "react-redux";
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
import useSx from "../../../hooks/useSx";
import { FlexBox, FlexColumnBox } from "../common/FlexBox";
import BoxRecCalculator from "../common/BoxRecCalculator";
import { ID_MAIN_CONVERTER } from "../../../constants/calculetList";
import {
  ID_INPUT_CATEGORY_MAIN_ID,
  ID_INPUT_CATEGORY_SUB_ID,
  ID_INPUT_DESCRIPTION,
  ID_INPUT_TITLE,
} from "../../../constants/register";

/**
 * 계산기 정보 입력창 컴포넌트 (정보 입력 + 배너 미리보기)
 * @param {*} props
 * props: 계산기에 대한 정보 state들
 */
function WriteInform(props) {
  const {
    title,
    description,
    categoryMainId,
    categorySubId,
    onChangeInputs,
    onChangeCategoryMain,
    onChangeCategorySub,
  } = props;

  const { subTitleSx } = useSx();
  const { userInfo, calculetCategory } = useSelector((state) => ({
    userInfo: state.userInfo,
    calculetCategory: state.calculetCategory.category,
  }));

  return (
    <Grid container spacing={4} columns={{ xs: 1, sm: 2 }}>
      <Grid item xs={1} sm={1.15}>
        <FlexColumnBox gap="1.6rem">
          <Typography sx={{ ...subTitleSx }}>계산기 정보 입력</Typography>
          <TextField
            id={ID_INPUT_TITLE}
            label="계산기 이름"
            value={title}
            onChange={onChangeInputs}
            required
          />
          <TextField
            id={ID_INPUT_DESCRIPTION}
            label="계산기 요약 설명"
            value={description}
            onChange={onChangeInputs}
            required
          />
          <Grid container gap="0.8rem">
            <Grid item xs>
              <FormControl name={ID_INPUT_CATEGORY_MAIN_ID} fullWidth required>
                <InputLabel>대분류</InputLabel>
                <Select
                  label="대분류"
                  value={categoryMainId}
                  onChange={onChangeCategoryMain}
                >
                  {calculetCategory &&
                    Object.entries(calculetCategory).map((data) => {
                      const mainId = Number(data[0]);
                      const mainName = data[1].name;
                      return (
                        mainId !== Number(ID_MAIN_CONVERTER) && (
                          <MenuItem key={mainId} value={mainId}>
                            {mainName}
                          </MenuItem>
                        )
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl
                name={ID_INPUT_CATEGORY_SUB_ID}
                fullWidth
                required
                disabled={categoryMainId === ""}
              >
                <InputLabel>소분류</InputLabel>
                <Select
                  label="소분류"
                  value={categorySubId}
                  onChange={onChangeCategorySub}
                >
                  {calculetCategory &&
                    Object.entries(calculetCategory).map((data) => {
                      const mainId = Number(data[0]);
                      const mainValue = data[1];
                      const { name, ...subList } = mainValue; // name 제외하고 순회
                      return (
                        mainId === categoryMainId &&
                        Object.entries(subList).map((subData) => {
                          const key = Number(subData[0]);
                          const value = subData[1];
                          return (
                            <MenuItem key={key} value={key}>
                              {value}
                            </MenuItem>
                          );
                        })
                      );
                    })}
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
              margin: { xs: "0 1.2rem", sm: "0 2.4rem", md: "0 1.2rem" },
            }}
          >
            <BoxRecCalculator
              name={title}
              nickName={userInfo.userName}
              description={description}
              profile={userInfo.profileImgSrc}
            />
          </Paper>
        </FlexBox>
      </Grid>
    </Grid>
  );
}

export default WriteInform;
