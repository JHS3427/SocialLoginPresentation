/*
    조해성
    설명 : 소셜 로그인 성공 후 플랫폼이 전달해준 인가코드를 수령하고( const code 부분)
    이를 authAPI.js의 getkakaotoken에 전달. -> 이후 백엔드에서 토큰 수령
    후일 개선 사항 : 1) 카카오를 제외한 타 플랫폼이 카카오와 다른경우 추가 예정. 만약 동일한 경우 함수명 변경
                    2) 일반 로그인에서 인증 관련 내용이 필요한 경우, 이곳에서 진행 예정(미정).
    */

import { useEffect } from "react";
import { getsocialtoken } from "../feature/auth/authAPI.js";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export function Auth(){

    const navigate=useNavigate()
    const dispatch=useDispatch();
    const code = new URL(window.location.href).searchParams.get("code");
    const social = sessionStorage.getItem('social');
    console.log("authcode: ",code);

    
    useEffect(()=>{
        dispatch(getsocialtoken(code,social))
        navigate('/')
    },[])

    return(<></>);
}