import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { styled } from "styled-components";
import TabScrollIndicator from "./TabScrollIndicator";

const TabScrollIndicatorContainer = styled.div<{ width: number }>(
	({ width, theme }) => ({
		position: "absolute",
		width,
		height: theme.space.x5,
	}),
);

interface TabScrollIndicatorsProps {
	tabRefs?: Array<HTMLButtonElement | null>;
	tabContainerRef?: React.RefObject<HTMLDivElement>;
	indicatorWidth?: number;
	children: (handlers: {
		handleScroll: () => void;
		handleResize: () => void;
	}) => React.ReactNode;
}

function TabScrollIndicators({
	tabRefs,
	tabContainerRef,
	indicatorWidth = 40,
	children,
}: TabScrollIndicatorsProps) {
	const [hiddenLeft, setHiddenLeft] = useState(false);
	const [hiddenRight, setHiddenRight] = useState(false);

	const isHiddenLeft = useCallback(() => {
		const container = tabContainerRef?.current;
		if (!container) return false;
		return (
			container.scrollLeft !== 0 &&
			container.offsetWidth < container.scrollWidth
		);
	}, [tabContainerRef]);

	const isHiddenRight = useCallback(() => {
		const container = tabContainerRef?.current;
		if (!container) return false;
		return container.scrollLeft + container.offsetWidth < container.scrollWidth;
	}, [tabContainerRef]);

	const updateVisibility = useCallback(() => {
		setHiddenLeft(isHiddenLeft());
		setHiddenRight(isHiddenRight());
	}, [isHiddenLeft, isHiddenRight]);

	useEffect(() => {
		updateVisibility();
	}, [updateVisibility]);

	useResizeDetector({
		targetRef: tabContainerRef as React.MutableRefObject<HTMLDivElement | null>,
		onResize: updateVisibility,
	});

	const handleScroll = useCallback(() => {
		updateVisibility();
	}, [updateVisibility]);

	function getScrollLeftByTabIndex(index: number) {
		let sum = 0;
		for (let i = 0; i < index; i++) {
			sum += tabRefs[i]?.offsetWidth ?? 0;
		}
		return sum;
	}

	function findLastVisibleTab() {
		const container = tabContainerRef.current;
		const rightMarker =
			container.scrollLeft + container.offsetWidth - indicatorWidth;
		let sum = 0;
		for (let i = 0; i < tabRefs.length; i++) {
			sum += tabRefs[i]?.offsetWidth ?? 0;
			if (rightMarker <= sum) return i;
		}
		return null;
	}

	function findFirstVisibleTab() {
		const container = tabContainerRef.current;
		const leftMarker = container.scrollLeft + indicatorWidth;
		let sum = 0;
		for (let i = 0; i < tabRefs.length; i++) {
			sum += tabRefs[i]?.offsetWidth ?? 0;
			if (leftMarker <= sum) return i;
		}
		return null;
	}

	function handleIndicatorClick(side: "left" | "right") {
		const container = tabContainerRef.current;
		if (side === "right") {
			const lastVisible = findLastVisibleTab();
			container.scroll({
				left: getScrollLeftByTabIndex(lastVisible) - indicatorWidth,
				behavior: "smooth",
			});
		} else {
			const firstVisible = findFirstVisibleTab();
			container.scroll({
				left:
					getScrollLeftByTabIndex(firstVisible) +
					indicatorWidth +
					(tabRefs[firstVisible]?.offsetWidth ?? 0) -
					container.offsetWidth,
				behavior: "smooth",
			});
		}
	}

	const containerWidth = tabContainerRef?.current?.offsetWidth ?? 0;

	return (
		<>
			<TabScrollIndicatorContainer width={containerWidth}>
				{hiddenLeft && (
					<TabScrollIndicator
						width={indicatorWidth}
						side="left"
						onClick={() => handleIndicatorClick("left")}
					/>
				)}
				{hiddenRight && (
					<TabScrollIndicator
						width={indicatorWidth}
						side="right"
						onClick={() => handleIndicatorClick("right")}
					/>
				)}
			</TabScrollIndicatorContainer>
			{children({ handleScroll, handleResize: updateVisibility })}
		</>
	);
}

export default TabScrollIndicators;
