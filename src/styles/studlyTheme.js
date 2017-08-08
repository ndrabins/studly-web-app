import getMuiTheme from "material-ui/styles/getMuiTheme";

/*
H1 >> Raleway Heavy 36 px
H2 >> Raleway Heavy 28 px
H3 >> Raleway Bold 24px
p, body >> Open Sans 12 px
All forms and fields Roboto 16px
Our RED: >> E6463B
Our BLUE: >> 2E81BA
Our GREEN: >> 1FA186
Our ORANGE: >> E47B29
Our YELLOW: >> F0CA37
OUR DARK GREY >> 303030
OUR MID GREY >> 767778
OUR LIGHT GREY >> EEEEEE
*/

const RED = "#E6463B";
const BLUE = "#2E81BA";
const GREEN = "#1FA186";
const ORANGE = "#E47B29";
const YELLOW = "#F0CA37";
const DARK_GREY = "#303030";
const MID_GREY = "#767778";
const LIGHT_GREY = "#EEEEEE";

export const StudlyTheme = getMuiTheme({
  svgIcon: {
    color: "#FFFFFF"
  },
  palette: {
    primary1Color: "#2E81BA",
    primary2Color: "#E47B29",
    primary3Color: "#1FA186",
  }
});
