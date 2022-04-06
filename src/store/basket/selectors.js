export const selectItems = (reduxState) => reduxState.basket.items;
export const selectTotal = (reduxState) => reduxState.basket.total;
export const selectNumberOfItems = (reduxState) =>
  reduxState.basket.numberOfItems;
