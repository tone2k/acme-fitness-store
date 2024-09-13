package com.example.acme.assist;

import com.example.acme.assist.model.AcmeChatRequest;
import com.example.acme.assist.model.AcmeChatResponse;
import com.example.acme.assist.model.GreetingRequest;
import com.example.acme.assist.model.GreetingResponse;
import com.example.acme.assist.model.SuggestedPrompts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FitAssistChatService {
    @Autowired
    private ChatService chatService;

    @Autowired
    private SuggestedPromptService suggestedPromptService;


    public GreetingResponse getGreetingResponse(GreetingRequest request) {
        SuggestedPrompts prompts = suggestedPromptService.getSuggestedPrompts(request.getPage());

        if (prompts == null) {
            return null;
        }

        GreetingResponse response = new GreetingResponse();
        response.setConversationId(request.getConversationId());
        response.setGreeting(prompts.getGreeting());
        response.setSuggestedPrompts(prompts.getPrompts());
        return response;
    }
    
    public AcmeChatResponse getChatResponse(AcmeChatRequest request) {
        AcmeChatResponse response = new AcmeChatResponse();
        response.setMessages(chatService.chat(request.getMessages(), request.getProductId()));
        return response;
    }
}
