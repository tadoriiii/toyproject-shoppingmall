const initialState = {
  product: [],
  likes: [],
};

const SET_PRODUCTS = "SET_PRODUCTS";
const SET_LIKE = "SET_LIKE";
const DELETE_PRODUCTS = "DELETE_PRODUCTS";
const DELETE_LIKE = "DELETE_LIKE";

export const setProducts = (product) => ({
  type: SET_PRODUCTS,
  payload: product,
});
export const setLike = (likes) => ({ type: SET_LIKE, payload: likes });
export const deleteProducts = (product) => ({
  type: DELETE_PRODUCTS,
  payload: product,
});
export const deleteLike = (likes) => ({ type: DELETE_LIKE, payload: likes });

export function Get(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      const productId = action.payload?.id;
      if (!productId) return state;

      const beforeProduct = state.product;
      const isProductExist = beforeProduct.find(
        (beforeProduct) => beforeProduct.id === productId
      );
      if (isProductExist) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          product: [...state.product, action.payload],
        };
      }
    case SET_LIKE:
      const likeId = action.payload?.id;
      if (!likeId) return state;

      const beforeLikes = state.likes;
      const isExist = beforeLikes.find(
        (beforeProduct) => beforeProduct.id === likeId
      );
      if (isExist) {
        return {
          ...state,
          likes: state.likes.filter(
            (beforeProduct) => beforeProduct.id !== likeId
          ),
        };
      } else {
        return {
          ...state,
          likes: [...state.likes, action.payload],
        };
      }
    case DELETE_PRODUCTS:
      const deleteProductId = action.payload?.id;
      console.log("deleteProductId", deleteProductId);
      if (!deleteProductId) return state;
      return {
        ...state,
        product: state.product.filter(
          (product) => product.id !== deleteProductId
        ),
      };
    case DELETE_LIKE:
      const deleteLikeId = action.payload?.id;
      if (!deleteLikeId) return state;
      return {
        ...state,
        likes: state.likes.filter((likes) => likes.id !== deleteLikeId),
      };
    default:
      return state;
  }
}
