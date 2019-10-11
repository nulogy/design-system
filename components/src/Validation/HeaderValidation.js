import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Alert } from "../Alert";
import mapErrorsToList from "./mapErrorsToList";

const BaseHeaderValidation = ({ className, id, title, errorMessage, errorList, children, mb }) => (
  <Alert mb={mb} className={className} id={id} title={title} type="danger">
    {errorMessage}
    {mapErrorsToList(errorList)}
    {children}
  </Alert>
);

const HeaderValidation = styled(BaseHeaderValidation)({});

BaseHeaderValidation.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  errorList: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  mb: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

BaseHeaderValidation.defaultProps = {
  className: undefined,
  id: undefined,
  errorList: null,
  children: null,
  mb: "x2"
};

export default HeaderValidation;
