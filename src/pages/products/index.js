import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket } from "../../store/basket/actions";
import { fetchProducts } from "../../store/products/actions";
import { selectProducts } from "../../store/products/selectors";
import { selectTotal, selectNumberOfItems } from "../../store/basket/selectors";
import { Container, Grid, AppBar, Button } from "@mui/material";

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
    <Container>
      <AppBar>
        <span>Total Price: £{totalPrice}</span>
        <span>Number of Items: {numberOfItems}</span>
      </AppBar>
      <br />
      <br />
      <br />
      <Grid container>
        {products?.map((product) => (
          <Grid item key={product.sku}>
            <Grid container spacing={2}>
              <Grid item xs>
                {product.name}
              </Grid>
              <Grid item xs>
                {product.price}
              </Grid>
              <Grid item xs>
                {product.description}
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => dispatch(addToBasket(product.sku))}
                >
                  Add to Basket
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="contained"
                  disableElevation
                  color="error"
                  onClick={() => dispatch(removeFromBasket(product.sku))}
                >
                  Remove to Basket
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
