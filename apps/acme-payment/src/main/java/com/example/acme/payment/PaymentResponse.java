package com.example.acme.payment;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentResponse {

    private boolean success;
    private String message;
    private String amount;
    private String transactionID;
    private int status;

}
