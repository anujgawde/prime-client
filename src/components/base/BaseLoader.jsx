import React from "react";

const BaseLoader = ({ size = 28 }) => {
  const borderWidth = size > 20 ? 2.5 : 2;
  return (
    <div
      className="rounded-full border-border-default border-t-primary-base animate-spin"
      style={{
        width: size,
        height: size,
        borderWidth,
        borderTopWidth: borderWidth,
      }}
    />
  );
};

export default BaseLoader;
