import React from "react";
import styled from "styled-components";
import { UserMenuInfo } from "../../../types";
import { Text } from "../../../../Type";
import { Flex } from "../../../../Flex";

const USER_MENU_HEADER_HEIGHT = "104px";

const HeaderText = styled(Text).attrs({
  color: "darkGrey",
  fontSize: "small",
  fontStyle: "normal",
  lineHeight: "smallTextBase",
  m: "none",
})({});

export const Header = ({ title, subtitle1, subtitle2 }: UserMenuInfo) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      alignSelf="stretch"
      px="x3"
      py="none"
      bg="whiteGrey"
      borderTopLeftRadius="large"
      borderTopRightRadius="large"
      height={USER_MENU_HEADER_HEIGHT}
    >
      <HeaderText fontWeight="bold">{title}</HeaderText>
      <HeaderText fontWeight="normal">{subtitle1}</HeaderText>
      <HeaderText fontWeight="normal">{subtitle2}</HeaderText>
    </Flex>
  );
};
