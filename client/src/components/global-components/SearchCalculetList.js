import { Grid } from "@mui/material";
import usePage from "../../hooks/usePage";
import BoxCalculetItem from "../atom-components/BoxCalculetItem";
import BoxNoItem from "../atom-components/BoxNoItem";

/**
 * Search Option 에 따른 계산기 목록을 나열
 * @param {*} calculetList
 * @returns
 */
function SearchCalculetList({ calculetList }) {
  const { calculetIdPage } = usePage();

  return (
    <Grid
      container
      spacing={4}
      columns={{ xs: 1, sm: 2, md: 3 }}
      sx={{ alignContent: "stretch" }}
    >
      {calculetList.length !== 0 ? (
        calculetList.map((calculet) => (
          <Grid key={calculet.id} item xs={1} sm={1} md={1}>
            <BoxCalculetItem
              onClick={() => calculetIdPage(calculet.id)}
              calculet={calculet}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={1} sm={1} md={1}>
          <BoxNoItem />
        </Grid>
      )}
    </Grid>
  );
}
export default SearchCalculetList;
