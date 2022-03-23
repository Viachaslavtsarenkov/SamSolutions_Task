package by.tsarenkov.payment.impl;

import by.tsarenkov.payment.PaymentService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaypalService implements PaymentService {
    @Autowired
    private APIContext apiContext;
   // //todo change url
    private static final String SUCCESS_URL = "http://localhost:3000/";

    @Override
    public Payment createPayment(Double total,
                              String currency,
                              String method,
                              String intent,
                              String description) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        System.out.println(total);
        total = new BigDecimal(total)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
        amount.setTotal(String.format("%.2f", total).replace(",","."));
        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);
        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);
        Payer payer = new Payer();
        payer.setPaymentMethod(method);
        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(SUCCESS_URL);
        redirectUrls.setReturnUrl(SUCCESS_URL);
        payment.setRedirectUrls(redirectUrls);
        System.out.println("CREATED");
        return payment.create(apiContext);
    }
}
