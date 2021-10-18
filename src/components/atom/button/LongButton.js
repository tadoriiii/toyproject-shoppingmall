import React from "react";
import styled from "@emotion/styled";

export const LongButton = ({ children }) => {
  return <ButtonJSX>{children}</ButtonJSX>;
};

const ButtonJSX = styled.button`
  height: 50px;
  padding: 5px 12px;
  display: inline-block;

  border: 2px solid white;
  border-radius: 25px;
  background-color: white;

  text-align: center;
  line-height: normal;

  font-weight: 900;
  font-size: 17px;
  white-space: nowrap;
`;
