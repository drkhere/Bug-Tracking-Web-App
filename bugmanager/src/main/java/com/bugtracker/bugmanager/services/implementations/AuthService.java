package com.bugtracker.bugmanager.services.implementations;

import com.bugtracker.bugmanager.entities.LoginRequest;
import com.bugtracker.bugmanager.entities.User;
import com.bugtracker.bugmanager.repositories.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepo userRepo;
    @Autowired
    private HttpSession session;
//    public String authenticate(LoginRequest request, HttpServletRequest httpRequest) {
////        Optional<User> user = userRepo.findById(request.getUserid());
//        Optional<User> user = Optional.ofNullable(userRepo.findByUsername(request.getUsername()));
//
//
//        if (user.isEmpty()) {
//            return "User Not Found";
//        }
//
//        User usercred = user.get();
//
//        if (!passwordEncoder.matches(request.getPassword(), usercred.getPassword())) {
//            return "Invalid User Credentials";
//        }
//
//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
//
//        // ✅ Use request.getSession() instead of injecting HttpSession directly
//        HttpSession session = httpRequest.getSession(true); // Creates a new session if not exists
//        session.setAttribute("user", usercred); // ✅ Store user in session
//
//        return "User Logged In Successfully";
//    }

    public String authenticate(LoginRequest request, HttpServletRequest httpRequest) {
        User user = userRepo.findByUsername(request.getUsername());

        if (user == null) {
            return "User Not Found";
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid User Credentials";
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );

        HttpSession session = httpRequest.getSession(true); // Create new session if none exists
        session.setAttribute("user", user); // Store user in session

        return "User Logged In Successfully";
    }



    public User getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // ❌ Don't create a session if it doesn't exist
        if (session == null) {
            return null;
        }
        return (User) session.getAttribute("user"); // ✅ Retrieve user from session
    }

    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get the existing session
        if (session != null) {
            session.invalidate(); // ✅ Destroy session
        }
        return "Logged Out Successfully";
    }
}
