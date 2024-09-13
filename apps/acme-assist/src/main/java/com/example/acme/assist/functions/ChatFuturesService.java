package com.example.acme.assist.functions;

import java.util.HashMap;
import java.util.concurrent.CompletableFuture;
import org.springframework.stereotype.Service;

@Service
public class ChatFuturesService {
    public HashMap<String, CompletableFuture<String>> unresolovedCompletableFutures = new HashMap<>();


    public void resolveCompletableFuture(String messageId, String data) {
        // Look up the future
        // Execute and complete the Future
        final CompletableFuture<String> completableFuture = this.unresolovedCompletableFutures.get(messageId);
        // delete future from Hashmap
        this.unresolovedCompletableFutures.remove(messageId);
        completableFuture.complete("Recommend a bike fit for " + data);

    }
}
