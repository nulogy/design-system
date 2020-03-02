import PropTypes from "prop-types";

export const columnPropType = PropTypes.shape({
  align: PropTypes.oneOf(["right", "left", "center"]),
  label: PropTypes.string,
  dataKey: PropTypes.string,
  cellFormatter: PropTypes.func,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.func,
  width: PropTypes.string
});

export const rowPropType = PropTypes.objectOf(
  PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
    PropTypes.shape({})
  ])
);

export const columnsPropType = PropTypes.arrayOf(columnPropType);

export const rowsPropType = PropTypes.arrayOf(rowPropType);
