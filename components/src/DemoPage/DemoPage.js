import React from "react";
import styled from "styled-components";
import { Title } from "../Type/Headings";
import PrimaryButton from "../Button/PrimaryButton";
import QuietButton from "../Button/QuietButton";
import IconicButton from "../Button/IconicButton";
import Box from "../Box/Box";
import Flex from "../Flex/Flex";
import Field from "../Field/Field";
import Input from "../Input/Input";
import Form from "../Form/Form";
import FormSection from "../Form/FormSection";
import Checkbox from "../Checkbox/Checkbox";
import Radio from "../Radio/Radio";
import RadioGroup from "../Radio/RadioGroup";
import ToggleWithText from "../Toggle/Toggle";
import InlineValidation from "../Validation/InlineValidation";
import HeaderValidation from "../Validation/HeaderValidation";
import List from "../List/List";
import ListItem from "../List/ListItem";
import Select from "../Select/Select";
import Text from "../Type/Text";
import Link from "../Link/Link";
import theme from "../theme";

const Menu = styled(Flex)`
flex-grow: 2;
`;

const BaseMenuItem = props => (
  <Box className={ props.className }>
    <Link
      px={ 4 } py={ 2 } style={ { display: "block" } }
      color={ theme.colors.white } underline={ false } href="http://nulogy.design"
    >
      {props.children}
    </Link>
  </Box>
);

const MenuItem = styled(BaseMenuItem)`
&:hover {
  background-color: ${theme.colors.darkBlue}
}
`;

