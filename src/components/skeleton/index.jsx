/* eslint-disable react/prop-types */
// import React from "react";
import { SkeletonPulse } from "./styles";

const Skeleton = ({ border, height, width, mt, mb, ml, mr }) => {
  return (
    <SkeletonPulse
      border={border}
      height={height}
      width={width}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
    />
  );
};

export default Skeleton;
