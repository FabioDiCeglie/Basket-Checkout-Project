import { selectProducts } from "../products/selectors";
import { selectItems } from "./selectors";

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

export const removeAllProductFromBasket = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const basket = selectItems(state);
    const item = basket[id];

    dispatch({
      type: "basket/removeAll",
      payload: item,
    });
    dispatch({
      type: "basket/updateTotals",
    });
  };
};
