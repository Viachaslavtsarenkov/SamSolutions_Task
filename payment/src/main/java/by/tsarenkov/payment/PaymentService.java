package by.tsarenkov.payment;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

public interface PaymentService  {
    Payment createPayment(Double total,
                          String currency,
                          String method,
                          String intent,
                          String description)
            throws PayPalRESTException;
}
