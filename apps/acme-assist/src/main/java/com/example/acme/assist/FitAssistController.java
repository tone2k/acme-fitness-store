package com.example.acme.assist;

import com.example.acme.assist.model.*;
import org.springframework.ai.chat.messages.MessageType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ai")
public class FitAssistController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private CartService cartService;

    @Autowired
    private SuggestedPromptService suggestedPromptService;

    @PostMapping("/question")
    public AcmeChatResponse chatCompletion(@RequestBody AcmeChatRequest request) {
        List<AcmeChatMessage> userMessages = request.getMessages();

        boolean addToCartIntent = userMessages.stream()
                .filter(message -> message.getRole() == MessageType.USER)
                .anyMatch(message -> containsAddToCartIntent(message.getContent()));

        if (addToCartIntent) {
            String userId = "user@example.com";
            String itemId = extractItemIdFromMessage(userMessages);
            int quantity = 1;


            CartAddResponse cartAddResponse = cartService.addItemToCart(userId, itemId, quantity, "Test", "100", "Testing");

        }
        List<String> ret = chatService.chat(request.getMessages(), request.getProductId());
        AcmeChatResponse response = new AcmeChatResponse();
        response.setMessages(ret);
        return response;
    }

    @PostMapping("/hello")
    public GreetingResponse greeting(@RequestBody GreetingRequest request) {
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

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public @ResponseBody String handleException(IllegalArgumentException ex) {
        return ex.getMessage();
    }

    private boolean containsAddToCartIntent(String message) {
        String lowerCaseMessage = message.trim().toLowerCase();
        return lowerCaseMessage.contains("add to cart") || lowerCaseMessage.contains("add item to cart")
                || lowerCaseMessage.contains("add it to my cart") || lowerCaseMessage.contains("put in cart")
                || lowerCaseMessage.contains("add to my cart") || lowerCaseMessage.contains("put it in my cart");
    }


    private String extractItemIdFromMessage(List<AcmeChatMessage> messages) {
        for (AcmeChatMessage message : messages) {
            String content = message.getContent();
            int startIdx = content.indexOf("href=\"/product/");
            if (startIdx != -1) {
                startIdx += 15;
                int endIdx = content.indexOf("\"", startIdx);
                if (endIdx != -1) {
                    return content.substring(startIdx, endIdx);
                }
            }
        }
        return null;
    }
}
