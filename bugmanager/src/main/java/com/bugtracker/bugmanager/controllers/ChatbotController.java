package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.services.implementations.ChatbotService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/chat")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @GetMapping("/ask")
    public String getChatResponse(@RequestParam String message) {
        return chatbotService.getResponse(message);
    }
}
