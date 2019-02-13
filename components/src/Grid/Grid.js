
import styled from "styled-components";
import PropTypes from "prop-types";

const Grid = styled.div([], props => ({
  display: "grid",
  gridTemplate: props.gridTemplate,
  gridTemplateColumns: props.gridTemplateColumns,
  gridTemplateRows: props.gridTemplateRows,
  gridTemplateAreas: props.gridTemplateAreas,
  gridGap: props.gridGap,
  gridColumnGap: props.gridColumnGap,
  gridRowGap: props.gridRowGap,
  placeItems: props.placeItems,
  justifyItems: props.justifyItems,
  alignItems: props.alignItems,
  placeContent: props.placeContent,
  justifyContent: props.justifyContent,
  alignContent: props.alignContent,
  gridAutoColumns: props.gridAutoColumns,
  gridAutoRows: props.gridAutoRows,
  gridAutoFlow: props.gridAutoFlow,
  grid: props.grid,
}));

Grid.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  gap: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  align: PropTypes.string,
};

export default Grid;
