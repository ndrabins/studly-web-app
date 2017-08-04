import React from "react";
import CircularProgress from "material-ui/CircularProgress";

const Preloader = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems:"center", height:"100%"}}>
      <CircularProgress size={80} thickness={5} mode={"indeterminate"} />
    </div>
  );
};

export default Preloader;
