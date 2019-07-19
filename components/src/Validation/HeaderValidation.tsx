import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import { Alert } from "../Alert";
import mapErrorsToList from "./mapErrorsToList";

const BaseHeaderValidation = ({ className, title, errorMessage, errorList, children }) => (
  <Box mb="x2" className={className}>
    <Alert title={title} type="danger">
      {errorMessage}
      {mapErrorsToList(errorList)}
      {children}
    </Alert>
  </Box>
);

const HeaderValidation = styled(BaseHeaderValidation)({});

BaseHeaderValidation.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  errorList: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

BaseHeaderValidation.defaultProps = {
  className: null,
  errorList: null,
  children: null
};

export default HeaderValidation;
