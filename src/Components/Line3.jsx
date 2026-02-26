import React from "react";
import Line4 from "./Line4";

function Line3({ brand }) {
  return (
    <>
      <p>The car brand was {brand}</p>
      <Line4 model="Mustang GT" brand={brand} />
    </>
  );
}

export default Line3;