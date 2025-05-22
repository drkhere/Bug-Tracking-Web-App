package com.bugtracker.bugmanager.services.implementations;

import com.bugtracker.bugmanager.entities.User;
import com.bugtracker.bugmanager.exceptions.ResourceNotFoundException;
import com.bugtracker.bugmanager.payloads.UserDto;
import com.bugtracker.bugmanager.repositories.UserRepo;
import com.bugtracker.bugmanager.services.UserSeriveInteface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
@Service
public class UserServiceImpl implements UserSeriveInteface {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    ModelMapper modelMapper;

    @Transactional
    public UserDto createUser(UserDto userDto) {
        User user = this.modelMapper.map(userDto,User.class);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
       this.userRepo.save(user);

        CompletableFuture.runAsync(() -> {
            this.notificationService.sendUserCreationEmail(userDto.getEmail(),userDto.getUsername(),userDto.getPassword());
        });

       return this.modelMapper.map(user,UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Integer userId) {

        User user = this.userRepo.findById(userId).orElseThrow(()-> new ResourceNotFoundException("User","Id",userId));
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setFirst_name(userDto.getFirst_name());
        user.setLast_name(userDto.getLast_name());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setStatus(userDto.getStatus());
        user.setUpdated(userDto.getUpdated());
        User updatedUser = this.userRepo.save(user);
        return this.userToDto(updatedUser);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = this.userRepo.findAll();
        List<UserDto> userdtos = users.stream().map(user -> this.userToDto(user)).collect(Collectors.toList());
        return userdtos;
    }

    @Override
    public void deleteUser(Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(()->new ResourceNotFoundException("UserId","Id",userId));
        this.userRepo.delete(user);
    }

    @Override
    public UserDto getUserById(Integer userId) {
        User user = this.userRepo.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User","Id",userId));
        return this.userToDto(user);
    }

    @Override
    public UserDto getUserByUsername(String Username) {
        User user = this.userRepo.findByUsername(Username);
        return  this.userToDto(user);
    }

    @Override
    public List<UserDto> getUserByRole(String role) {
        List<User> users = this.userRepo.findByRole(role);
        List<UserDto> userDtos = users.stream().map(user -> this.userToDto(user)).collect(Collectors.toList());
        return userDtos;
    }

    @Override
    public long getUserCount() {
        long count = this.userRepo.count();
        return count;
    }

    private User dtoToUser(UserDto userDto){
        User user  = new User();
        user.setUserid(userDto.getId());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setFirst_name(userDto.getFirst_name());
        user.setLast_name(userDto.getLast_name());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setStatus(userDto.getStatus());
        user.setCreated(userDto.getCreated());
        user.setUpdated(userDto.getUpdated());

        return user;
    }

    private UserDto userToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getUserid());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setFirst_name(user.getFirst_name());
        userDto.setLast_name(user.getLast_name());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setStatus(user.getStatus());
        userDto.setCreated(user.getCreated());
        userDto.setUpdated(user.getUpdated());

        return userDto;
    }

}
