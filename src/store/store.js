import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// /////////
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

//
// // custom logger
//
// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["user"],
// };
//
// const persistedReducer = persistReducer(persistConfig, rootReducer);
//
// // the logger will be used here only when we are in development not in production.
const middlewares = [process.env.NODE_ENV !== "production" && logger].filter(
    Boolean
);
//
// const composedEnhancer =
//   (process.env.NODE_ENV !== "production" &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;
//
// const composedEnhancers = composedEnhancer(applyMiddleware(...middlewares));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
    // getDefaultMiddleware({
    //   serializableCheck: false,
    // }).concat(middlewares),
});

//
// export const persistor = persistStore(store);
