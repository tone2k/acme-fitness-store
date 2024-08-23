package com.example.acme.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.util.StringUtils;

@Data
@AllArgsConstructor
public class PaymentRequest {
    private Card card;
    private String total;

    public boolean containsMissingData(){
        return !StringUtils.hasText(total) || card.containsMissingInfo();
    }

}
