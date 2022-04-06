import { selectProducts } from "../products/selectors";

const getProductById = (getState, id) => {
  const state = getState();

  const products = selectProducts(state);
  return products.find(({ sku }) => sku === id);
};

export const addToBasket = (id) => {
  return async (dispatch, getState) => {
    const product = getProductById(getState, id);

    dispatch({
      type: "basket/add",
      payload: product,
    });
    dispatch({
      type: "basket/updateTotals",
    });
  };
};

export const removeFromBasket = (id) => {
  return async (dispatch, getState) => {
    const product = getProductById(getState, id);

    dispatch({
      type: "basket/remove",
      payload: product,
    });
    dispatch({
      type: "basket/updateTotals",
    });
  };
};
