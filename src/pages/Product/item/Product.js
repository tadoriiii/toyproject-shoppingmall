import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useWindowSize } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import { getProduct } from "common";
import { Header, Loading } from "components";
import { setLike, setProducts } from "redux/Get";

export const Product = () => {
  const { id } = useParams();
  const { height } = useWindowSize();

  const dispatch = useDispatch();
  const likes = useSelector((state) => state.Get.likes);

  const [product, setProduct] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(undefined);

  const isLiked = useMemo(() => {
    const isLiked = likes.find(
      (likedProduct) => likedProduct.id === product?.id
    );
    return !!isLiked;
  }, [likes, product]);

  console.log(`isLiked`, isLiked);

  const onGetProduct = useCallback(async () => {
    setLoading(true);
    const response = await getProduct(id);
    if (response.status === 200) {
      const product = response.data;
      setProduct(product);
    } else {
      throw response;
    }
    setLoading(false);
  }, [id]);

  const onCart = useCallback(
    (product) => {
      return () => {
        dispatch(setProducts(product));
      };
    },
    [dispatch]
  );

  const onLike = useCallback(
    (product) => {
      return () => {
        dispatch(setLike(product));
        setModalOpen(!isLiked);
      };
    },
    [dispatch, isLiked]
  );

  useEffect(() => {
    onGetProduct();
  }, [onGetProduct]);

  const onClose = useCallback(() => {
    return setModalOpen(undefined);
  }, [setModalOpen]);

  if (!product) return null;

  return (
    <PageJSX style={{ height: height }}>
      <Header />
      <ProductImage src={product.image} alt="productImage" />
      <ProductPrice>${product.price}</ProductPrice>
      <ProductTitle>{product.title}</ProductTitle>
      <ButtonWrapper>
        <Link to="/cart">
          <LeftButton onClick={onCart(product)}>BUY</LeftButton>
        </Link>
        <RightButton onClick={onLike(product)}>
          <HeartImg
            src={isLiked ? "/img/fullHeart.png" : "/img/redHeart.png"}
            alt="changeHeart"
          />
          <Text>{isLiked ? "좋아요 취소" : "좋아요"}</Text>
        </RightButton>
      </ButtonWrapper>
      <Description>- Product Description</Description>
      <Content>{product.description}</Content>
      <ModalWindow isOpen={!!modalOpen} onRequestClose={onClose}>
        <ModalContent>Go Like Page?</ModalContent>
        <Link to="/like">
          <CheckButton>Yes</CheckButton>
        </Link>
        <CancleButton onClick={onClose}>No</CancleButton>
      </ModalWindow>
      <Loading view={loading} />
    </PageJSX>
  );
};

const PageJSX = styled.div`
  width: 100%;

  padding-top: 50px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 400px;

  margin-top: 4px;
`;
const ProductPrice = styled.div`
  margin-top: 28px;
  margin-left: 12px;

  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;
const ProductTitle = styled.div`
  margin-top: 8px;
  margin-left: 12px;

  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 900;
`;
const ButtonWrapper = styled.div`
  width: 100%;

  margin-top: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const LeftButton = styled.button`
  width: 150px;
  height: 50px;

  border: 2px solid black;
  border-radius: 4px;
  background-color: black;
  color: white;

  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 700;
`;
const RightButton = styled.button`
  width: 150px;
  height: 50px;

  display: flex;
  flex-direction: row;

  border: 2px solid black;
  border-radius: 4px;
  background-color: black;

  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 700;

  color: white;
`;
const HeartImg = styled.img`
  width: 20px;
  height: 20px;

  margin-right: 8px;
`;
const Description = styled.div`
  margin: 40px 0px 0px 12px;

  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 900;
`;
const Content = styled.div`
  margin: 16px 0px 0px 12px;

  font-family: "Roboto", sans-serif;
  font-size: 16px;
  font-weight: 500;
`;
const ModalWindow = styled(Modal)`
  width: 250px;
  height: 100px;

  text-align: center;

  margin: 0 auto;
  margin-top: 356px;

  background-color: #ddd;
  border: 2px solid #ddd;
`;
const ModalContent = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 24px;

  margin-top: 20px;
`;
const CheckButton = styled.button`
  margin-top: 4px;
`;
const CancleButton = styled.button`
  margin-left: 4px;
`;
