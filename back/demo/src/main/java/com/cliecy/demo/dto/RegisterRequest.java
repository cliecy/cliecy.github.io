package com.cliecy.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String userName;
    private String passWord;
    private String gender;
    private String motto;
    private String avatar;
}
