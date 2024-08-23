package com.example.acme.assist.model;

import lombok.Data;

import java.util.List;

@Data
public class GreetingResponse {

    /**
     * ID of current conversation
     */
    private String conversationId;

    /**
     * Greeting message for the page
     */
    private String greeting;

    /**
     * List of suggested prompts for the page
     */
    private List<String> suggestedPrompts;

}
