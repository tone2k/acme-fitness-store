package com.example.acme.assist;

import org.json.JSONObject;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

@Testcontainers
@SpringBootTest
@AutoConfigureMockMvc
class FitAssistControllerTest {

    @Container
    @ServiceConnection
    public static final PostgreSQLContainer postgreSQLContainer =
            new PostgreSQLContainer<>(DockerImageName.parse("pgvector/pgvector:pg16")
                    .asCompatibleSubstituteFor("postgres"));

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGreetingsEndpoint() throws Exception {
        final MvcResult mvcResult = mockMvc.perform(
                        post("/ai/hello")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                           "page": "foobar page",
                                           "userId": "foobar userId",
                                           "conversationId": "foobar conversationId"
                                        }
                                        """))
                .andExpect(status().isOk())
                .andReturn();
        final String content = mvcResult.getResponse().getContentAsString();
        JSONAssert.assertEquals("""
                        {
                          "conversationId": "foobar conversationId",
                          "greeting": "Welcome to ACME FITNESS! Looking for the perfect e-bike and accessories? I'm here to assist you. To get started, I can suggest some popular e-bike models based on your preferences. Just let me know your riding style, desired speed, and approximate range, and we'll find the ideal match for you.",
                          "suggestedPrompts": [
                            "I want an e-bike that can keep up with city traffic.",
                            "Show me e-bikes with long battery life for my daily commute.",
                            "What are the most popular e-bike models for city riders?"
                          ]
                        }
                        """,
                new JSONObject(content),
                JSONCompareMode.STRICT
        );
    }

    @Test
    @Disabled
    public void testQuestionDeliveryTime() throws Exception {
        final MvcResult mvcResult = mockMvc.perform(
                        post("/ai/question")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                           "page": "foobar page",
                                           "userId": "foobar userId",
                                           "messages": [
                                             {
                                               "role": "USER",
                                               "content": "How long will it take to get the bike delivered to me?"
                                             }
                                           ]
                                         }
                                        """))
                .andExpect(status().isOk())
                .andReturn();
        final String content = mvcResult.getResponse().getContentAsString();
        //todo Figure out whether to mock or talk to OpenAPI for this area.
    }
}
