package com.example.acme.assist;

import com.example.acme.assist.exception.AcmeNoSuchMessageException;
import com.example.acme.assist.functions.ChatFuturesService;
import com.example.acme.assist.model.AcmeChatRequest;
import com.example.acme.assist.model.AcmeChatResponse;
import com.example.acme.assist.model.AcmeQuestionRequest;
import com.example.acme.assist.model.AcmeQuestionResponse;
import com.example.acme.assist.model.GreetingRequest;
import com.example.acme.assist.model.GreetingResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class FitAssistWebSocketController {

    @Autowired
    private FitAssistChatService fitAssistChatService;

    @Autowired
    private ChatFuturesService chatFuturesService;

    @Autowired
    private ObjectMapper objectMapper;

    @MessageMapping("/chatRequest")
    @SendTo("/chatResponse")
    public AcmeChatResponse chatRequest(AcmeChatRequest request) throws Exception {
        System.out.println("Chat received::" + request);
        switch (request.messageType()) {
            case "greeting":
                GreetingRequest greetingRequest = objectMapper.readValue(request.data(), GreetingRequest.class);
                GreetingResponse greetingResponse = fitAssistChatService.getGreetingResponse(greetingRequest);
                return new AcmeChatResponse(request.messageType(),
                        objectMapper.writeValueAsString(greetingResponse));
            case "question":
                AcmeQuestionRequest chatRequest = objectMapper.readValue(request.data(), AcmeQuestionRequest.class);
                AcmeQuestionResponse acmeQuestionResponse = fitAssistChatService.getQuestionResponse(chatRequest);
                return new AcmeChatResponse(request.messageType(),
                        objectMapper.writeValueAsString(acmeQuestionResponse));
            case "user-prompt":
                AcmeDisplayResponse acmeDisplayResponse = objectMapper.readValue(request.data(), AcmeDisplayResponse.class);
                chatFuturesService.resolveCompletableFuture(acmeDisplayResponse.messageId(), acmeDisplayResponse.data());
                return null; //No response to the Front End needed
        }
        throw new AcmeNoSuchMessageException(String.format("No Such message + %s", request.messageType()));
    }

}
