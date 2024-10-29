import React from "react";
import { useTheme } from "styled-components";

interface LoadingIconProps extends React.ComponentPropsWithRef<"svg"> {
  size?: string;
}

const LoadingIcon = React.forwardRef<SVGSVGElement, LoadingIconProps>(({ size, ...props }, ref) => {
  const theme = useTheme();
  size ||= theme.sizes.x3;

  return (
    <svg
      ref={ref}
      viewBox="0 0 24px 24px"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <g>
        <circle cx="3.5" cy="12" fill="#C0C8D1" transform-origin="3.5 3.5">
          <animate
            attributeName="r"
            values="3;3;3.5;3"
            keySplines="
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;"
            keyTimes="0; 0.25;0.4; 1"
            calcMode="spline"
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            id="first"
            attributeName="fill"
            values="#C0C8D1;#C0C8D1;#434D59;#C0C8D1"
            keySplines="
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;"
            keyTimes="0; 0.25;0.4; 1"
            calcMode="spline"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="12" cy="12" r="3" fill="#C0C8D1" transform-origin="12 3.5">
          <animate
            attributeName="r"
            begin="0.2s; first.begin"
            values="3;3;3.5;3"
            keySplines="
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;"
            keyTimes="0; 0.25;0.4; 1"
            calcMode="spline"
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            id="second"
            attributeName="fill"
            begin="0.2s; first.begin"
            values="#C0C8D1;#C0C8D1;#434D59;#C0C8D1"
            keySplines="
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;"
            keyTimes="0; 0.25;0.4; 1"
            calcMode="spline"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="20.5" cy="12" r="3" fill="#C0C8D1" transform-origin="20.5 3.5">
          <animate
            attributeName="r"
            begin="0.3s; first.begin"
            values="3;3;3.5;3"
            keySplines="
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;
                0.1 0.8 0.2 1;"
            keyTimes="0; 0.25;0.4; 1"
            calcMode="spline"
            dur="0.8s"
            repeatCount="indefinite"
          />
          <animate
            id="third"
            attributeName="fill"
            begin="0.3s; first.begin"
            values="#C0C8D1;#C0C8D1;#434D59;#C0C8D1"
            keySplines="
                .24 .1 .35 .8;
                .24 .1 .35 .8;
                0.1 0.8 0.2 1"
            keyTimes="0; 0.25;0.4; 1"
            calcMode="spline"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
});

export default LoadingIcon;
