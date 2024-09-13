package com.example.acme.assist;

import com.example.acme.assist.model.Greeting;
import com.example.acme.assist.model.HelloMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class FitAssistWebSocketController {

    @MessageMapping("/hello")
    @SendTo("/greetings")
    public Greeting greeting(HelloMessage message) throws Exception {
        System.out.println("Hello received.");
        Thread.sleep(1000); // simulated delay
        return Greeting.builder().content("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!").build();
    }

}
