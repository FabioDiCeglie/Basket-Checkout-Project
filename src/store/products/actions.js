import { getProducts } from "../../apiClient";

const productsLoaded = (data) => ({
  type: "productsPage/productsLoaded",
  payload: data,
});

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await getProducts();

      if (response === null) {
        throw new Error("Failed to load products from the API");
      } else {
        dispatch(productsLoaded(response));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
