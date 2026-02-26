import React from "react";
import Line_3 from "./Line3";

function Line_2({ brand }) {
  return (
    <>
      <p>I have a car {brand}</p>
      <Line_3 brand={brand} />
      
    </>
  );
}

export default Line_2;