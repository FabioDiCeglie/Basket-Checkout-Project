const getRoot = (state) => state.basket;

export const selectItems = (reduxState) => getRoot(reduxState).items;
export const selectTotal = (reduxState) => reduxState.basket.total;
export const selectNumberOfItems = (reduxState) =>
  reduxState.basket.numberOfItems;
