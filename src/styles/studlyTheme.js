import {
  cyan500,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  grey500,
  white,
  darkBlack,
  fullBlack
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";
import getMuiTheme from "material-ui/styles/getMuiTheme";

export const StudlyTheme = getMuiTheme({
  listItem: {
    rightIconColor: "#FFFFFF"
  },
  svgIcon: {
    color: "#E47B29"
  }
});
