package com.bugtracker.bugmanager.services.implementations;

import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;

@Service
public class ChatbotService {

    private final OllamaChatModel chatModel;

    public ChatbotService(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String getResponse(String userInput) {
        // Create a prompt for AI
        Prompt prompt = new Prompt(userInput);

        // Call the AI model to generate a response
        ChatResponse response = chatModel.call(prompt);

        // Extract response safely
        if (!response.getResults().isEmpty()) {
            return response.getResults().get(0).getOutput().getText();
        }
        return "No response generated.";
    }
}
