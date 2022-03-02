import React from "react";
import { useTheme } from "styled-components";

type LoadingAnimationProps = React.ComponentPropsWithRef<"svg"> & {
  inactive?: boolean;
};
const LoadingAnimation: React.SFC<LoadingAnimationProps> = ({ inactive }) => {
  const { colors } = useTheme();
  const color1 = inactive ? colors.grey : colors.blue;
  const color2 = inactive ? colors.lightGrey : colors.yellow;
  return (
    // Modified svg By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="240px"
      height="24px"
      viewBox="0 0 100 10"
      preserveAspectRatio="xMidYMid"
      role="img"
    >
      <title id="lightbulb11">Loading animation</title>
      <g transform="translate(4 5)">
        <circle
          cx="0"
          cy="0"
          r="4"
          fill={color1}
          transform="scale(0.275039 0.275039)"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.4734848484848484s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1363636363636362s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <g transform="translate(22.4 5)">
        <circle
          cx="0"
          cy="0"
          r="4"
          fill={color2}
          transform="scale(0.0862935 0.0862935)"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.37878787878787873s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1363636363636362s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <g transform="translate(40.0 5)">
        <circle
          cx="0"
          cy="0"
          r="4"
          fill={color1}
          transform="scale(0.0000823166 0.0000823166)"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.284090909090909s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1363636363636362s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <g transform="translate(59.2 5)">
        <circle
          cx="0"
          cy="0"
          r="4"
          fill={color2}
          transform="scale(0.0779504 0.0779504)"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.18939393939393936s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1363636363636362s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <g transform="translate(77.6 5)">
        <circle
          cx="0"
          cy="0"
          r="4"
          fill={color1}
          transform="scale(0.262719 0.262719)"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.09469696969696968s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1363636363636362s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      <g transform="translate(96 5)">
        <circle
          cx="0"
          cy="0"
          r="4"
          fill={color2}
          transform="scale(0.49324 0.49324)"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="0s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1363636363636362s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};
LoadingAnimation.defaultProps = {
  inactive: false,
};
export default LoadingAnimation;
