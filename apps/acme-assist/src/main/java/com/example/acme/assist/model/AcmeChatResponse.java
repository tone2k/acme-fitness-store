package com.example.acme.assist.model;

import java.util.UUID;

public record AcmeChatResponse(String messageType, String messageId, String data) {

    public AcmeChatResponse(String messageType, String data) {
        this(messageType, UUID.randomUUID().toString(), data);
    }

}

