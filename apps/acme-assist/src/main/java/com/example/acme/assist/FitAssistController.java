package com.example.acme.assist;

import com.example.acme.assist.model.AcmeChatRequest;
import com.example.acme.assist.model.AcmeChatResponse;
import com.example.acme.assist.model.GreetingRequest;
import com.example.acme.assist.model.GreetingResponse;
import com.example.acme.assist.model.SuggestedPrompts;
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
    private FitAssistChatService fitAssistChatService;

    @PostMapping("/question")
    public AcmeChatResponse chatCompletion(@RequestBody AcmeChatRequest request) {
       return fitAssistChatService.getChatResponse(request);
    }

    @PostMapping("/hello")
    public GreetingResponse greeting(@RequestBody GreetingRequest request) {
      return fitAssistChatService.getGreetingResponse(request);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public @ResponseBody String handleException(IllegalArgumentException ex) {
        return ex.getMessage();
    }
}
