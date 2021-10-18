import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useWindowSize } from "react-use";
import styled from "@emotion/styled";

import { getProducts } from "common";
import { Header, Loading } from "components";

const getCatgoryName = (category) => {
  switch (category) {
    case "men":
      return "men's clothing";
    case "women":
      return "women's clothing";
    default:
      return category;
  }
};

export const Products = () => {
  const { category } = useParams();
  const productCategory = useMemo(() => getCatgoryName(category), [category]);
  const { height } = useWindowSize();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const onGetProducts = useCallback(async () => {
    setLoading(true);
    const response = await getProducts(productCategory);
    if (response.status === 200) {
      const products = response.data;
      setProducts(products);
    } else {
      throw response;
    }
    setLoading(false);
  }, [productCategory]);

  useEffect(() => {
    onGetProducts();
  }, [onGetProducts]);

  return (
    <PageJSX style={{ height: height }}>
      <Header props={productCategory} />
      <ItemWrapper>
        {products.map((product) => (
          <Item key={product.id}>
            <Link
              to={`/product/${product.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ItemImage src={product.image} alt="productImage" />
              <ItemTitle>{product.title}</ItemTitle>
            </Link>
            <ItemPrice>${product.price}</ItemPrice>
          </Item>
        ))}
      </ItemWrapper>
      <Loading view={loading} />
    </PageJSX>
  );
};

const PageJSX = styled.div`
  width: 100%;

  padding-top: 50px;
`;
const ItemWrapper = styled.div`
  width: 100%;

  margin-top: 4px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Item = styled.div`
  width: 160px;
  /* height: 350px; */

  margin-bottom: 32px;

  display: flex;
  flex-direction: column;
`;
const ItemImage = styled.img`
  width: 160px;
  height: 160px;
`;
const ItemTitle = styled.div`
  width: 160px;

  padding-top: 8px;

  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;
const ItemPrice = styled.div`
  padding-top: 8px;

  font-size: 14px;
`;
