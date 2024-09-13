package com.example.acme.assist.config;


import com.example.acme.assist.TrailFunction;
import com.example.acme.assist.function.TrailFunctionPart2Request;
import com.example.acme.assist.function.TrailService;
import com.example.acme.assist.function.TrailFunctionRequest;
import com.example.acme.assist.function.TrailFunctionResponse;
import java.util.function.Function;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Description;

public class FunctionConfig {

    @Bean
    @Description("Get list of available terrain types")
    public Function<TrailFunctionRequest, TrailFunctionResponse> weatherFunction(TrailService trailService) {
        return request -> trailService.getTrailUiComponent();
    }

    @Bean
    @Description("Get list of bikes for a given terrain")
    public Function<TrailFunctionPart2Request, TrailFunctionResponse> weatherFunction(TrailService trailService) {
        return request -> trailService.getBikesForTrailType(request.trailType());
    }

    @Bean
    @Description("Recommends user a bike based on their daily usage, their height and terrain they ride on")
    public Function<TrailFunctionPart2Request, TrailFunctionResponse> recommendBike(TrailService trailService) {
        // recommend bike
        return null;
    }
}
