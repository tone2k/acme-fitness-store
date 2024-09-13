package com.example.acme.assist.functions;

import com.example.acme.assist.ProductRepository;
import com.example.acme.assist.model.AcmeChatResponse;
import com.example.acme.assist.model.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class RecommendationService implements Function<RecommendationRequest, RecommendationResponse> {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public RecommendationResponse apply(RecommendationRequest recommendationRequest) {
        String messageId = UUID.randomUUID().toString();
        final Product productById = productRepository.getProductByProductName(recommendationRequest.productName());
        try {

            String request;
            if (productById != null) {
                request = objectMapper.writeValueAsString(new AcmeProductRequest(
                        messageId,
                        productById.getId(),
                        productById.getName(),
                        productById.getShortDescription(),
                        productById.getPrice().toString(),
                        productById.getImageUrl1(),
                        recommendationRequest.recommendationText()));
            } else {
                // Return Hard coded Recommendation for as Product was not found
                AcmeProductRequest acmeProductRequest = new AcmeProductRequest(
                        messageId,
                        "7283caf9-a24f-44ea-baba-a9ee64f86b54",
                        "Velocity V9 Bike",
                        "Velocity V9 is a high-performance hybrid bike that combines speed and comfort for riders who demand the best of both worlds.",
                        "1,099.99",
                        "/static/images/new_bikes_8.jpg",
                        "Lightweight frame and 700c wheels with high-quality tires make it a great fit for paved roads and gravel alike. Upright posture is ideal for a comfortable ride. Tires and frame work well for a 170cm tall rider."
                        );
                request = objectMapper.writeValueAsString(acmeProductRequest);
            }
            messagingTemplate.convertAndSend("/chatResponse", new AcmeChatResponse("display-prompt", request));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return new RecommendationResponse("Tell the customer, Hope this recommendation fits your needs."); //TODO what should LLM return
    }
}
