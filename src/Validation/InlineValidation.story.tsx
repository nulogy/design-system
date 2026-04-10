import { InlineValidation, Link, List, ListItem } from "../index";

const errorList = [
	"Entry must be at least 3 characters long.",
	"Entry must contain a number.",
];

export default {
	title: "Components/Inline Validation",
};

export const _InlineValidation = () => (
	<InlineValidation errorMessage="Something has gone wrong" />
);

export const WithListItems = {
	render: () => (
		<InlineValidation
			errorMessage="Something has gone wrong"
			errorList={errorList}
		/>
	),
	name: "with list items",
};

export const WithOnlyListItems = {
	render: () => <InlineValidation errorList={errorList} />,
	name: "with only list items",
};

export const WithCustomContent = {
	render: () => (
		<InlineValidation errorMessage="Something has gone wrong.">
			<List compact leftAlign>
				<ListItem>Entry must be at least 3 characters long.</ListItem>
				<ListItem>Entry must contain a number</ListItem>
				<ListItem>
					<Link href="https://nulogy.design/">Custom Link</Link>
				</ListItem>
			</List>
		</InlineValidation>
	),

	name: "with custom content",
};
