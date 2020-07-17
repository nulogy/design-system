/* eslint-disable no-console */
import React, { useEffect } from "react";

export const Deprecated = (Component, message = "") => props => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error("Deprecated NDS Component:", message);
    }
  });

  return <Component {...props} />;
};
