package com.springboot.shoppy_fullstack_app.service;


import com.springboot.shoppy_fullstack_app.dto.Token;

public interface OauthService {
    String getSocialAccessToken(Token token);
    String socialIdCatcher(String authcode,String social);
}
