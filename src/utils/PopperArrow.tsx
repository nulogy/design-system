import styled from "styled-components";
import { PopperArrowProps as ReactPopperArrowProps } from "react-popper";
import theme from "../theme";

type PopperArrowProps = ReactPopperArrowProps & {
  placement?: string;
  borderColor?: string;
  backgroundColor?: string;
};

const getThemeColor = (color) =>
  theme.colors[color] ? theme.colors[color] : color;

const positionArrow = (placement) => {
  const location = String(placement).split("-")[0];
  switch (location) {
    case "top":
      return {
        bottom: 0,
        marginBottom: "-7px",
        "&:before": {
          top: "2px",
          left: "-4px",
        },
        "&:after": {
          left: "-4px",
        },
      };
    case "right":
      return {
        left: 0,
        marginLeft: "-8px",
        "&:before": {
          top: "-4px",
        },
        "&:after": {
          left: "2px",
          top: "-4px",
        },
      };
    case "left":
      return {
        marginRight: "-8px",
        right: 0,
        "&:before": {
          top: "-4px",
        },
        "&:after": {
          left: "-2px",
          top: "-4px",
        },
      };
    case "bottom":
    default:
      return {
        marginTop: "-7px",
        top: 0,
        "&:before": {
          top: "-2px",
          left: "-4px",
        },
        "&:after": {
          left: "-4px",
        },
      };
  }
};

const drawArrow = (placement, borderColor, backgroundColor) => {
  const location = String(placement).split("-")[0];
  switch (location) {
    case "top":
      return {
        "&:before": {
          borderColor: `${getThemeColor(
            borderColor
          )} transparent transparent transparent`,
          borderWidth: "8px 8px 0 8px",
        },
        "&:after": {
          borderColor: `${getThemeColor(
            backgroundColor
          )} transparent transparent transparent`,
          borderWidth: "8px 8px 0 8px",
        },
      };
    case "right":
      return {
        "&:before": {
          borderColor: `transparent ${getThemeColor(
            borderColor
          )} transparent transparent`,
          borderWidth: "8px 8px 8px 0",
        },
        "&:after": {
          borderColor: `transparent ${getThemeColor(
            backgroundColor
          )} transparent transparent`,
          borderWidth: "8px 8px 8px 0",
        },
      };
    case "left":
      return {
        "&:before": {
          borderColor: `transparent transparent transparent ${getThemeColor(
            borderColor
          )}`,
          borderWidth: "8px 0 8px 8px",
        },
        "&:after": {
          borderColor: `transparent transparent transparent ${getThemeColor(
            backgroundColor
          )}`,
          borderWidth: "8px 0 8px 8px",
        },
      };
    case "bottom":
    default:
      return {
        "&:before": {
          borderColor: `transparent transparent ${getThemeColor(
            borderColor
          )} transparent`,
          borderWidth: "0 8px 8px 8px",
        },
        "&:after": {
          borderColor: `transparent transparent ${getThemeColor(
            backgroundColor
          )} transparent`,
          borderWidth: "0 8px 8px 8px",
          left: "-4px",
        },
      };
  }
};

const PopperArrow: React.FC<PopperArrowProps> = styled.div(
  {
    position: "absolute",
    height: theme.space.x1,
    width: theme.space.x1,
    margin: "12px",
    "&:before": {
      borderStyle: "solid",
      content: "''",
      display: "block",
      height: 0,
      margin: "auto",
      position: "absolute",
      width: 0,
    },
    "&:after": {
      borderStyle: "solid",
      content: "''",
      display: "block",
      height: 0,
      margin: "auto",
      position: "absolute",
      width: 0,
    },
  },
  ({
    placement = "bottom",
    borderColor = "grey",
    backgroundColor = "white",
  }: PopperArrowProps) => ({
    ...drawArrow(placement, borderColor, backgroundColor),
  }),
  ({ placement = "bottom" }) => ({
    ...positionArrow(placement),
  })
);

export default PopperArrow;
