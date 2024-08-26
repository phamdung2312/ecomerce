import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { UserSlide } from "./counter/UserSlide";
import { ProductSlide } from "./counter/ProductSlide";
import { OrderSlide } from "./counter/OrderSlide";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  // apply cho order
  blacklist: ["productSearch", "user"],
};

const rootReducer = combineReducers({
  productSearch: ProductSlide.reducer,
  user: UserSlide.reducer,
  orderProduct: OrderSlide.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
