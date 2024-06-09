import { Route, Routes } from "react-router-dom";
//
// from user
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
//
import Home from "./routes/home/Home";
import Authentication from "./routes/sing-in/Authentication";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/Checkout";
import Navigation from "./routes/navigation/Navigation";
import { setCurrentUser } from "./store/user/user.reducer";
// App nested in <BrowserRouter> component
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // create user document only if there is a user.
      if (user) {
        // createUserDocumentFromAuth will manage the case if the user already exists.
        createUserDocumentFromAuth(user);
      }
      const pickedUser = (({ accessToken, email }) =>
        user && { accessToken, email })(user);
      console.log(setCurrentUser(user));
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
