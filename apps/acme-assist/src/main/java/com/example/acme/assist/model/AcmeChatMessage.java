package com.example.acme.assist.model;

import lombok.Data;
import org.springframework.ai.chat.messages.MessageType;

@Data
public class AcmeChatMessage {

    private MessageType role;

    private String content;

    private String currentProduct;

}
