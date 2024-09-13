package com.example.acme.assist;

import com.example.acme.assist.function.TrailService;
import com.example.acme.assist.function.TrailType;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TrailFunctionTest {

    @Autowired
    private TrailService trailService;

    @Test
    public void getTrailComponent() {

        String result = trailService.getTrailUiComponent();

    }

    public void getBikesForTrailType() {
        List<String> result = trailService.getBikesForTrailType(TrailType.Gravel);
    }
}
