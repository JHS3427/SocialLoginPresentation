package com.springboot.shoppy_fullstack_app.service;


import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.springboot.shoppy_fullstack_app.dto.Token;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class OauthServiceImpl implements OauthService{

    @Override
    public String getSocialAccessToken (Token token) {
        String access_Token = ""; //플랫폼에서 받을 데이터를 저장하기 위한 변수 선언
        String refresh_Token = "";//플랫폼에서 받을 데이터를 저장하기 위한 변수 선언
        String reqURL="";       //접근할 플랫폼 URL을 저장하기 위한 변수 선언
        if( token.getSocial().equals("kakao")){
            reqURL = "https://kauth.kakao.com/oauth/token";} // 이 정보는 카카오톡 공식 API 문서 : 카카오 로그인- REST API - 토큰요청에 있다.
        else if(token.getSocial().equals("naver")){
            reqURL = "https://nid.naver.com/oauth2.0/token";}// 이 정보는 네이버 공식 API 문서 : 로그인 API 명세 - 2. API 기본 정보에 있다
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            // conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            // 위 세팅 없어도 작동하지만, 확실하게 하기 위해 적어둠

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요한 파라미터 스트림을 작성, flush로 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");

            if( token.getSocial().equals("kakao")){
                sb.append("~~~~~~~~~~"); // TODO REST_API_KEY 입력
                sb.append("~~~~~~~~~~"); // TODO 인가코드 받은 redirect_uri 입력
                }
            else if(token.getSocial().equals("naver")){
                sb.append("~~~~~~~~~~");//네이버 클라이언트ID
                sb.append("~~~~~~~~~~");//네이버 클라이언트 비밀번호
            }
            sb.append("&code=" + token.getAuthCode());

            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {//읽어온 데이터를 한줄씩 line으로 읽어서 result에 넣기
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;//목표 1 완료
    }

    @Override
    public String socialIdCatcher(String authcode,String social){
        String id="";
        //헤더만 있고 바디 요청이나 post 요청이 없어서 GET방식으로 감
        try {
            String UserInfoURL= "";
            if(social.equals("kakao"))
            {
                UserInfoURL ="https://kapi.kakao.com/v2/user/me";
            }
            else if(social.equals("naver"))
            {
                UserInfoURL ="https://openapi.naver.com/v1/nid/me";
            }
            //프로퍼티 키를 이용해보려 하였지만 개인정보 설정(https://developers.kakao.com/console/app/1324377/product/login/scope)을
            //을 켜야하고, 심지어 이메일 주소 등은 허가를 받아야하며, 닉네임은 깨져서 들어오는 관계로 보류
//            String keysToRequest = "[\"kakao_account.email\", \"kakao_account.profile\"]";
//            String encodedKeys = URLEncoder.encode(keysToRequest, "UTF-8");
//            String QP_test = "?property_keys="+encodedKeys;
//            System.out.println(kakaoUserInfoURL+QP_test);
            URL url = new URL(UserInfoURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            // conn.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
            // 위 세팅 없어도 작동하지만, 확실하게 하기 위해 적어둠
            conn.setRequestProperty("Authorization", "Bearer " + authcode);

            //이번엔 헤더에 authcode만 넣고 바디 없이 보내면 된다.
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8"));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            System.out.println("element is next");
            System.out.println(element);
            JsonObject jsonObject = element.getAsJsonObject();

            if(social.equals("kakao")){
//                키 존재 여부는 카카오니까 무시
//                "id" 키의 값을 JsonPrimitive(원시 값) 형태로 가져옴
                JsonPrimitive idPrimitive = jsonObject.getAsJsonPrimitive("id");
                // 값을 원하는 타입(여기서는 String)으로 변환해서 사용
                id = idPrimitive.getAsString();
            }
            else if(social.equals("naver")){
//                키 존재 여부는 네이버니까 무시
//                네이버의 경우 response안에 id가 담겨있으므로 두번 들어감.
                JsonObject responsePrimitive = jsonObject.getAsJsonObject("response");
                JsonPrimitive idPrimitive = responsePrimitive.getAsJsonPrimitive("id");
                id = idPrimitive.getAsString();
            }
            // 카카오 {"id":숫자,"connected_at":"2025-10-18T06:12:07Z"}
            // 네이버 {"resultcode":"00","message":"success",
            //          "response":{"id":"긴 문자열 ",
            //                      "nickname":"~~~~~~~~~~","email":"~~~~~~~~~~"}}
        } catch (IOException e) {
            e.printStackTrace();
        }
        return id;
    }

}
