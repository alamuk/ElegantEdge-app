import { applyMiddleware, compose, createStore } from 'redux';
// import { loggerMiddleware } from './middleware/logger';
import { logger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

// const logger = createLogger();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean); // [loggerMiddleware];

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers,
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
