package com.example.acme.assist.model;

import lombok.Data;
import org.springframework.ai.chat.messages.MessageType;

@Data
public class AcmeChatMessage {

    private MessageType role;

    private String content;

    private String currentProduct;

    public AcmeChatMessage(MessageType role, String content) {
        this.role = role;
        this.content = content;
        this.currentProduct = null;
    }
}
