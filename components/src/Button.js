import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border: 2px solid Coral;
  color: Coral;
  padding: 1rem 2rem;
  border-radius: .4rem;
  &:hover {
    background-color: Coral;
    color: white;
  }
`;

export default Button;