const BaseHeader = props => (
  <Flex
    className={ props.className } px={ 4 } py={ 3 }
    bg="black" { ...props }
    height={{small:"72px", medium: "72px", large: "100%"}}
    flexDirection={{small: "row", medium: "row", large: "column"}}
    justifyContent="space-between"
    alignItems="center"
  >
    <Box mr={ 2 } style={ { minWidth: "100px" } }>
      <img
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTMzcHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDEzMyAzMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTIuNSAoNjc0NjkpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPkJyZW5kaW5nPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lZGl1bSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMyLjAwMDAwMCwgLTIwLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iQnJlbmRpbmciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMyLjAwMDAwMCwgMTYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00OC4xNDUyMTIxLDI0LjIyMjQ5ODEgTDQzLDI0LjIyMjQ5ODEgTDQzLDkuNDExMzQ2NTQgTDQ3Ljc1MTUxNTIsOS40MTEzNDY1NCBMNDcuNzUxNTE1MiwxMS44OTM3NzA4IEM0OC40MzczMzUyLDExLjAwNjAzNzggNDkuMjk0NzUyLDEwLjI2NTM2MTUgNTAuMjcyNzI3Myw5LjcxNTgzMTM5IEM1MS4xNjE4ODksOS4yMzgxNzU0OCA1Mi4xNTY5OTc1LDguOTkyMDY2MiA1My4xNjYzMDMsOS4wMDAxOTUwMiBDNTQuNzMzMzMzMyw5LjAwMDE5NTAyIDU1LjkyMjE4MTgsOS40NDk0ODc5NSA1Ni43MzI4NDg1LDEwLjM0ODA3MzggQzU3LjU0MzUxNTIsMTEuMjQ2NjU5NyA1Ny45NDg4NDg1LDEyLjU2MTU2ODggNTcuOTQ4ODQ4NSwxNC4yOTI4MDExIEw1Ny45NDg4NDg1LDI0LjIyMjQ5ODEgTDUyLjgzMDc4NzksMjQuMjIyNDk4MSBMNTIuODMwNzg3OSwxNS43Mzc2NDk2IEM1Mi44MzA3ODc5LDE0Ljk2MTg5MiA1Mi42NzE3NTc2LDE0LjM3NTU0ODYgNTIuMzUzNjk3LDEzLjk3ODYxOTMgQzUyLjAzNTYzNjQsMTMuNTgxNjkgNTEuNTY0MzYzNiwxMy4zODc3NTA2IDUwLjkzOTg3ODgsMTMuMzk2ODAxMSBDNTAuMDQyNTg1OSwxMy4zOTY4MDExIDQ5LjM1MjE2MTYsMTMuNjk4MDUzNiA0OC44Njg2MDYxLDE0LjMwMDU1ODcgQzQ4LjM4NTA1MDUsMTQuOTAzMDYzNyA0OC4xNDM5MTkyLDE1Ljc4MDMxNjIgNDguMTQ1MjEyMSwxNi45MzIzMTYyIEw0OC4xNDUyMTIxLDI0LjIyMjQ5ODEgWiIgaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNzAuODM2NjA2MSw5IEw3NS45NTA3ODc5LDkgTDc1Ljk1MDc4NzksMjIuNjIwMzYzNiBMNzEuMTk5MjcyNywyNC41MTkwMzAzIEw3MS4xOTkyNzI3LDIxLjYyNTQ1NDUgQzcwLjUxMjQ2MzYsMjIuNTE0MzIxOSA2OS42NTUzNTkzLDIzLjI1NzM2NTMgNjguNjc4MDYwNiwyMy44MTExNTE1IEM2Ny43OTM4NjY4LDI0LjI4NDUxODkgNjYuODA0ODMzMiwyNC41Mjc5NDI1IDY1LjgwMTkzOTQsMjQuNTE5MDMwMyBDNjQuMjMyMzIzMiwyNC41MTkwMzAzIDYzLjA0MDI0MjQsMjQuMDY2NTA1MSA2Mi4yMjU2OTcsMjMuMTYxNDU0NSBDNjEuNDExMTUxNSwyMi4yNTY0MDQgNjEuMDAyNTg1OSwyMC45NDA4NDg1IDYxLDE5LjIxNDc4NzkgTDYxLDkgTDY2LjE0NTIxMjEsOSBMNjYuMTQ1MjEyMSwxNy43Nzk2MzY0IEM2Ni4xNDUyMTIxLDE4LjU1NTM5MzkgNjYuMzA0MjQyNCwxOS4xNDQzMjMyIDY2LjYyMjMwMywxOS41NDY0MjQyIEM2Ni45NDAzNjM2LDE5Ljk0ODUyNTMgNjcuNDExNjM2NCwyMC4xNDgyODI4IDY4LjAzNjEyMTIsMjAuMTQ1Njk3IEM2OC45NDExNzE3LDIwLjE0NTY5NyA2OS42MzE1OTYsMTkuODQxODU4NiA3MC4xMDczOTM5LDE5LjIzNDE4MTggQzcwLjU4MzE5MTksMTguNjI2NTA1MSA3MC44MjQzMjMyLDE3Ljc1MjQ4NDggNzAuODMwNzg3OSwxNi42MTIxMjEyIEw3MC44MzY2MDYxLDkgWiIgaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI4MS43MTUxNTE1IDI0LjU1NDY2NjcgNzkgMjQuNTU0NjY2NyA3OSAxLjA4OCA4MS43MTUxNTE1IDEuNzc2MzU2ODRlLTE1Ij48L3BvbHlnb24+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTg0LDE3LjA3MTc1NzYgQzg0LDE0LjcyNjM4MzggODQuNzQ1MzczNywxMi43OTQ3NDc1IDg2LjIzNjEyMTIsMTEuMjc2ODQ4NSBDODcuNzI2ODY4Nyw5Ljc1ODk0OTQ5IDg5LjYxNzEzMTMsOSA5MS45MDY5MDkxLDkgQzk0LjE5NjY4NjksOSA5Ni4wODY5NDk1LDkuNzU4OTQ5NDkgOTcuNTc3Njk3LDExLjI3Njg0ODUgQzk5LjA2ODQ0NDQsMTIuNzk0NzQ3NSA5OS44MTM4MTgyLDE0LjcyNjM4MzggOTkuODEzODE4MiwxNy4wNzE3NTc2IEM5OS44MTM4MTgyLDE5LjQyNzQ3NDcgOTkuMDY4NDQ0NCwyMS4zNjY4Njg3IDk3LjU3NzY5NywyMi44ODk5Mzk0IEM5Ni4wODY5NDk1LDI0LjQxMzAxMDEgOTQuMTk2Njg2OSwyNS4xNzE5NTk2IDkxLjkwNjkwOTEsMjUuMTY2Nzg3OSBDODkuNjI2MTgxOCwyNS4xNjY3ODc5IDg3LjczODUwNTEsMjQuNDA3ODM4NCA4Ni4yNDM4Nzg4LDIyLjg4OTkzOTQgQzg0Ljc0OTI1MjUsMjEuMzcyMDQwNCA4NC4wMDEyOTI5LDE5LjQzMjY0NjUgODQsMTcuMDcxNzU3NiBaIE04Ni42OTU3NTc2LDE3LjA3MTc1NzYgQzg2LjY5NTc1NzYsMTguOTE0MTgxOCA4Ny4xNzIyMDIsMjAuMzk2NTI1MyA4OC4xMjUwOTA5LDIxLjUxODc4NzkgQzg5LjA3Nzk3OTgsMjIuNjQxMDUwNSA5MC4zMjc1OTYsMjMuMjAyODI4MyA5MS44NzM5Mzk0LDIzLjIwNDEyMTIgQzkzLjQyNTQ1NDUsMjMuMjA0MTIxMiA5NC42ODAyNDI0LDIyLjY0MjM0MzQgOTUuNjM4MzAzLDIxLjUxODc4NzkgQzk2LjU5NjM2MzYsMjAuMzk1MjMyMyA5Ny4wNzg2MjYzLDE4LjkxMjg4ODkgOTcuMDg1MDkwOSwxNy4wNzE3NTc2IEM5Ny4wODUwOTA5LDE1LjI0MjI2MjYgOTYuNjAyODI4MywxMy43NjU3Mzc0IDk1LjYzODMwMywxMi42NDIxODE4IEM5NC42NzM3Nzc4LDExLjUxODYyNjMgOTMuNDE4OTg5OSwxMC45NTc0OTQ5IDkxLjg3MzkzOTQsMTAuOTU4Nzg3OSBDOTAuMzIyNDI0MiwxMC45NTg3ODc5IDg5LjA3MjgwODEsMTEuNTIwNTY1NyA4OC4xMjUwOTA5LDEyLjY0NDEyMTIgQzg3LjE3NzM3MzcsMTMuNzY3Njc2OCA4Ni43MDA5MjkzLDE1LjI0MzU1NTYgODYuNjk1NzU3NiwxNy4wNzE3NTc2IFoiIGlkPSJTaGFwZSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExMy4wODI0MjYsMjMuNTgyMzAzIEMxMTIuMzI4NTg4LDI0LjAyODU1NjggMTExLjUyMjA0MiwyNC4zNzkwNTk0IDExMC42ODE0NTYsMjQuNjI1Njk3IEMxMDkuOTA2NTU5LDI0Ljg0ODcwNjMgMTA5LjEwNDI5LDI0Ljk2MjI5MDQgMTA4LjI5Nzk0MSwyNC45NjMxNTE1IEMxMDYuMTE4MDYyLDI0Ljk2MzE1MTUgMTA0LjM1NjQ0NiwyNC4yMzk3NTc2IDEwMy4wMTMwOTMsMjIuNzkyOTY5NyBDMTAxLjY2OTczOSwyMS4zNDYxODE4IDEwMC45OTg3MDksMTkuNDQ0OTI5MyAxMDEuMDAwMDAyLDE3LjA4OTIxMjEgQzEwMS4wMDAwMDIsMTQuNjg4MjQyNCAxMDEuNzE3NTc4LDEyLjczOTc5OCAxMDMuMTUyNzI5LDExLjI0Mzg3ODggQzEwNC41ODc4ODEsOS43NDc5NTk2IDEwNi40NjI2MjgsOSAxMDguNzc2OTcyLDkgQzEwOS41MDY3ODYsOS4wMTA2NzU3IDExMC4yMzQ1MjEsOS4wODA3MjUwNiAxMTAuOTUyOTcyLDkuMjA5NDU0NTUgQzExMS43ODA0NDYsOS4zNDY1MDUwNSAxMTIuNzM3MjE0LDkuNTU3MjUyNTMgMTEzLjgyMzI3NSw5Ljg0MTY5Njk3IEwxMTUuNzQ1MjE0LDkuMDY1OTM5MzkgTDExNS43NDUyMTQsMjIuNDI4MzYzNiBDMTE1Ljc0NTIxNCwyNC4yMTM4OTkgMTE1LjY2MDUyNywyNS41MjA0MDQgMTE1LjQ5MTE1MywyNi4zNDc4Nzg4IEMxMTUuMzQyNDYsMjcuMTIxNTE0NSAxMTUuMDQ5NzAyLDI3Ljg2MDMxNiAxMTQuNjI4MTIzLDI4LjUyNTgxODIgQzExMy45OTA4NTgsMjkuNDg5MTM4NSAxMTMuMDg0NDIsMzAuMjQzODI4NyAxMTIuMDIxNTc4LDMwLjY5NiBDMTEwLjc4MzQ2MiwzMS4yMjMxMTc2IDEwOS40NDc0MTMsMzEuNDgwOTQgMTA4LjEwMjA2MiwzMS40NTIzNjM2IEMxMDcuMTMzNTA0LDMxLjQ1MjMwNDUgMTA2LjE2ODkyNCwzMS4zMjg0NzMyIDEwNS4yMzE3NTksMzEuMDgzODc4OCBDMTA0LjI1MjUzMywzMC44MjM5NzcyIDEwMy4zMDY4NjQsMzAuNDUxMDQ2NiAxMDIuNDEzODIsMjkuOTcyNjA2MSBMMTAxLjk2OTY5OSwyNi43NTEyNzI3IEwxMDMuOTU3NTc4LDI4LjA1MDY2NjcgQzEwNC41NTczMTMsMjguNDI0MDE5MyAxMDUuMjExNjU1LDI4LjcwMTQ2MDQgMTA1Ljg5Njk3MiwyOC44NzI5Njk3IEMxMDYuNjQ1NzY0LDI5LjA4MzY3OTYgMTA3LjQxOTI0OCwyOS4xOTM4OTc4IDEwOC4xOTcwOTMsMjkuMjAwNzI3MyBDMTA5Ljc0ODYwOCwyOS4yMDA3MjczIDExMC45NTE2NzksMjguODEyODQ4NSAxMTEuODA2MzA1LDI4LjAzNzA5MDkgQzExMi42NjA5MzEsMjcuMjYxMzMzMyAxMTMuMDg2MzA1LDI2LjE1NzE3MTcgMTEzLjA4MjQyNiwyNC43MjQ2MDYxIEwxMTMuMDgyNDI2LDIzLjU4MjMwMyBaIE0xMTMuMDgyNDI2LDIxLjU1OTUxNTIgTDExMy4wODI0MjYsMTIuMDczOTM5NCBDMTEyLjQ0MzI3NCwxMS43NTQyNTc2IDExMS43NzQxODQsMTEuNDk4MzE0NyAxMTEuMDg0ODUsMTEuMzA5ODE4MiBDMTEwLjQ4MTY0OCwxMS4xNDU3NTc4IDEwOS44NTk3NjcsMTEuMDYwMzYzMyAxMDkuMjM0NjY5LDExLjA1NTc1NzYgQzEwNy41ODEwMTIsMTEuMDU1NzU3NiAxMDYuMjQ5OTQxLDExLjYxMTcxNzIgMTA1LjI0MTQ1NiwxMi43MjM2MzY0IEMxMDQuMjMyOTcyLDEzLjgzNTU1NTYgMTAzLjcyODA4MywxNS4zMTQ2NjY3IDEwMy43MjY3OSwxNy4xNjA5Njk3IEMxMDMuNzI2NzksMTguOTM0ODY4NyAxMDQuMTc5MzE1LDIwLjM0Mjg2ODcgMTA1LjA4NDM2NiwyMS4zODQ5Njk3IEMxMDUuOTg5NDE2LDIyLjQyNzA3MDcgMTA3LjIwODY0OCwyMi45NDc0NzQ3IDEwOC43NDIwNjIsMjIuOTQ2MTgxOCBDMTA5LjM4NDU1MiwyMi45Mzg1ODE3IDExMC4wMjIxNDcsMjIuODMzMjk2NyAxMTAuNjMyOTcyLDIyLjYzMzkzOTQgQzExMS40NzkyNjcsMjIuMzQ4MDE4NiAxMTIuMjk4ODg1LDIxLjk4ODUwMjcgMTEzLjA4MjQyNiwyMS41NTk1MTUyIFoiIGlkPSJTaGFwZSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExOCw5IEwxMjAuODI3NjM2LDkgTDEyNS4yNjQ5NywyMC42MzYzNjM2IEwxMzAuMTQ4MzY0LDkgTDEzMi40NTA0MjQsOSBMMTI1LjM4MTMzMywyNS4zMjM4Nzg4IEwxMjUuMjY0OTcsMjUuNTU0NjY2NyBDMTI0LjE0Nzg3OSwyOC4wOTY1NjU3IDEyMy4yODc0MzQsMjkuOTA2NjY2NyAxMjIuNjgzNjM2LDMwLjk4NDk2OTcgTDExOS43NDE1NzYsMzAuOTg0OTY5NyBDMTIwLjM2ODM1LDMwLjMzNDYwMDkgMTIwLjkzMDIwMSwyOS42MjQ2NTQ2IDEyMS40MTkxNTIsMjguODY1MjEyMSBDMTIyLjAzMTM5MiwyNy44ODE3ODA4IDEyMi41NzUwNjYsMjYuODU3Mjg4NiAxMjMuMDQ2MzAzLDI1Ljc5OTAzMDMgTDEyNC4wMDA0ODUsMjMuNzQ1MjEyMSBMMTE4LDkgWiIgaWQ9IlBhdGgiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzAuNjk2NzI3MywxLjEzNjQ4NDg1IEwzNi4zODEwOTA5LDMuNDA5NDU0NTUgTDM2LjM4MTA5MDksMjMuODc1ODc4OCBDMzYuMzgxMDkwOSwyOC4yNzA1NDU1IDMwLjk1MDc4NzksMjkuMDQyNDI0MiAyNy4yODUzMzMzLDI5LjU2MDI0MjQgQzI5LjM4MTgxODIsMjkuMDQyNDI0MiAzMC43MDgzNjM2LDI4LjQ2MDYwNjEgMzAuNjk2NzI3MywyMy44NzU4Nzg4IEwzMC42OTY3MjczLDUuNjg0MzYzNjQgTDI1LjAxMjM2MzYsMy40MDk0NTQ1NSBMMzAuNjk2NzI3MywxLjEzNjQ4NDg1IFogTTYuODIwODQ4NDgsMjguNDIzNzU3NiBMNi44MjA4NDg0OCwxNS45MjA0ODQ4IEM2LjgyMDg0ODQ4LDE0LjY2MTgxODIgNy43NjUzMzMzMywxMy4yMzgzMDMgOC45MTE1MTUxNSwxMi43NDc2MzY0IEwxNC43ODAxMjEyLDEwLjIyNjQyNDIgTDE0Ljc4MDEyMTIsMTguMTc3OTM5NCBMMjAuNDY0NDg0OCwyMS42MDQ4NDg1IEMyMS42MTA2NjY3LDIyLjE4NjY2NjcgMjMuODc1ODc4OCwyMi4yMDAyNDI0IDIzLjg3NTg3ODgsMjAuNDY2NDI0MiBMMjMuODc1ODc4OCwxNy4wNTUwMzAzIEwyMS41OTkwMzAzLDE1LjkxNjYwNjEgTDIxLjU5OTAzMDMsMCBMNC4yNjY2NjY2Nyw2LjM4NjQyNDI0IEMxLjkxMDMwMzAzLDcuMjUzMzMzMzMgMy4xOTc0NDIzMWUtMTQsOS45ODU5MzkzOSAzLjE5NzQ0MjMxZS0xNCwxMi41MDcxNTE1IEwzLjE5NzQ0MjMxZS0xNCwzMS4yNjY5MDkxIEw2LjgyMDg0ODQ4LDI4LjQyMzc1NzYgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjRkZCQjAwIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==

"
        alt="Logo" width="100px"
      />
    </Box>
    <Menu
      display={{small: "none", medium: "flex", large: "flex"}}
      flexDirection={{small:"row", medium:"row", large:"column"}}
      alignItems={{large:"center"}}
      my={{large:4}}
    >
      <MenuItem> Menu Item 1 </MenuItem>
      <MenuItem> Menu Item 2 </MenuItem>
      <MenuItem> Menu Item 3 </MenuItem>
    </Menu>
    <Flex justifyContent="flex-end">
      <Text mr={ 4 } style={ { float: "right" } } color="white">User Name</Text>
      <Link color="white" href="http://nulogy.design">Logout</Link>
    </Flex>
  </Flex>
);

