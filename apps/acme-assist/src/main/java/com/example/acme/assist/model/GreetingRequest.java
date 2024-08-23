package com.example.acme.assist.model;

import lombok.Data;

/**
 * Model of request body of Greeting API
 */
@Data
public class GreetingRequest {

    /**
     * Name of the request page
     */
    private String page;

    /**
     * ID of current user
     */
    private String userId;

    /**
     * ID of current conversation
     */
    private String conversationId;

}
