import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    travelWalkList: [], //출력용 - 2차원 배열
    travelWalks: [], //원본 - 1차원 배열
    travelWalk: {} //상세페이지 객체 하나
}

export const travelWalkSlice = createSlice({
  name: 'travelWalk',
  initialState,
  reducers: {
    createMenu(state, action) {
        const { travelWalkList, travelWalks } = action.payload;
        
        state.travelWalkList = travelWalkList;
        state.travelWalks = travelWalks;
    }  
  },
})

// Action creators are generated for each case reducer function
export const { createMenu } = travelWalkSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default travelWalkSlice.reducer //store import