const Header = styled(BaseHeader)`   
`;

const BaseSidebarItem = props => (
  <Box className={ props.className }>
    <Link
      px={ 4 } py={ 2 } style={ { display: "block" } }
      color={ theme.colors.black } underline={ false } href="http://nulogy.design"
    >
      {props.children}
    </Link>
  </Box>
);

const SidebarItem = styled(BaseSidebarItem)`
&:hover {
  background-color: ${theme.colors.grey}
}
`;
const BaseSidebar = props => (
  <Box className={props.className} bg="whiteGrey" style={ { minWidth: "256px" } } { ...props }>
    {props.children}
  </Box>
);

const Sidebar = styled(BaseSidebar)`
`;

const ChromeWrapper = styled(Flex)`
min-height: 100%;
`;

const Chrome = props => (
  <ChromeWrapper flexDirection={{small: "column", medium: "column", large: "row"}}>
    <Box
      minWidth={{large: "256px"}}
      height={{large: "100vh"}}
      position={{large: "fixed"}}
    >
      <Header />
    </Box>
    <Box style={ { width: "100%" } }>
      { props.children }
    </Box>
  </ChromeWrapper>
);

const Main = styled(Flex)`
`;

const DemoPage = () => {
  const options = [
    { value: "planned", label: "Planned" },
    { value: "booked", label: "Booked" },
  ];
  return (
    <Chrome>
      <Main
        ml={ {
          large: "256px",
        } }
        flexDirection={{
          small: "column",
          medium: "row",
          large: "row",
        }}
        >
        <Sidebar py={ 4 } flexDirection={{small: "256px", medium: "256px" }}>
          <SidebarItem>Contextual Tab 1</SidebarItem>
          <SidebarItem>Contextual Tab 2</SidebarItem>
          <SidebarItem>Contextual Tab 3</SidebarItem>
          <SidebarItem>Contextual Tab 4</SidebarItem>
          <SidebarItem>Contextual Tab 5</SidebarItem>
        </Sidebar>
        <Box width="100%" bg="white" p={ 4 }>
          <Title>Job Page</Title>
          <Form style={ { width: "450px" } } mb={ 6 } title="Job 324400">
            <HeaderValidation message="Instructions and description of an error" title="Error has occured ...">
              <List compact>
                <ListItem>Affected field</ListItem>
                <ListItem>Unmet criteria</ListItem>
                <ListItem><a href="https://nulogy.design/">Affected field</a></ListItem>
              </List>
            </HeaderValidation>
            <FormSection title="Job Information">
              <Field labelText="Project">
                <Input placeholder="Project 128703" />
              </Field>
              <Field
                labelText="Project description" requirementText="(Optional)"
                helpText="Project description helps identify the project."
              >
                <Input />
              </Field>
              <Field labelText="Project status">
                <Select options={ options } />
              </Field>
              <Field labelText="Item code">
                <Input error defaultValue="WS2SB6" />
                <InlineValidation message="Item WS2SB6 does not exist." />
              </Field>
              <Field labelText="Eaches expected on Job">
                <Input placeholder="2 000" style={ { width: "50%" } } />
              </Field>
              <Field labelText="Eaches remaining on Project">
                <Input value="18 000" style={ { width: "50%" } } disabled />
              </Field>
              <Field labelText="Scheduled start" formatText="(Expected format: MMM DD, YYYY)">
                <Input placeholder="May 26, 2019" />
              </Field>
              <Field labelText="Scheduled end" formatText="(Expected format: MMM DD, YYYY)">
                <Input disabled value="June 29, 2019" />
              </Field>
              <Field labelText="Line Lead" requirementText="(Optional)">
                <Checkbox labelText="Christiaan Oostenbrug" />
                <Checkbox labelText="Matt Dunn" />
                <Checkbox disabled checked labelText="Clemens Park" />
                <Checkbox disabled labelText="Nikola Pejcic" />
              </Field>
              <Field labelText="Reconcile">
                <RadioGroup name="settingSelection" defaultValue="yes">
                  <Radio value="yes" labelText="Yes" />
                  <Radio value="no" labelText="No" />
                  <Radio value="maybe" labelText="Maybe" disabled />
                </RadioGroup>
                <InlineValidation message="Yes can be only selected ..." />
              </Field>
              <Field labelText="Job visibility">
                <ToggleWithText
                  onText="Visible" offText="Hidden"
                />
              </Field>
            </FormSection>
            <FormSection title="Rejects">
              <Field labelText="Item">
                <Input error defaultValue="235432" />
                <InlineValidation message="Item 235432 is not a valid entry.">
                  <List compact>
                    <ListItem>Item is at least 8 characters long.</ListItem>
                    <ListItem>Item contains at least 1 letter.</ListItem>
                  </List>
                </InlineValidation>
              </Field>
              <Field labelText="Quantity">
                <Input />
              </Field>
              <Field labelText="Reject visibility">
                <ToggleWithText
                  onText="Visible" offText="Hidden" disabled
                />
              </Field>
            </FormSection>
          </Form>
          <Flex mb={ 6 }>
            <PrimaryButton mr={ 2 }>Save changes</PrimaryButton>
            <QuietButton>Cancel</QuietButton>
          </Flex>
        </Box>
      </Main>
      <Flex
        ml={ {
          small: 0,
          medium: 0,
          large: "256px",
        } }
        px={ 4 } py={ 2 } bg="lightGrey"
        justifyContent="space-between" alignItems="center"
      >
        <Text>Nulogy 2019</Text>
        <IconicButton icon="user">Call support</IconicButton>
      </Flex>
    </Chrome>
  );
};

export default DemoPage;
