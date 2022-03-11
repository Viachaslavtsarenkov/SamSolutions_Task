package by.tsarenkov.common.model.payload;

import by.tsarenkov.common.model.entity.Payment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PaymentPageResponse {
    private List<Payment> payments;
    private Integer totalPages;
}
