import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    travelFoodList: [], //출력용 - 2차원 배열
    travelFoods: [], //원본 - 1차원 배열
    travelFood: {} //상세페이지 객체 하나
}

export const travelFoodSlice = createSlice({
  name: 'travelFood',
  initialState,
  reducers: {
    createMenu(state, action) {
        const { travelFoodList, travelFoods } = action.payload;
        
        state.travelFoodList = travelFoodList;
        state.travelFoods = travelFoods;
    }  
  },
})

// Action creators are generated for each case reducer function
export const { createMenu } = travelFoodSlice.actions //API 함수 또는 컴포넌트에서 dispatch(액션함수)

export default travelFoodSlice.reducer //store import


