package com.example.acme.assist.model;

import lombok.Data;

import java.util.List;

@Data
public class SuggestedPrompts {

    /**
     * Name of the request page
     */
    private String page;

    /**
     * Greeting message for the page
     */
    private String greeting;

    /**
     * List of suggested prompts for the page
     */
    private List<String> prompts;

    /**
     * If these suggestion prompts used as the default
     */
    private boolean isDefault;

}
