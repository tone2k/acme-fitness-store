package com.example.acme.assist.config;

import com.example.acme.assist.functions.RecommendationRequest;
import com.example.acme.assist.functions.RecommendationResponse;
import com.example.acme.assist.functions.RecommendationService;
import com.example.acme.assist.functions.TerrainService;
import com.example.acme.assist.functions.TerrainRequest;
import com.example.acme.assist.functions.TerrainResponse;
import java.util.function.Function;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;

@Configuration
public class FunctionConfiguration {

    @Bean
    @Description("Gets the user preferred Terrain to ride a bike in order to make a Bike recommendation")
    public Function<TerrainRequest, TerrainResponse> terrainFunction(TerrainService terrainService) {
        return terrainService;
    }

    @Bean
    @Description("Call this when you have all the information for recommending a bike to display Bike SKU information to customer")
    public Function<RecommendationRequest, RecommendationResponse> displayRecommendation(RecommendationService recommendationService) {
        return recommendationService;
    }
}
