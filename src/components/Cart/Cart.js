import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();

  const handleEmptyCart = () => onEmptyCart();
  


  const renderEmptyCart = () => (
    <Typography variant="subtitle1">You have no items in your shopping cart,
      <Link className={classes.link} to="/"> start adding some</Link>!
    </Typography>
  );

  // if (!cart.cardDetails.) return 'Loading';

 

  const renderCart = () => (
    <>
      <Grid container spacing={4}>
        {cart[0].cartDetails.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.bookId}>
            <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Grid>
        ))}
      </Grid>
      
      
      <div className={classes.cardDetails}>
      <Typography variant="h5" >Subtotal: <b >{cart.cartTotal}</b></Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to="/checkout" size="large" type="button" variant="contained" >Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom><b>Your Shopping Cart</b></Typography>
      <hr/>
      
      { !cart.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;