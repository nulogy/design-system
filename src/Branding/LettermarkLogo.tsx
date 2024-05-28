import React from "react";
const sizes = {
  small: {
    height: "24px",
    width: "28px",
  },
  medium: {
    height: "32px",
    width: "37px",
  },
  large: {
    height: "48px",
    width: "56px",
  },
};
const getSize = (size) => sizes[size] || sizes.medium;
type LettermarkLogoProps = {
  letterFill?: string;
  size?: string;
};
const LettermarkLogo: React.FC<React.PropsWithChildren<LettermarkLogoProps>> = ({ size, letterFill, ...props }) => (
  <svg
    {...getSize(size)}
    {...props}
    viewBox="0 0 37 32"
    style={{ display: "block", margin: size === "large" ? null : "2px 0" }}
  >
    <path
      fill={letterFill}
      d="M30.6967273,1.13648485 L36.3810909,3.40945455 L36.3810909,23.8758788 C36.3810909,28.2705455 30.9507879,29.0424242 27.2853333,29.5602424 C29.3818182,29.0424242 30.7083636,28.4606061 30.6967273,23.8758788 L30.6967273,5.68436364 L25.0123636,3.40945455 L30.6967273,1.13648485 Z M6.82084848,28.4237576 L6.82084848,15.9204848 C6.82084848,14.6618182 7.76533333,13.238303 8.91151515,12.7476364 L14.7801212,10.2264242 L14.7801212,18.1779394 L20.4644848,21.6048485 C21.6106667,22.1866667 23.8758788,22.2002424 23.8758788,20.4664242 L23.8758788,17.0550303 L21.5990303,15.9166061 L21.5990303,1.56319402e-13 L4.26666667,6.38642424 C1.91030303,7.25333333 3.55271368e-15,9.98593939 3.55271368e-15,12.5071515 L3.55271368e-15,31.2669091 L6.82084848,28.4237576 Z"
    />
  </svg>
);
LettermarkLogo.defaultProps = {
  letterFill: undefined,
  size: undefined,
};
export default LettermarkLogo;
