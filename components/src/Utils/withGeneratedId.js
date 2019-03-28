import React from "react";
import PropTypes from "prop-types";

const prefix = "random-id-";
let randomId = 0;

const nextId = () => {
  randomId += 1;

  return prefix + randomId;
};

const WithGeneratedId = ({ children }) => {
  const generatedId = nextId();

  return (
    <>
      {children(generatedId)}
    </>
  );
};

WithGeneratedId.propTypes = {
  children: PropTypes.node.isRequired,
};

const withGeneratedId = ComponentToRender => props => (
  <WithGeneratedId>
    { generatedId => <ComponentToRender id={ generatedId } { ...props } /> }
  </WithGeneratedId>
);

export default withGeneratedId;
