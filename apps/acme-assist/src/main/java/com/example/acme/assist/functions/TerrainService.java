package com.example.acme.assist.functions;

import com.example.acme.assist.model.AcmeChatResponse;
import com.example.acme.assist.model.AcmeDisplayRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.function.Function;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TerrainService implements Function<TerrainRequest, TerrainResponse> {

    @Autowired
    ChatFuturesService chatFuturesService;

    @Autowired
    SimpMessagingTemplate messagingTemplate;

    @Autowired
    ObjectMapper objectMapper;

    Logger logger = Logger.getLogger(TerrainService.class.getName());


    @Override
    public TerrainResponse apply(TerrainRequest terrainRequest) {
        // Create a Java Future
        final String messageId = UUID.randomUUID().toString();
        CompletableFuture<String> completableFuture = new CompletableFuture<>();
        completableFuture.thenApply(response -> {
            logger.log(Level.INFO, "Response : " + response);
            return response;
        });
        //  Add the Java Future a hashmap (in memory) with a UUID as the key
        chatFuturesService.unresolovedCompletableFutures.put(messageId, completableFuture);
        try {
            String request = objectMapper.writeValueAsString(new AcmeDisplayRequest(messageId));
            messagingTemplate.convertAndSend("/chatResponse", new AcmeChatResponse("user-prompt", request));
            // Once it resolves return as response from the completableFuture

            return new TerrainResponse(completableFuture.get());
        } catch (InterruptedException | JsonProcessingException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
    // Phase 1 Have a single Function for a single action
    // Phase 2 Do we have second function or do we have a framework (Explore the Wizard)
}
