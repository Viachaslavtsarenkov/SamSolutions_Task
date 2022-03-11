package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Payment;
import by.tsarenkov.common.model.payload.PaymentPageResponse;
import by.tsarenkov.service.exception.PaymentNotFoundException;
import by.tsarenkov.service.impl.PaymentServiceImpl;
import by.tsarenkov.web.controller.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {


    private static final String PAYMENT_MAPPING = "/payment";
    private static final String PAYMENT_MAPPING_BY_ID = "/payment/{id}";

    @Autowired
    private static PaymentServiceImpl paymentService;

    @PostMapping(PAYMENT_MAPPING_BY_ID)
    public ResponseEntity<?> saveNewPayment(@PathVariable Long id,
                                         @RequestBody Payment payment) {
        paymentService.savePayment(payment);
        return null;
    }

    @PatchMapping(PAYMENT_MAPPING_BY_ID)
    public ResponseEntity<?> updatePayment(@PathVariable Long id,
                                        @RequestBody Payment payment) {
        paymentService.updatePayment(payment);
        return null;
    }

    @DeleteMapping(PAYMENT_MAPPING_BY_ID)
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.ok().body(new MessageResponse("payment was deleted"));
    }

    @GetMapping(PAYMENT_MAPPING_BY_ID)
    public ResponseEntity<?> getPayment(@PathVariable Long id)
            throws PaymentNotFoundException {
        return ResponseEntity.ok().body(paymentService.getPaymentById(id));
    }

    @GetMapping(PAYMENT_MAPPING)
    public PaymentPageResponse getAllSales(@RequestParam(value = "page") Integer page) {
        return paymentService.getPaymentPage(page);
    }
}
