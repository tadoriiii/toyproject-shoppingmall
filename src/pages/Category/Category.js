import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useWindowSize } from "react-use";
import { useHistory } from "react-router-dom";

import { Underbar } from "components";

export const Category = () => {
  const { height } = useWindowSize();
  const history = useHistory();

  const onClickButton = useCallback(
    (props) => {
      return () => {
        const url = "/category" + props;
        history.push(url);
      };
    },
    [history]
  );
  return (
    <PageJSX style={{ height: height }}>
      <Wrapper>
        <TitleWrapper>
          <Title>Make your</Title>
          <Title>Purchases as</Title>
        </TitleWrapper>
        <UnderbarWrapper>
          <Underbar />
        </UnderbarWrapper>
        <CategoryWrapper>
          <CategoryButton onClick={onClickButton("/electronics")}>
            electronics
          </CategoryButton>
          <CategoryButton onClick={onClickButton("/jewelery")}>
            jewelery
          </CategoryButton>
          <CategoryButton onClick={onClickButton("/men's clothing")}>
            men
          </CategoryButton>
          <CategoryButton onClick={onClickButton("/women")}>
            women
          </CategoryButton>
        </CategoryWrapper>
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
  margin: 450px 0px 0px 50px;
`;
const Title = styled.div`
  color: white;

  font-family: "Roboto", sans-serif;
  font-size: 36px;
  font-weight: 900;
`;
const UnderbarWrapper = styled.div`
  margin: 20px 0px 0px 50px;
`;
const CategoryWrapper = styled.div`
  width: 280px;

  margin: 20px 0px 0px 60px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const CategoryButton = styled.button`
  width: 130px;
  height: 50px;
  padding: 7px;
  margin-bottom: 10px;

  border: 1px solid white;
  border-radius: 25px;
  background-color: white;

  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 500;

  text-align: center;
`;
const Background = styled.img`
  position: absolute;
  inset: 0;
  z-index: 1;

  width: 100%;
  height: ${(props) => `${props.height}px`};
  object-fit: cover;
`;
