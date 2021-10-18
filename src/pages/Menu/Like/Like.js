import React, { useCallback } from "react";
import { useWindowSize } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { Header } from "components";
import { deleteLike } from "redux/Get";

export const Like = () => {
  const { height } = useWindowSize();
  const { likes } = useSelector((state) => ({
    likes: state.Get.likes,
  }));
  const dispatch = useDispatch();

  const onDelete = useCallback(
    (likes) => {
      return () => {
        dispatch(deleteLike(likes));
      };
    },
    [dispatch]
  );

  return (
    <PageJSX style={{ height: height }}>
      <Header props={"Wish List"} />
      <ProductWrapper>
        {likes.map((item) => (
          <Product key={item.id}>
            <Link
              to={`/product/${item.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ProductImage src={item.image} alt="product-img" />
              <ProductTitle>{item.title}</ProductTitle>
              <ProductPrice>${item.price}</ProductPrice>
            </Link>
            <ProductDelete onClick={onDelete(item)}>삭제</ProductDelete>
          </Product>
        ))}
      </ProductWrapper>
    </PageJSX>
  );
};

const PageJSX = styled.div`
  width: 100%;

  padding-top: 50px;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 20px 0px 20px;
`;
const Product = styled.div`
  width: 167.5px;
  height: 350px;
`;
const ProductImage = styled.img`
  width: 150px;
  height: 200px;
  margin-left: 8.75px;
`;
const ProductTitle = styled.div`
  margin-left: 8.75px;
  margin-top: 12px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 700;
`;
const ProductPrice = styled.div`
  margin-left: 8.75px;
  margin-top: 12px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
`;
const ProductDelete = styled.button``;
