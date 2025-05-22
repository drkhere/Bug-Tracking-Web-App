package com.bugtracker.bugmanager.services;

import com.bugtracker.bugmanager.payloads.UserDto;

import java.util.List;

public interface UserSeriveInteface {
    UserDto createUser(UserDto userDto);
    UserDto updateUser(UserDto userDto,Integer userId);
    UserDto getUserById(Integer userId);
    List<UserDto> getAllUsers();
    void deleteUser(Integer userId);
    UserDto getUserByUsername(String username);
    List<UserDto> getUserByRole(String role);
    long getUserCount();
}
