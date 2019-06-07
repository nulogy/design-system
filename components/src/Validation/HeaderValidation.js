import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "../Box";
import { Alert } from "../Alert";
import mapErrorsToList from "./mapErrorsToList";

const BaseHeaderValidation = ({ title, errorMessage, errorList, children }) => (
  <Box mb="x2">
    <Alert title={title} type="danger">
      {errorMessage}
      {mapErrorsToList(errorList)}
      {children}
    </Alert>
  </Box>
);

const HeaderValidation = styled(BaseHeaderValidation)({});

BaseHeaderValidation.propTypes = {
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  errorList: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

BaseHeaderValidation.defaultProps = {
  errorList: null,
  children: null
};

export default HeaderValidation;
