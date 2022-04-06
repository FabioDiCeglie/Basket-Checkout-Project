import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../../store/basket/actions";
import { fetchProducts } from "../../store/products/actions";
import { selectProducts } from "../../store/products/selectors";
import {
  selectItems,
  selectTotal,
  selectNumberOfItems,
} from "../../store/basket/selectors";

export default () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const totalPrice = useSelector(selectTotal);
  const numberOfItems = useSelector(selectNumberOfItems);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, fetchProducts]);

  if (!products) {
    return "Loading";
  }

  return (
    <div>
      <div>
        <p>Total Price: {totalPrice}£</p>
        <p>Number of Items: {numberOfItems}</p>
      </div>
      {products?.map((product) => (
        <div key={product.sku}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.description}</p>
          <button onClick={() => dispatch(addToBasket(product.sku))}>
            Add to Basket
          </button>
          <button onClick={() => dispatch(removeFromBasket(product.sku))}>
            Remove to Basket
          </button>
        </div>
      ))}
    </div>
  );
};
