import { styled } from "styled-components";
import BackgroundTriangles from "../../../../Decorations";
import { Flex } from "../../../../Flex";
import type { FlexProps } from "../../../../Flex/Flex";
import { Text } from "../../../../Type";
import type { UserMenuInfo } from "../../../types";

const USER_MENU_HEADER_HEIGHT = "104px";

const HeaderText = styled(Text).attrs({
	color: "darkGrey",
	fontSize: "small",
	fontStyle: "normal",
	lineHeight: "smallTextBase",
	m: "none",
})({});

const HeaderWrapper = styled(Flex).attrs({
	position: "relative",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "flex-start",
	alignSelf: "stretch",
	px: "x3",
	py: "none",
	bg: "whiteGrey",
	borderTopLeftRadius: "large",
	borderTopRightRadius: "large",
	height: USER_MENU_HEADER_HEIGHT,
	overflow: "hidden",
})(({ theme }) => ({
	"&:last-child": {
		borderBottomLeftRadius: theme.radii.large,
		borderBottomRightRadius: theme.radii.large,
	},
}));

export interface HeaderProps extends UserMenuInfo {
	containerProps?: FlexProps;
}

export const Header = ({
	title,
	subtitle1,
	subtitle2,
	containerProps,
}: HeaderProps) => {
	return (
		<HeaderWrapper {...containerProps}>
			<HeaderText fontWeight="bold">{title}</HeaderText>
			<HeaderText fontWeight="normal">{subtitle1}</HeaderText>
			<HeaderText fontWeight="normal">{subtitle2}</HeaderText>
			<BackgroundTriangles />
		</HeaderWrapper>
	);
};
