package com.cliecy.demo.dto;

import com.cliecy.demo.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private boolean success;
    private String message;
    private User user;  // 不包含密码的用户信息
}
