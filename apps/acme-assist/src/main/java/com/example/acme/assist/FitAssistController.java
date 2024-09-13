package com.example.acme.assist;

import com.example.acme.assist.model.AcmeQuestionRequest;
import com.example.acme.assist.model.AcmeQuestionResponse;
import com.example.acme.assist.model.GreetingRequest;
import com.example.acme.assist.model.GreetingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
public class FitAssistController {
    @Autowired
    private FitAssistChatService fitAssistChatService;

    @PostMapping("/question")
    public AcmeQuestionResponse chatCompletion(@RequestBody AcmeQuestionRequest request) {
       return fitAssistChatService.getQuestionResponse(request);
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
