package com.cliecy.demo.service;

import com.cliecy.demo.model.User;
import com.cliecy.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Create a new user
    public User createUser(User user) {
        // 加密密码
        user.setPassWord(passwordEncoder.encode(user.getPassWord()));
        user.setLastLoginTime(new Date());
        return userRepository.save(user);
    }

    // Get a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update a user
    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUserName(userDetails.getUserName());
            // 如果密码被修改，重新加密
            if (userDetails.getPassWord() != null && !userDetails.getPassWord().isEmpty()) {
                user.setPassWord(passwordEncoder.encode(userDetails.getPassWord()));
            }
            user.setGender(userDetails.getGender());
            user.setMotto(userDetails.getMotto());
            user.setLastLoginTime(userDetails.getLastLoginTime());
            user.setAvatar(userDetails.getAvatar());
            user.setNumOfShares(userDetails.getNumOfShares());
            user.setUserClass(userDetails.getUserClass());
            user.setDeleted(userDetails.isDeleted());
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }

    // Delete a user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Find user by username
    public User findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    // Verify password
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}