import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import theme from "../theme";

const BaseBranding = ({
  desktopSrc,
  mobileSrc,
  alt,
  ...props
}) => (
  <a href="/" { ...props }>
    <Box display={ { small: "none", medium: "block", large: "block" } } minWidth="90px;">
      <img
        src={ desktopSrc }
        alt={ alt }
      />
    </Box>
    <Box display={ { small: "block", medium: "none", large: "none" } } minWidth="32px;">
      <img
        src={ mobileSrc }
        alt={ alt }
      />
    </Box>
  </a>
);

BaseBranding.propTypes = {
  desktopSrc: PropTypes.string,
  mobileSrc: PropTypes.string,
  alt: PropTypes.string,
};

BaseBranding.defaultProps = {
  desktopSrc: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEzMyAzMiIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMTMzIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNGRkZGRkY7fS5zdDF7ZmlsbDojRkZCQjAwO308L3N0eWxlPjx0aXRsZT5CcmVuZGluZzwvdGl0bGU+PGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyIC0yMCkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyIDE2KSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCA0KSI+PHBhdGggY2xhc3M9InN0MCIgZD0ibTQ4LjEgMjQuMmgtNS4xdi0xNC44aDQuOHYyLjVjMC43LTAuOSAxLjUtMS42IDIuNS0yLjIgMC45LTAuNSAxLjktMC43IDIuOS0wLjcgMS42IDAgMi44IDAuNCAzLjYgMS4zczEuMiAyLjIgMS4yIDMuOXY5LjloLTUuMXYtOC41YzAtMC44LTAuMi0xLjQtMC41LTEuOHMtMC44LTAuNi0xLjQtMC42Yy0wLjkgMC0xLjYgMC4zLTIuMSAwLjlzLTAuNyAxLjUtMC43IDIuNnY3LjV6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0ibTcwLjggOWg1LjJ2MTMuNmwtNC44IDEuOXYtMi45Yy0wLjcgMC45LTEuNSAxLjYtMi41IDIuMi0wLjkgMC41LTEuOSAwLjctMi45IDAuNy0xLjYgMC0yLjgtMC41LTMuNi0xLjRzLTEuMi0yLjItMS4yLTMuOXYtMTAuMmg1LjF2OC44YzAgMC44IDAuMiAxLjQgMC41IDEuOHMwLjggMC42IDEuNCAwLjZjMC45IDAgMS42LTAuMyAyLjEtMC45czAuNy0xLjUgMC43LTIuNnYtNy43eiIvPjxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iODEuNyAyNC42IDc5IDI0LjYgNzkgMS4xIDgxLjcgMCIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Im04NCAxNy4xYzAtMi4zIDAuNy00LjMgMi4yLTUuOHMzLjQtMi4zIDUuNy0yLjMgNC4yIDAuOCA1LjcgMi4zIDIuMiAzLjQgMi4yIDUuOC0wLjcgNC4zLTIuMiA1LjgtMy40IDIuMy01LjcgMi4zLTQuMi0wLjgtNS43LTIuMy0yLjItMy41LTIuMi01Ljh6bTIuNyAwYzAgMS44IDAuNSAzLjMgMS40IDQuNHMyLjIgMS43IDMuNyAxLjdjMS42IDAgMi44LTAuNiAzLjgtMS43czEuNC0yLjYgMS40LTQuNC0wLjUtMy4zLTEuNC00LjRjLTEtMS4xLTIuMi0xLjctMy44LTEuN3MtMi44IDAuNi0zLjcgMS43LTEuNCAyLjUtMS40IDQuNHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJtMTEzLjEgMjMuNmMtMC44IDAuNC0xLjYgMC44LTIuNCAxcy0xLjYgMC4zLTIuNCAwLjNjLTIuMiAwLTMuOS0wLjctNS4zLTIuMi0xLjMtMS40LTItMy4zLTItNS43czAuNy00LjMgMi4yLTUuOGMxLjQtMS41IDMuMy0yLjIgNS42LTIuMiAwLjcgMCAxLjUgMC4xIDIuMiAwLjIgMC44IDAuMSAxLjggMC4zIDIuOSAwLjZsMS45LTAuOHYxMy40YzAgMS44LTAuMSAzLjEtMC4zIDMuOS0wLjEgMC44LTAuNCAxLjUtMC45IDIuMi0wLjYgMS0xLjUgMS43LTIuNiAyLjItMS4yIDAuNS0yLjYgMC44LTMuOSAwLjgtMSAwLTEuOS0wLjEtMi45LTAuNHMtMS45LTAuNi0yLjgtMS4xbC0wLjQtMy4yIDIgMS4zYzAuNiAwLjQgMS4zIDAuNyAxLjkgMC44IDAuNyAwLjIgMS41IDAuMyAyLjMgMC4zIDEuNiAwIDIuOC0wLjQgMy42LTEuMiAwLjktMC44IDEuMy0xLjkgMS4zLTMuM3YtMS4xem0wLTJ2LTkuNWMtMC42LTAuMy0xLjMtMC42LTItMC44LTAuNi0wLjItMS4yLTAuMi0xLjktMC4zLTEuNyAwLTMgMC42LTQgMS43cy0xLjUgMi42LTEuNSA0LjQgMC41IDMuMiAxLjQgNC4yIDIuMSAxLjYgMy43IDEuNmMwLjYgMCAxLjMtMC4xIDEuOS0wLjMgMC44LTAuMyAxLjYtMC42IDIuNC0xeiIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Im0xMTggOWgyLjhsNC40IDExLjYgNC45LTExLjZoMi4zbC03LjEgMTYuMy0wLjEgMC4yYy0xLjEgMi41LTIgNC40LTIuNiA1LjRoLTIuOWMwLjYtMC43IDEuMi0xLjQgMS43LTIuMSAwLjYtMSAxLjItMiAxLjYtMy4xbDEtMi4xLTYtMTQuNnoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzAuNywxLjFsNS43LDIuM3YyMC41YzAsNC40LTUuNCw1LjItOS4xLDUuN2MyLjEtMC41LDMuNC0xLjEsMy40LTUuN1Y1LjdMMjUsMy40TDMwLjcsMS4xeiAgICAgICBNNi44LDI4LjRWMTUuOWMwLTEuMywwLjktMi43LDIuMS0zLjJsNS45LTIuNXY4bDUuNywzLjRjMS4xLDAuNiwzLjQsMC42LDMuNC0xLjF2LTMuNGwtMi4zLTEuMVYwTDQuMyw2LjRDMS45LDcuMywwLDEwLDAsMTIuNSAgICAgIHYxOC44TDYuOCwyOC40eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==",
  mobileSrc: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDM2LjQgMzEuMyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgMzYuNCAzMS4zIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+LnN0MHtmaWxsOiNGRkJCMDA7fTwvc3R5bGU+PHRpdGxlPkJyZW5kaW5nPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzIgLTIwKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzIgMTYpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDQpIj48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzAuNywxLjFsNS43LDIuM3YyMC41YzAsNC40LTUuNCw1LjItOS4xLDUuN2MyLjEtMC41LDMuNC0xLjEsMy40LTUuN1Y1LjdMMjUsMy40TDMwLjcsMS4xeiAgICAgICBNNi44LDI4LjRWMTUuOWMwLTEuMywwLjktMi43LDIuMS0zLjJsNS45LTIuNXY4bDUuNywzLjRjMS4xLDAuNiwzLjQsMC42LDMuNC0xLjF2LTMuNGwtMi4zLTEuMVYwTDQuMyw2LjRDMS45LDcuMywwLDEwLDAsMTIuNSAgICAgIHYxOC44TDYuOCwyOC40eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==",
  alt: "Nulogy logo",
};

const Branding = styled(BaseBranding)(
  {
    color: theme.colors.white,
    padding: "2px",
    borderRadius: theme.radii.medium,
    ":focus": {
      background: theme.colors.black,
      boxShadow: "none",
      outline: "none",
    },
    "img": {
      height: "36px",
      display: "block",
    },

  }
);

export default Branding;
