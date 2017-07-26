import { TOGGLE_SIDENAV } from "./Types";

export const toggleNav = (toggleStatus) => {
  return {
    type: TOGGLE_SIDENAV,
    payload: !toggleStatus
  };
}
