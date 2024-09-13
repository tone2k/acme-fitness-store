package com.example.acme.assist.functions;

import com.fasterxml.jackson.annotation.JsonClassDescription;

@JsonClassDescription("Request object used to present to the user containing the product name and recommendation text to the user")
public record RecommendationRequest(String productName, String recommendationText) {
}
