package com.example.acme.assist.config;

import com.example.acme.assist.ProductRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class FitAssistConfiguration {

    @Autowired
    private VectorStore vectorStore;
    
    @Bean
    public ChatClient chatClient(ChatClient.Builder chatClientBuilder){
        return chatClientBuilder.build();
    }

	@Bean
	public VectorStoreInitializer vectorStoreInitializer(ProductRepository repo) {
		return new VectorStoreInitializer(repo, this.vectorStore);
	}

}

