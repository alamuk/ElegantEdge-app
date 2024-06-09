import './cart-icon.styles';

import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../store/cart/cart.selector';

// import { useContext } from 'react';
// import { CartContext } from '../../contexts/CartContext';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
