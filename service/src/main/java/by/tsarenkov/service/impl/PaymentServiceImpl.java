package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Payment;
import by.tsarenkov.common.model.payload.PaymentPageResponse;
import by.tsarenkov.db.repository.PaymentRepository;
import by.tsarenkov.service.PaymentService;
import by.tsarenkov.service.exception.PaymentNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    PaymentRepository paymentRepository;

    @Override
    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    @Override
    public Payment getPaymentById(Long id) throws PaymentNotFoundException {
        return Optional.of(paymentRepository.findById(id))
                .get().orElseThrow(PaymentNotFoundException::new);
    }

    @Override
    public void updatePayment(Payment payment) {
        paymentRepository.save(payment);
    }

    @Override
    public PaymentPageResponse getPaymentPage(int page) {
        Page<Payment> paymentPage = paymentRepository
                .findAll(PageRequest.of(page, 10));
        return new PaymentPageResponse(paymentPage.getContent(), paymentPage.getTotalPages());
    }
}
