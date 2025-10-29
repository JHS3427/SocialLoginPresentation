import { configureStore } from '@reduxjs/toolkit';
import menuSlice from '../feature/menu/menuSlice.js';
import authSlice from '../feature/auth/authSlice.js';
import travelMenuSlice from '../feature/travel/travelMenuSlice.js';
import travelFoodSlice from '../feature/travel/travelFoodSlice.js';
import travelWalkSlice from '../feature/travel/travelWalkSlice.js';
import productSlice  from '../feature/product/productSlice.js'
import cartSlice from "../feature/cart/cartSlice.js";

//액션 로깅 처리 담당 미들웨어
const myLoggerMiddlware = (store) => (next) => (action) => {
  console.log("dispatch :: ", action);
  const result = next(action);
  console.log("next action :: ", store.getState());

  return result;
}

//"counter": counterSlice에서 "counter"는 counterSlice.js의 name과 같게 한다.
export const store = configureStore({
  reducer: {
    menu: menuSlice,
    auth: authSlice,
    cart: cartSlice,
    product: productSlice,
    travelMenu : travelMenuSlice,
    travelFood : travelFoodSlice,
    travelWalk : travelWalkSlice,
  },
  middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware()
              .concat(myLoggerMiddlware)
})


