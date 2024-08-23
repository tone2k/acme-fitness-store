package com.example.acme.payment;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Card {

    private String number;
    private String expYear;
    private String expMonth;
    private String ccv;

    public boolean containsMissingInfo() {
        return !StringUtils.hasText(number) || !StringUtils.hasText(expYear) || !StringUtils.hasText(ccv) || !StringUtils.hasText(expMonth);
    }

    public boolean isExpired() {
        LocalDate expDate = LocalDate.of(Integer.parseInt(expYear), Integer.parseInt(expMonth), 1);
        return expDate.isBefore(LocalDate.now());
    }

    public boolean isValidCardNumber() {
        return number.length() % 4 == 0;
    }
}
