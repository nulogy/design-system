import styled from "styled-components";
import PropTypes from "prop-types";
import Box from "../Box/Box";

const GridItem = styled(Box)([], props => ({
  gridColumn: props.gridColumn,
  gridColumnStart: props.gridColumnStart,
  gridColumnEnd: props.gridColumnEnd,
  gridRow: props.gridRow,
  gridRowStart: props.gridRowStart,
  gridRowEnd: props.gridRowEnd,
  gridArea: props.gridArea,
  placeSelf: props.placeSelf,
  justifySelf: props.justifySelf,
  alignSelf: props.alignSelf,
}));

GridItem.propTypes = {
};

export default GridItem;
