import { List, ListItem } from "../index";

export default {
	title: "Components/List",
};

export const _List = () => (
	<List>
		<ListItem>List Item 1</ListItem>
		<ListItem>
			List Item 2 that is really really really really really really really
			really really long
		</ListItem>
		<ListItem>List Item 3</ListItem>
	</List>
);

export const WithCustomColour = {
	render: () => (
		<List color="red">
			<ListItem>List Item 1</ListItem>
			<ListItem>
				List Item 2 that is really really really really really really really
				really really long
			</ListItem>
			<ListItem>List Item 3</ListItem>
		</List>
	),

	name: "With custom colour",
};

export const WithCustomFontSizeAndLineHeight = {
	render: () => (
		<List fontSize="small" lineHeight="smallTextBase">
			<ListItem>List Item 1</ListItem>
			<ListItem>
				List Item 2 that is really really really really really really really
				really really long
			</ListItem>
			<ListItem fontSize="large">Larger List Item 3</ListItem>
		</List>
	),

	name: "With custom font size and line height",
};

export const WithCompactSpacing = {
	render: () => (
		<List compact>
			<ListItem>List Item 1</ListItem>
			<ListItem>
				List Item 2 that is really really really really really really really
				really really long
			</ListItem>
			<ListItem>List Item 3</ListItem>
		</List>
	),

	name: "With compact spacing",
};

export const WithLeftAlignment = {
	render: () => (
		<List leftAlign>
			<ListItem>List Item 1</ListItem>
			<ListItem>
				List Item 2 that is really really really really really really really
				really really long
			</ListItem>
			<ListItem>List Item 3</ListItem>
		</List>
	),

	name: "With left alignment",
};
