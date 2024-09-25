import React, { ComponentProps } from "react";
import { Alert } from "../Alert";

const Banner = ({ ...props }: ComponentProps<typeof Alert>) => (
  <Alert borderStyle="none" borderRadius="0" px="x3" {...props} />
);

export default Banner;
