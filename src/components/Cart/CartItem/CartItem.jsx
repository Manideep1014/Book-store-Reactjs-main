import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();

  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item">
      <CardMedia image={item?.book?.bookImageLink} alt={item.book.bookTitle} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">{item.book.bookTitle}</Typography>
        <Typography variant="h6" color='secondary' >{item.subTotalCart}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.bookId, item.cartQuantity - 1)}>-</Button>
          <Typography>&nbsp;{item.cartQuantity}&nbsp;</Typography>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.bookId, item.cartQuantity + 1)}>+</Button>
        </div>
        <Button className={classes.button} variant="contained" type="button" color='secondary' onClick={() => handleRemoveFromCart(item.bookId)}>Remove</Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
