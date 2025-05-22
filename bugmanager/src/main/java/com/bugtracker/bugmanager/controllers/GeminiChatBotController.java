package com.bugtracker.bugmanager.controllers;

import com.bugtracker.bugmanager.services.implementations.GeminiChatBotService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class GeminiChatBotController {
    private final GeminiChatBotService geminiService;

    public GeminiChatBotController(GeminiChatBotService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String message) {
        return geminiService.getChatResponse(message);
    }

    @PostMapping("/chat/ai/suggestions")
    public List<String> suggestions(@RequestBody String message) {
        return geminiService.getSuggestionFromAi(message);
    }

}
