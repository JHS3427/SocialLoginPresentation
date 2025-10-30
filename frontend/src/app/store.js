import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../feature/auth/authSlice.js';
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
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
              getDefaultMiddleware()
              .concat(myLoggerMiddlware)
})


