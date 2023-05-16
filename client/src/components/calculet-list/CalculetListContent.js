import { FlexColumnBox } from "../global-components/FlexBox";
import { ButtonBase, Divider, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import usePage from "../../hooks/usePage";
import useSx from "../../hooks/useSx";
import BoxCalculetItem from "../atom-components/BoxCalculetItem";
import BoxNoItem from "../atom-components/BoxNoItem";

/**
 * 대분류, 소분류, 계산기 목록들을 나열하여 반환하는 컴포넌트
 * @param {*} param0
 * @returns
 */
function CalculetListContent({ calculetContent }) {
  const { calculetIdPage, calculetSubListPage } = usePage();
  const { subTitleSx } = useSx();
  const { mainCategoryName, mainId, subContent } = calculetContent;

  /**
   * 계산기 나열
   * @param {object} calculet 계산기 정보 (id, title)
   */
  function CalculetList({ subCalculetList }) {
    return (
      <Grid
        container
        spacing={2}
        columns={{ xs: 1, sm: 2, md: 3 }}
        sx={{ alignContent: "stretch" }}
      >
        {subCalculetList.length !== 0 ? (
          subCalculetList.map((calculet) => (
            <Grid
              key={"id-category-list" + calculet.id}
              item
              xs={1}
              sm={1}
              md={1}
            >
              <BoxCalculetItem
                onClick={() => calculetIdPage(calculet.id)}
                calculet={calculet}
              />
            </Grid>
          ))
        ) : (
          <Grid item>
            <BoxNoItem />
          </Grid>
        )}
      </Grid>
    );
  }

  /**
   * 소분류 카테고리 나열
   * @param {*} param0
   * @returns
   */
  function SubCategoryContent({ subCategoryName, subId, subCalculetList }) {
    return (
      <FlexColumnBox sx={{ width: "100%" }}>
        <FlexColumnBox gap="0.8rem">
          <Typography variant="body1" color="text.secondary">
            {subCategoryName}
          </Typography>
          <CalculetList subCalculetList={subCalculetList} />
        </FlexColumnBox>
      </FlexColumnBox>
    );
  }

  return (
    <>
      <FlexColumnBox gap="3.2rem">
        {/* 대분류 버튼 : 단위 변환기는 소분류 페이지 없음 */}
        {mainId !== "0" && (
          <ButtonBase
            onClick={() => calculetSubListPage(mainId)}
            sx={{ maxWidth: "fit-content", gap: "1.2rem" }}
          >
            <Typography sx={{ ...subTitleSx }}>{mainCategoryName}</Typography>
            <KeyboardArrowRightIcon />
          </ButtonBase>
        )}
        {mainId === "0" && (
          <Typography sx={{ ...subTitleSx }}>{mainCategoryName}</Typography>
        )}
        {subContent.map((content) => {
          const { subCategoryName, subId, subCalculetList } = content;
          return (
            // 소분류, calculet list들
            <div key={"id-sub-category-" + subId}>
              {mainId !== "99999" && (
                <SubCategoryContent
                  subCategoryName={subCategoryName}
                  subId={subId}
                  subCalculetList={subCalculetList}
                />
              )}
              {mainId === "99999" && (
                <CalculetList subCalculetList={subCalculetList} />
              )}
            </div>
          );
        })}
      </FlexColumnBox>
      <Divider />
    </>
  );
}
export default CalculetListContent;
