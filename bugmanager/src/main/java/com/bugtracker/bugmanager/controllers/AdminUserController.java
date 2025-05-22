package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.payloads.ApiResponse;
import com.bugtracker.bugmanager.payloads.UserDto;
import com.bugtracker.bugmanager.services.UserSeriveInteface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/users")
public class AdminUserController {

    @Autowired
    private UserSeriveInteface userSeriveInteface;

    //Post-Create user
    @PostMapping("/")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto createUserDao = this.userSeriveInteface.createUser(userDto);
        return new ResponseEntity<>(createUserDao, HttpStatus.CREATED);
    }

    //Put-Update User
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto,@PathVariable("userId") Integer userId){
        UserDto upatedUser = this.userSeriveInteface.updateUser(userDto,userId);
        return  ResponseEntity.ok(upatedUser);
    }

    //Delete-Delete User
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") Integer uid){
        this.userSeriveInteface.deleteUser(uid);
        return new ResponseEntity<>(new ApiResponse("User Deleted Successfully",true),HttpStatus.OK);
    }


    //Get -user get
    @GetMapping("/")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        return ResponseEntity.ok(this.userSeriveInteface.getAllUsers());
    }

    //Get -singleUser
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getSingleUser(@PathVariable("userId") Integer uid){
        return ResponseEntity.ok(this.userSeriveInteface.getUserById(uid));

    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UserDto>> getUserByRole(@PathVariable("role") String role){
        return ResponseEntity.ok(this.userSeriveInteface.getUserByRole(role));
    }

    @GetMapping("/count/alluser")
    public ResponseEntity<Long> getUserCount(){
        return ResponseEntity.ok(this.userSeriveInteface.getUserCount());
    }

}
