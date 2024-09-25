package com.example.acme.assist;

import com.example.acme.assist.data.ActiveWebSocketUserRepository;
import com.example.acme.assist.model.AcmeChatRequest;
import com.example.acme.assist.model.AcmeChatResponse;
import com.example.acme.assist.model.GreetingRequest;
import com.example.acme.assist.model.GreetingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class FitAssistWebSocketController {

    @Autowired
    private FitAssistChatService fitAssistChatService;

    @Autowired
    SimpMessageSendingOperations messagingTemplate;

    @Autowired
    ActiveWebSocketUserRepository activeUserRepository;

    @MessageMapping("/hello")
    public void greeting(GreetingRequest request) throws Exception {
        String userId = request.getUserId();
        System.out.println(String.format("Hello received - Room - %s - Message %s ", userId, request));
        GreetingResponse response =  fitAssistChatService.getGreetingResponse(request);
        System.out.println(String.format("Greeting Response for userId: %s is %s", userId, response));
        String destinationTopic = "/answer" + "/" + userId;
        messagingTemplate.convertAndSend(destinationTopic, response);
    }

    @MessageMapping("/question")
    @SendTo("/answer")
    public AcmeChatResponse question(AcmeChatRequest request) throws Exception {
       System.out.println("Question received::" + request);
       return fitAssistChatService.getChatResponse(request);
    }

}
