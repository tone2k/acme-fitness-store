package com.example.acme.assist;

import com.example.acme.assist.model.AcmeChatRequest;
import com.example.acme.assist.model.AcmeChatResponse;
import com.example.acme.assist.model.GreetingRequest;
import com.example.acme.assist.model.GreetingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class FitAssistWebSocketController {

    @Autowired
    private FitAssistChatService fitAssistChatService;


    @MessageMapping("/hello")
    @SendTo("/greetings")
    public GreetingResponse greeting(GreetingRequest request) throws Exception {
        System.out.println("Hello received - " + request);
        return fitAssistChatService.getGreetingResponse(request);
    }

    @MessageMapping("/question")
    @SendTo("/answer")
    public AcmeChatResponse question(AcmeChatRequest request) throws Exception {
       System.out.println("Question received::" + request);
       return fitAssistChatService.getChatResponse(request);
    }

}
