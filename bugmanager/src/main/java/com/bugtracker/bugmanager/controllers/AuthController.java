package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.entities.LoginRequest;
import com.bugtracker.bugmanager.entities.User;
import com.bugtracker.bugmanager.services.implementations.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request){
//        return ResponseEntity.ok(authService.authenticate(loginRequest,request));
//    }
@PostMapping("/login")
public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
    System.out.println(loginRequest.getUsername());
    System.out.println(loginRequest.getPassword());
    String message = authService.authenticate(loginRequest, request);

    Map<String, String> response = new HashMap<>();
    response.put("message", message);  // ✅ Wrap the message in a JSON object
    return ResponseEntity.ok(response);
}


//    @GetMapping("/user")
//    public ResponseEntity<?> getCurrentUser(HttpSession session) {
//        User user = authService.getCurrentUser();
//        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(401).body("No active session");
//    }

    @GetMapping("/session-user")
    public ResponseEntity<?> getSessionUser(HttpServletRequest request) {
        User user = authService.getCurrentUser(request);

        if (user != null) {
            return ResponseEntity.ok(Map.of(
                    "userid", user.getUserid(),
                    "role", user.getRole()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No active session"));
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        authService.logout(request);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
