// import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";

import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./Navigation.styles";

import CartDropdown from "../../components/cart-dropdown/CartDropdown";

import CartIcon from "../../components/cart-icon/CartIcon";
// import { CartContext } from "../../contexts/CartContext";
import { selectCurrentUser } from "../../store/user/user.selector";

import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

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
