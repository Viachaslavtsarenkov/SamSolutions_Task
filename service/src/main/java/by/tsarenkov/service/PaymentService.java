package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Payment;
import by.tsarenkov.common.model.entity.Sale;
import by.tsarenkov.common.model.payload.PaymentPageResponse;
import by.tsarenkov.common.model.payload.SalePageResponse;
import by.tsarenkov.service.exception.PaymentNotFoundException;
import by.tsarenkov.service.exception.SaleNotFoundException;

public interface PaymentService {
    Payment savePayment(Payment payment);
    void deletePayment(Long id);
    Payment getPaymentById(Long id) throws PaymentNotFoundException;
    void updatePayment(Payment payment);
    PaymentPageResponse getPaymentPage(int page);
}
