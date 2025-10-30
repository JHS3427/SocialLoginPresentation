import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLogin = !state.isLogin;
            const { userId } = action.payload;
            const loginInfo = { "token": "1234abcd", "userId": userId};
            localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
        },
        logout(state, action) {
            state.isLogin = !state.isLogin;
            localStorage.removeItem("loginInfo");
        },

        /* 
        조해성
         설명 : 백엔드에서 토큰을 수령하여 이를 로컬 스토리지에 저장합니다.
        */
        socialLogin(state,action){
            state.isLogin=!state.isLogin;
            const {token , social} = action.payload;
            const loginInfo = {"token":token,"userId":"kakao_or_naver","social": social}
            localStorage.setItem("loginInfo",JSON.stringify(loginInfo));
        }
    }
}) 

export const { login,logout,socialLogin }
    = authSlice.actions

export default authSlice.reducer

