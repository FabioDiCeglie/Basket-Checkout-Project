import {Fragment} from "react";
import {useSelector} from "react-redux";
import {selectTotal, selectNumberOfItems} from "../../store/basket/selectors";
import {Container, Grid, AppBar, Button, Stack, Toolbar, IconButton, Badge, Box,Link} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {selectProducts} from "../../store/products/selectors";

export default () => {

  const products = useSelector(selectProducts);
  const totalPrice = useSelector(selectTotal);
  const numberOfItems = useSelector(selectNumberOfItems);

  if (!products) {
    return "Any products in the cart";
  }

  return <>
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
                    color="error"
                    size="small"
                  >
                    Remove All
                  </Button>
                </Stack>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
    </Container>
  </>
}