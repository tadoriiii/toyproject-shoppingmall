import React from "react";
import styled from "@emotion/styled";
import { useWindowSize } from "react-use";
import { Link } from "react-router-dom";

export const Main = () => {
  const { height } = useWindowSize();
  return (
    <PageJSX style={{ height: height }}>
      <Wrapper>
        <TitleWrapper>
          <Title>Ideal store for</Title>
          <Title>your shopping</Title>
        </TitleWrapper>
        <UnderBar />
        <Link to="/login">
          <Button>SING IN WITH EMAIL</Button>
        </Link>
      </Wrapper>

      <Background height={height} src="/img/my.jpeg" />
    </PageJSX>
  );
};

const PageJSX = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  margin: 500px 0px 0px 50px;
`;
const Title = styled.div`
  color: white;

  font-family: "Roboto", sans-serif;
  font-size: 36px;
  font-weight: 900;
`;
const UnderBar = styled.div`
  width: 300px;

  margin: 20px 0px 0px 50px;

  border-bottom: 2px solid gray;
`;
const Button = styled.button`
  width: 300px;
  height: 50px;

  margin: 20px 0px 0px 50px;

  border: 2px solid white;
  border-radius: 25px;
  background-color: white;

  text-align: center;

  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: 17px;

  text-decoration-line: none;
`;

const Background = styled.img`
  position: absolute;
  inset: 0;
  z-index: 1;

  width: 100%;
  height: ${(props) => `${props.height}px`};
  object-fit: cover;
`;
