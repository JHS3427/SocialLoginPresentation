import { login, logout,socialLogin } from './authSlice.js';
import { validateFormCheck,axiosPost } from "../../utils/validate.js";

export const getLogin = (formData, param) => async(dispatch) => {
    if(validateFormCheck(param)) {
        if("test" === formData.id && "1234" === formData.pass) {
            dispatch(login({"userId": formData.id}));
            return true;
        }
    }
    return false;
}

export const getLogout = () => async(dispatch) => {
    dispatch(logout());
    return true;
}

/*
조해성
함수 설명 : 프론트에서 받은 인가 코드와 해당 플랫폼 이름을
            백엔드로 전달하여 토큰을 받아오는 함수입니다.
후일 개선 예정 사항: 현재 이름이 카카오로 되어있으나
                     타 플랫폼이 완료되면 이름 및 내부 코드를
                     일부 개선할 예정입니다.
*/
export const getsocialtoken=(token_json,social) => async(dispatch) =>{
    const json_code = {"authCode": token_json,"social":social};
    const url = "http://localhost:8080/token";
    const authtoken = await axiosPost(url,json_code);
    console.log("token : ",authtoken)
    dispatch(socialLogin({"token":authtoken,"social":social}));
    
}