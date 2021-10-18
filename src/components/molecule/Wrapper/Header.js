import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

import styled from "@emotion/styled";

export const Header = ({ props }) => {
  const history = useHistory();
  const [headerStyle, setHeaderStyle] = useState({
    transition: "all 200ms ease-in",
  });

  const onMove = useCallback(
    (props) => {
      return () => {
        history.push(props);
      };
    },
    [history]
  );

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isVisible = currPos.y > prevPos.y;
      const shouldBeStyle = {
        visibility: isVisible ? "visible" : "hidden",
        transition: `all 200ms ${isVisible ? "ease-in" : "ease-out"}`,
        transform: isVisible ? "none" : "translate(0, -100%)",
      };
      if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return;

      setHeaderStyle(shouldBeStyle);
    },
    [headerStyle]
  );

  return (
    <Wrapper style={{ ...headerStyle }}>
      <LeftWrapper>
        <Icon
          onClick={() => history.goBack()}
          src={"/img/back.png"}
          alt="backmark"
        />
        {props && <Title>{props}</Title>}
      </LeftWrapper>
      <RightWrapper>
        <LeftIcon
          src={"/img/cart.jpeg"}
          alt="cartImage"
          onClick={onMove("/cart")}
        />
        <RightIcon
          src={"/img/heart.png"}
          alt="heartImage"
          onClick={onMove("/like")}
        />
      </RightWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 50px;

  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;

  border-bottom: 1px solid #ddd;
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Icon = styled.img`
  width: 27px;
  height: 27px;
  margin: 11.5px 0px 0px 10px;
`;
const Title = styled.div`
  margin: 8px 0px 0px 8px;

  font-family: "Roboto", sans-serif;
  font-weight: 600;
  font-size: 28px;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const LeftIcon = styled.img`
  width: 32px;
  height: 32px;

  margin: 9px 8px 0px 0px;
`;
const RightIcon = styled.img`
  width: 28px;
  height: 28px;

  margin: 11px 10px 0px 0px;
`;
