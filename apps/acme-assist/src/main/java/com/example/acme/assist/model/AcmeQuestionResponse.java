package com.example.acme.assist.model;

import lombok.Data;

import java.util.List;

@Data
public class AcmeQuestionResponse {

    /**
     * The candidate answers for the chat. Only one is provided for now.
     */
    private List<String> messages;

}
