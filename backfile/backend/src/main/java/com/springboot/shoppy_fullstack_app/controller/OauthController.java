package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Token;
import com.springboot.shoppy_fullstack_app.service.OauthService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class OauthController {
    private OauthService oauthService;

    public OauthController(OauthService oauthService)
    {
        this.oauthService = oauthService;
    }

    @PostMapping("/token")
    public String gettoken(@RequestBody Token token){
        System.out.println("social : "+token.getSocial());
        System.out.println("auth : "+token.getAuthCode());
        String authcode = oauthService.getSocialAccessToken(token);
        String socialId = oauthService.socialIdCatcher(authcode,token.getSocial());

        return socialId;
    }

}
