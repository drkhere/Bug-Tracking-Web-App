package com.bugtracker.bugmanager.services.implementations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    // Generic method to send an email
    public void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true); // true for HTML content

        mailSender.send(message);
    }

    // Send notification for bug assignment
    public void sendBugAssignmentEmail(String userEmail, String bugTitle, int bugId,String status) {
        String subject = "Bug Assigned: " + bugTitle;
        String message = "<h3>You have been assigned a new bug</h3>" +
                "<p><b>Bug ID:</b> " + bugId + "</p>" +
                "<p><b>Title:</b> " + bugTitle + "</p>"+
        "<p><b>Status:</b> " + status + "</p>";


        try {
            System.out.println("The Email to send "+userEmail);
            sendEmail(userEmail, subject, message);
        } catch (MessagingException e) {
            System.out.println("Error sending bug assignment email: " + e.getMessage());
        }
    }

    // Send email when user account is created
    public void sendUserCreationEmail(String userEmail, String username, String password) {
        String subject = "Welcome to Bug Tracker!";
        String message = "<h3>Your account has been created</h3>" +
                "<p><b>Username:</b> " + username + "</p>" +
                "<p><b>Password:</b> " + password + "</p>";

        try {
            sendEmail(userEmail, subject, message);
        } catch (MessagingException e) {
            System.out.println("Error sending user creation email: " + e.getMessage());
        }
    }

    // Send notification for project assignment
    public void sendProjectAssignmentEmail(String managerEmail, String projectName) {
        String subject = "Project Assignment: " + projectName;
        String message = "<h3>You have been assigned as the manager for the project:</h3>" +
                "<p><b>Project:</b> " + projectName + "</p>";

        try {
            sendEmail(managerEmail, subject, message);
        } catch (MessagingException e) {
            System.out.println("Error sending project assignment email: " + e.getMessage());
        }
    }

    public void notifyManagerOnStatusChange(String managerEmail, String bugTitle, int bugId, String status, String updatedBy) {
        String subject = "Bug Status Updated - " + bugTitle;
        String message = "The bug '" + bugTitle + "' (ID: " + bugId + ") has been updated to '" + status + "' by " + updatedBy + ".";

        try {
            sendEmail(managerEmail, subject, message);
        } catch (MessagingException e) {
            throw new RuntimeException("The Exception coming at notifyManagerOnStatusChange method",e);
        }
    }

}
