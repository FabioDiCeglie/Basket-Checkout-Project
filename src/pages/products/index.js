/* eslint-disable import/no-anonymous-default-export */
import {useEffect, Fragment} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom"
import {addToBasket, removeFromBasket} from "../../store/basket/actions";
import {fetchProducts} from "../../store/products/actions";
import {selectProducts} from "../../store/products/selectors";
import {selectTotal, selectNumberOfItems} from "../../store/basket/selectors";
import {Container, Grid, AppBar, Button, Stack, Toolbar, IconButton, Badge, Box} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Container>
            <Stack direction="row" justifyContent="end" alignItems="center" spacing={3}>
              <Badge badgeContent={numberOfItems} color="secondary">
                <IconButton color="inherit">
                  <ShoppingCartIcon/>
                </IconButton>
              </Badge>
              <span>£{totalPrice}</span>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{pt: 15, pb: 5}}>
          <Grid container alignItems="center" spacing={2}>
            {products?.map((product) => (
              <Fragment key={product.sku}>
                <Grid item xs={12} lg={4}>
                  <strong>{product.name}</strong>
                </Grid>
                <Grid item xs={12} lg={4}>
                  {product.description}
                </Grid>
                <Grid item xs={12} lg={1}>
                  £{product.price}
                </Grid>
                <Grid item xs={12} lg={3}>
                  <Stack spacing={1} direction="row">
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      onClick={() => dispatch(addToBasket(product.sku))}
                    >
                      Add to Basket
                    </Button>
                    <Button
                      variant="contained"
                      disableElevation
                      color="error"
                      size="small"
                      onClick={() => dispatch(removeFromBasket(product.sku))}
                    >
                      Remove from Basket
                    </Button>
                  </Stack>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Box>
      </Container>
      <Container>
        <Stack direction="row" justifyContent="end" alignItems="center" spacing={3}>
          <Link to="/products/checkout"  style={{ textDecoration: 'none' }} >
          <Button
            variant="contained"
            disableElevation
            size="small"
          >
            Proceed to Checkout
          </Button>
          </Link>
        </Stack>
      </Container>
    </>
  );
};
