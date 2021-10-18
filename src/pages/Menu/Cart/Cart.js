import React, { useCallback } from "react";
import { useWindowSize } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";

import { Header } from "components";
import { deleteProducts } from "redux/Get";

export const Cart = () => {
  const { height } = useWindowSize();
  const { product } = useSelector((state) => ({
    product: state.Get.product,
  }));

  console.log("product", product);
  const dispatch = useDispatch();

  const onDelete = useCallback(
    (product) => {
      return () => {
        console.log("deletedproductid", product.id);
        dispatch(deleteProducts(product));
      };
    },
    [dispatch]
  );

  return (
    <PageJSX style={{ height: height }}>
      <Header props={"Cart"} />
      {product.map((item) => (
        <ProductWrapper key={item.id}>
          <ProductImage src={item.image} alt="product-img" />
          <ProductDetails>
            <ProductTitle>{item.title}</ProductTitle>
            <ProductPrice>${item.price}</ProductPrice>
            <ProductDelete onClick={onDelete(item)}>삭제</ProductDelete>
          </ProductDetails>
        </ProductWrapper>
      ))}
    </PageJSX>
  );
};

const PageJSX = styled.div`
  width: 100%;

  padding-top: 50px;
`;

const ProductWrapper = styled.div`
  border-bottom: 2px solid #ddd;
  margin: 20px 20px 0px 20px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 8px;
`;
const ProductImage = styled.img`
  width: 120px;
  height: 200px;
`;
const ProductDetails = styled.div`
  width: 191px;
  height: 200px;
  margin-left: 20px;
  margin-top: 10px;
`;
const ProductTitle = styled.div`
  height: 170px;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 700;
`;
const ProductPrice = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 700;
`;
const ProductDelete = styled.button``;
