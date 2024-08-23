package com.example.acme.assist.vectorstore;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;

import java.util.List;

public class LazyCalculateSimpleVectorStore extends SimpleVectorStore {

    public static final Logger LOGGER = LoggerFactory.getLogger(LazyCalculateSimpleVectorStore.class);

    public LazyCalculateSimpleVectorStore(EmbeddingModel embeddingModel) {
        super(embeddingModel);
    }

    @Override
    public void add(List<Document> documents) {
        for (Document document : documents) {
            if (document.getEmbedding() != null && document.getEmbedding().length != 0) {
                LOGGER.info("Document id = {} already has an embedding, skipping.", document.getId());
            } else {
                LOGGER.info("Calling EmbeddingClient for document id = {}", document.getId());
                document.setEmbedding(this.embeddingModel.embed(document));
            }
            this.store.put(document.getId(), document);
        }
    }
}
