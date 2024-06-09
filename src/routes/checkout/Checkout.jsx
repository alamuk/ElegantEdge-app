import './checkout.styles.scss';
import { useSelector } from 'react-redux';
// import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';
// import { CartContext } from '../../contexts/CartContext';

const Checkout = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);

  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: £{cartTotal}</span>
    </div>
  );
};
export default Checkout;
