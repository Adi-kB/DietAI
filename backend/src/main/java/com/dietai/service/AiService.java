package com.dietai.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import com.dietai.dto.PlanRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AiService {

    @Value("${ai.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateMealPlan(PlanRequest request) {
        // Extract values safely checking common DTO getter names
        int calories = request.getCalories() > 0 ? request.getCalories() : 2400;
        String condition = request.getCondition() != null ? request.getCondition() : "General Health";
        String dietType = request.getDietType() != null ? request.getDietType() : "Balanced";
        
        // Handle allergies fallback
        String allergies = "None";
        if (request.getAllergies() != null && !request.getAllergies().isEmpty()) {
            allergies = request.getAllergies();
        }

        String dislikes = request.getDislikes() != null ? request.getDislikes() : "None";

        String systemPrompt = """
            You are DietAI, a clinical nutrition engine. Generate a structured daily meal plan matching the user's condition, diet type, target calories, allergies, and exclusions.
            You MUST return ONLY a valid JSON object matching this exact schema:
            {
              "targetCalories": %d,
              "macroBreakdown": {
                "protein": "110g",
                "carbs": "210g",
                "fats": "55g"
              },
              "meals": [
                {
                  "id": 1,
                  "type": "Breakfast",
                  "title": "Meal Title Here",
                  "description": "Short explanation of health benefits for their condition.",
                  "calories": 500,
                  "prepTime": "15 mins",
                  "items": ["1 cup Ingredient A", "200g Ingredient B"]
                }
              ]
            }
            Do not include introductory text or markdown code blocks.
            """.formatted(calories);

        String userPrompt = String.format(
            "Condition: %s. Diet Type: %s. Target Calories: %d kcal. Allergies: %s. Exclusions: %s.", 
            condition, dietType, calories, allergies, dislikes
        );

        // Escape prompts properly for raw JSON
        String cleanSystemPrompt = systemPrompt.replace("\n", " ").replace("\"", "\\\"");
        String cleanUserPrompt = userPrompt.replace("\n", " ").replace("\"", "\\\"");

        String requestBody = """
        {
            "model": "llama-3.1-8b-instant",
            "response_format": { "type": "json_object" },
            "messages": [
                {"role": "system", "content": "%s"},
                {"role": "user", "content": "%s"}
            ]
        }
        """.formatted(cleanSystemPrompt, cleanUserPrompt);

        try {
            // Call Groq API
            String rawJsonResponse = restClient.post()
                .uri("https://api.groq.com/openai/v1/chat/completions")
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .body(requestBody)
                .retrieve()
                .body(String.class);

            // Extract ONLY the AI's generated content from choices[0].message.content
            JsonNode rootNode = objectMapper.readTree(rawJsonResponse);
            String content = rootNode.path("choices").get(0).path("message").path("content").asText();

            return content;

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to contact AI service: " + e.getMessage().replace("\"", "'") + "\"}";
        }
    }
}