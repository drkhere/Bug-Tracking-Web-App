package com.bugtracker.bugmanager.services.implementations;

//AIzaSyA74NupiiJmDhVnDLBtiICVXGFsMcaI3GQ

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class GeminiChatBotService {

        @Value("${gemini.api.key}")  // Load API Key from application.properties
        private String apiKey;

        private final RestTemplate restTemplate = new RestTemplate();
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=";

        public String getChatResponse(String message) {
            if (message == null || message.trim().isEmpty()) {
                return "Error: Message cannot be empty.";
            }

            String mess = "Generate less message and always be on point answer, and if you give codes in answer then please don't give in inverted comas just make the text normal like a well designed model is generating., the input is :"+message;
            // Construct API URL
            String url = GEMINI_API_URL + apiKey;

            // Prepare request body in the correct format
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", mess);

            Map<String, Object> parts = new HashMap<>();
            parts.put("parts", new Object[]{textPart});

            Map<String, Object> contents = new HashMap<>();
            contents.put("contents", new Object[]{parts});

            // Prepare HTTP headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Prepare HTTP request
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(contents, headers);

            try {
                // Send request to Gemini API
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);

                // Parse JSON response
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.getBody());

                // Extract AI-generated text
                JsonNode candidates = rootNode.path("candidates");
                if (!candidates.isEmpty() && candidates.get(0).has("content") &&
                        candidates.get(0).get("content").has("parts") &&
                        candidates.get(0).get("content").get("parts").get(0).has("text")) {
                    return candidates.get(0).get("content").get("parts").get(0).get("text").asText();
                } else {
                    return "Error: No valid response from Gemini API.";
                }
            } catch (Exception e) {
                return "Error: Unable to process request. " + e.getMessage();
            }
        }


//    public String getSuggestionFromAi(String message) {
//        if (message == null || message.trim().isEmpty()) {
//            return "Error: Message cannot be empty.";
//        }
//
//        String mess = "Analyze the following project's bug description and generate three to four suggestions of lenght not crossing length 600 for resolving the issue: " + message;
//        // Construct API URL
//
//        String url = GEMINI_API_URL + apiKey;
//
//        // Prepare request body in the correct format
//        Map<String, Object> textPart = new HashMap<>();
//        textPart.put("text", mess);
//
//        Map<String, Object> parts = new HashMap<>();
//        parts.put("parts", new Object[]{textPart});
//
//        Map<String, Object> contents = new HashMap<>();
//        contents.put("contents", new Object[]{parts});
//
//        // Prepare HTTP headers
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        // Prepare HTTP request
//        HttpEntity<Map<String, Object>> request = new HttpEntity<>(contents, headers);
//
//        try {
//            // Send request to Gemini API
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
//
//            // Parse JSON response
//            ObjectMapper objectMapper = new ObjectMapper();
//            JsonNode rootNode = objectMapper.readTree(response.getBody());
//
//            // Extract AI-generated text
//            JsonNode candidates = rootNode.path("candidates");
//            if (!candidates.isEmpty() && candidates.get(0).has("content") &&
//                    candidates.get(0).get("content").has("parts") &&
//                    candidates.get(0).get("content").get("parts").get(0).has("text")) {
//                return candidates.get(0).get("content").get("parts").get(0).get("text").asText();
////                 > 150? candidates.get(0).get("content").get("parts").get(0).get("text").asText().substring(0,150)+"...": candidates.get(0).get("content").get("parts").get(0).get("text").asText()
////                fullSuggestion.length() > 150 ? fullSuggestion.substring(0, 150) + "..." : fullSuggestion;
//            } else {
//                return "Error: No valid response from Gemini API.";
//            }
//        } catch (Exception e) {
//            return "Error: Unable to process request. " + e.getMessage();
//        }
//    }


    public List<String> getSuggestionFromAi(String message) {
        if (message == null || message.trim().isEmpty()) {
            return List.of("Error: Message cannot be empty.");
        }

        String mess = "Analyze the following project's bug description and generate three to four suggestions of length not crossing 600 characters for resolving the issue: " + message;
        String url = GEMINI_API_URL + apiKey;

        Map<String, Object> textPart = Map.of("text", mess);
        Map<String, Object> parts = Map.of("parts", new Object[]{textPart});
        Map<String, Object> contents = Map.of("contents", new Object[]{parts});

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(contents, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody());

            JsonNode candidates = rootNode.path("candidates");
            if (!candidates.isEmpty() && candidates.get(0).has("content") &&
                    candidates.get(0).get("content").has("parts") &&
                    candidates.get(0).get("content").get("parts").get(0).has("text")) {

                // Get AI response as a full string
                String fullSuggestion = candidates.get(0).get("content").get("parts").get(0).get("text").asText();

                // Split suggestions based on newline (`\n`) or another delimiter
                List<String> suggestions = Arrays.stream(fullSuggestion.split("\n"))
                        .filter(s -> !s.trim().isEmpty()) // Remove empty lines
                        .collect(Collectors.toList());

                return suggestions;
            } else {
                return List.of("Error: No valid response from AI.");
            }
        } catch (Exception e) {
            return List.of("Error: Unable to process request. " + e.getMessage());
        }
    }

}


