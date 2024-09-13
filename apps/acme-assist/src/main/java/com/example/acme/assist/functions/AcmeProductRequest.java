package com.example.acme.assist.functions;

public record AcmeProductRequest(
        String messageId,
        String productId,
        String productName,
        String productDescription,
        String productPrice,
        String productImage,
        String bikeRecommendation
) {
}
