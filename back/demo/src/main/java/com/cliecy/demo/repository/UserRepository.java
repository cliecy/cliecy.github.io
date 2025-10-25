package com.cliecy.demo.repository;


import com.cliecy.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // 根据用户名查找用户
    User findByUserName(String userName);
}