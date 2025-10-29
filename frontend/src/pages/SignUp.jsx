/*
    조해성
    설명 : 회원가입 페이지이지만 현재 틀만 만들어 둔 상태.
    후일 개선 사항 : 해당 내용을 작성 중 에러 처리, 저장 기능 등 기능 추가 예정.
*/

import '../styles/signup.css';
import React, {useState} from 'react'


export const SignUp = () => {


  const initialArray =  {id : "", pass : "", name : "", age:"", address:"", sex:"", emailAddress:"", phone:""};
  const [formData, setFormData]=useState(initialArray);
  const [placeholderJudge, setPlaceholderJudge] = useState(initialArray);

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({...formData,  [name] : value})
    console.log(name);
    console.log(formData);
  }
  const focusIn = (e) =>{
    const {name} = e.target;
    setPlaceholderJudge({...placeholderJudge,  [name] : "true"})
  }

  const focusOut= (e) =>{
    const {name} = e.target;
    setPlaceholderJudge({...placeholderJudge,  [name] : ""})
  }

  return (
    <>
    <div className="SignUpPage">
      <h1 className="SignTitle">회원가입 페이지입니다.</h1>
      <div className = "IdPassSection">
        <div className="IdBox">
          <input 
          type="text"
          name = "id"
          value = {formData.id}
          onFocus={focusIn}
          onBlur={focusOut}
          onChange={handleChange}/>
          {placeholderJudge.id===""&& formData.id===""?
            <span className="NamePlaceholder">이름을 입력하세요</span>:
            <span className="NamePlaceholder2">이름을 입력하지마세요</span>
          }
          <button 
          type='button'
          className = 'IdDuplCheck'>가나다라마</button>
        </div>
      </div>
    </div>
    </>
  );
}

