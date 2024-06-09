import './cart-dropdown.styles';
import { useSelector } from 'react-redux';
// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectCartItems } from '../../store/cart/cart.selector';
// import { CartContext } from '../../contexts/CartContext';
import Button from '../button/Button';
import CartItem from '../cart-item/CartItem';

import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const handleGoToNavigate = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={handleGoToNavigate}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};
export default CartDropdown;
