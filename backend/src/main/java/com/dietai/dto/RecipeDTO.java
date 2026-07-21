package com.dietai.dto; // Replace with your actual package name

import java.util.List;

public class RecipeDTO {
    private String title;
    private String description;
    private String prepTime;
    private String targetYield;
    private String calories;
    private String glycemicIndex;
    
    private List<IngredientDTO> ingredients;
    private List<String> stages;
    
    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPrepTime() { return prepTime; }
    public void setPrepTime(String prepTime) { this.prepTime = prepTime; }

    public String getTargetYield() { return targetYield; }
    public void setTargetYield(String targetYield) { this.targetYield = targetYield; }

    public String getCalories() { return calories; }
    public void setCalories(String calories) { this.calories = calories; }

    public String getGlycemicIndex() { return glycemicIndex; }
    public void setGlycemicIndex(String glycemicIndex) { this.glycemicIndex = glycemicIndex; }

    public List<IngredientDTO> getIngredients() { return ingredients; }
    public void setIngredients(List<IngredientDTO> ingredients) { this.ingredients = ingredients; }

    public List<String> getStages() { return stages; }
    public void setStages(List<String> stages) { this.stages = stages; }
}
