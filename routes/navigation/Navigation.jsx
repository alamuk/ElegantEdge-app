// import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './Navigation.styles';

import CartDropdown from '../../components/cart-dropdown/CartDropdown';

import CartIcon from '../../components/cart-icon/CartIcon';
// import { CartContext } from '../../contexts/CartContext';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

import { selectCurrentUser } from '../../store/user/user.selector';
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './Navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  // const { isCartOpen } = useContext(CartContext);

  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};

export default Navigation;
