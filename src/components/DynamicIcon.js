import * as Icons from "@material-ui/icons";

const DynamicIcons = ({ iconName }) => {
  let DynamicIcon = Icons[iconName];
  return (
        <DynamicIcon/>
  )
};

export default DynamicIcons;
