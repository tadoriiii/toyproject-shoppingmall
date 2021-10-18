import React from "react";
import styled from "@emotion/styled";

export const Loading = ({ view }) => {
  if (!view) return null;

  return (
    <LoadingWrapper>
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.h1`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;
