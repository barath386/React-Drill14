import React from "react";
import Line_2 from "./Line2";

function Line_1({ name }) {
  return (
    <>
      <h3>This is {name} .</h3>
      <Line_2 brand="FORD" />
      
    </>
  );
}

export default Line_1;