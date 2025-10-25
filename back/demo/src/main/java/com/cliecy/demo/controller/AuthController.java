package com.cliecy.demo.controller;

import com.cliecy.demo.dto.LoginRequest;
import com.cliecy.demo.dto.LoginResponse;
import com.cliecy.demo.dto.RegisterRequest;
import com.cliecy.demo.model.User;
import com.cliecy.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // 用户注册
    @PostMapping("/register")
    public LoginResponse register(@RequestBody RegisterRequest request) {
        try {
            // 检查用户名是否已存在
            User existingUser = userService.findByUserName(request.getUserName());
            if (existingUser != null) {
                return new LoginResponse(false, "用户名已存在", null);
            }

            // 创建新用户
            User newUser = new User();
            newUser.setUserName(request.getUserName());
            newUser.setPassWord(request.getPassWord());  // 密码会在service层加密
            newUser.setGender(request.getGender() != null ? request.getGender() : "未知");
            newUser.setMotto(request.getMotto() != null ? request.getMotto() : "");
            newUser.setAvatar(request.getAvatar() != null ? request.getAvatar() : "");
            newUser.setUserClass(0);  // 默认普通用户
            newUser.setNumOfShares(0);
            newUser.setDeleted(false);

            User savedUser = userService.createUser(newUser);

            // 清空密码字段，避免返回给前端
            savedUser.setPassWord(null);

            return new LoginResponse(true, "注册成功", savedUser);
        } catch (Exception e) {
            return new LoginResponse(false, "注册失败: " + e.getMessage(), null);
        }
    }

    // 用户登录
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        try {
            // 查找用户
            User user = userService.findByUserName(request.getUserName());

            if (user == null) {
                return new LoginResponse(false, "用户不存在", null);
            }

            // 验证密码
            boolean passwordMatch = userService.verifyPassword(request.getPassWord(), user.getPassWord());

            if (!passwordMatch) {
                return new LoginResponse(false, "密码错误", null);
            }

            // 更新最后登录时间
            user.setLastLoginTime(new Date());
            userService.updateUser(user.getId(), user);

            // 清空密码字段
            user.setPassWord(null);

            return new LoginResponse(true, "登录成功", user);
        } catch (Exception e) {
            return new LoginResponse(false, "登录失败: " + e.getMessage(), null);
        }
    }

    // 根据用户名获取用户信息（不包含密码）
    @GetMapping("/user/{userName}")
    public User getUserByName(@PathVariable String userName) {
        User user = userService.findByUserName(userName);
        if (user != null) {
            user.setPassWord(null);  // 不返回密码
        }
        return user;
    }
}
