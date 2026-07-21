package com.dietai.controller;

import com.dietai.dto.PlanRequest;
import com.dietai.service.AiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(
    origins = "*", 
    allowedHeaders = "*", 
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS}
)
public class MealController {

    private final AiService aiService;

    @Autowired
    public MealController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/generate-plan")
    public ResponseEntity<String> generatePlan(@RequestBody PlanRequest request) {
        String jsonResponse = aiService.generateMealPlan(request);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(jsonResponse);
    }
}