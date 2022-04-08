package by.tsarenkov.payment.impl;

import by.tsarenkov.payment.PaymentService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@PropertySource(value = "classpath:paypal.properties", encoding = "UTF-8")
public class PaypalService implements PaymentService {

    private final APIContext apiContext;
    private final Environment env;
    private static final String SUCCESS_URL = "payment.success.url";
    private static final String CANCEL_URL = "payment.cancel.url";

    @Override
    public Payment createPayment(Double total,
                              String currency,
                              String method,
                              String intent,
                              String description) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
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
        redirectUrls.setCancelUrl(env.getRequiredProperty(CANCEL_URL));
        redirectUrls.setReturnUrl(env.getRequiredProperty(SUCCESS_URL));
        payment.setRedirectUrls(redirectUrls);
        return payment.create(apiContext);
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException{
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecute);
    }
}
