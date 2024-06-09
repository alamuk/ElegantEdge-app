import Button from "../button/Button";
import CartItem from "../cart-item/CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CardDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./CardDropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const handleGoToNavigate = () => {
    navigate("/checkout");
  };

  return (
    <CardDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your Card is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={handleGoToNavigate}>GO TO CHECKOUT</Button>
    </CardDropdownContainer>
  );
};
export default CartDropdown;
