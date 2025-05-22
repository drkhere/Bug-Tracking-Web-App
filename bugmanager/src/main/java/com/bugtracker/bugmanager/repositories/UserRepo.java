package com.bugtracker.bugmanager.repositories;

import com.bugtracker.bugmanager.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface UserRepo extends JpaRepository<User,Integer> {
    User findByUsername(String username);
    List<User> findByRole(String role);
    long count();
}
