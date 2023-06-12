import { Divider, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import usePage from "../../../hooks/usePage";

function StyledResultListItem({ data }) {
  const { calculetIdPage } = usePage();
  const { category } = useSelector((state) => ({
    category: state.calculetCategory.category,
  }));
  return (
    <>
      <ListItem button onClick={() => calculetIdPage(data.id)}>
        <ListItemText
          primary={data.title}
          secondary={`${category[data.categoryMainId].name} / ${
            category[data.categoryMainId][data.categorySubId]
          }`}
        />
      </ListItem>
      <Divider />
    </>
  );
}
export default StyledResultListItem;
