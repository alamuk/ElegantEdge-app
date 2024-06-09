import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Checkout from './routes/checkout/Checkout';

import Home from './routes/home/Home';
import Navigation from './routes/navigation/Navigation';
import Shop from './routes/shop/Shop';
import Authentication from './routes/sing-in/Authentication';
import { checkUserSession } from './store/user/user.action';

// App nested in <BrowserRouter> component
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
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
