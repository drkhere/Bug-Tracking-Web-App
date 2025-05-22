package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.services.implementations.NotificationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // 📩 Send Bug Assignment Notification
    @PostMapping("/bug-assigned")
    public String sendBugAssignmentEmail(@RequestParam String email, @RequestParam String bugTitle, @RequestParam int bugId ,@RequestParam String status) throws MessagingException {
        notificationService.sendBugAssignmentEmail(email, bugTitle, bugId,status);
        return "Bug assignment email sent successfully!";
    }

    // 📩 Send User Creation Notification
    @PostMapping("/user-created")
    public String sendUserCreationEmail(@RequestParam String email, @RequestParam String username, @RequestParam String password) throws MessagingException {
        notificationService.sendUserCreationEmail(email, username, password);
        return "User creation email sent successfully!";
    }

    // 📩 Send Project Assignment Notification
    @PostMapping("/project-assigned")
    public String sendProjectAssignmentEmail(@RequestParam String email, @RequestParam String projectName) throws MessagingException {
        notificationService.sendProjectAssignmentEmail(email, projectName);
        return "Project assignment email sent successfully!";
    }
}
