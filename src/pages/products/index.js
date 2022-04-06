import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/products/actions";
import { selectProducts } from "../../store/products/selectors";

export default () => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, fetchProducts]);

  if (!products) {
    return "Loading";
  }

  return (
    <div>
      {products?.map((product) => (
        <div key={product.sku}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};
