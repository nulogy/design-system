import DescriptionList from "../DescriptionList";

export default {
	title: "Components/DescriptionList",
	component: DescriptionList,
	// This file only re-exports stories defined in sibling files — the Storybook
	// Vitest plugin can't transform re-exported stories, so we opt out of testing.
	tags: ["!test"],
};

export { GroupMinWidth } from "./DescriptionList.group-min-width.story";
export { Playground } from "./DescriptionList.playground.story";
