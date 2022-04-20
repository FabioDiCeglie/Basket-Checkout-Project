/* eslint-disable import/no-anonymous-default-export */
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeAllProductFromBasket } from "../../store/basket/actions";
import {
  selectTotal,
  selectNumberOfItems,
  selectItems,
} from "../../store/basket/selectors";
import {
  Container,
  Grid,
  AppBar,
  Button,
  Stack,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default () => {
  const dispatch = useDispatch();

  const products = useSelector(selectItems);
  const basketProducts = Object.values(products);
  const totalPrice = useSelector(selectTotal);
  const numberOfItems = useSelector(selectNumberOfItems);

  if (!basketProducts) {
    return "Any products in the cart";
  }

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Container>
            <Stack
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={3}
            >
              <Badge badgeContent={numberOfItems} color="secondary">
                <IconButton color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
              <span>£{totalPrice}</span>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ pt: 15, pb: 5 }}>
          <Grid container alignItems="center" spacing={2}>
            {basketProducts?.map((product) => {
              const { sku, name, description, price } = product.product;
              return (
                <Fragment key={sku}>
                  <Grid item xs={12} lg={3}>
                    <strong>{name}</strong>
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <FormControl>
                      <InputLabel>{product.qty}</InputLabel>
                      <Select label="Qty">
                        <MenuItem>{product.qty}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    {description}
                  </Grid>
                  <Grid item xs={12} lg={1}>
                    £{price}
                  </Grid>
                  <Grid item xs={12} lg={2}>
                    <Stack spacing={1} direction="row">
                      <Button
                        variant="contained"
                        disableElevation
                        color="error"
                        size="large"
                        onClick={() =>
                          dispatch(removeAllProductFromBasket(sku))
                        }
                      >
                        Remove All
                      </Button>
                    </Stack>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Container>
        <Stack
          direction="row"
          justifyContent="end"
          alignItems="center"
          spacing={3}
        >
          <Link to="/products" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              disableElevation
              size="small"
              color="info"
            >
              Continue Shopping
            </Button>
          </Link>
          <Button variant="contained" disableElevation size="small">
            Complete Checkout
          </Button>
        </Stack>
      </Container>
    </>
  );
};
