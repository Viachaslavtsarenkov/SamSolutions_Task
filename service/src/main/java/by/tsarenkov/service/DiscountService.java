package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Discount;
import by.tsarenkov.common.model.payload.DiscountPageResponse;
import by.tsarenkov.service.exception.DiscountNotFoundException;

import java.sql.Date;

public interface DiscountService {
    Discount saveDiscount(Discount discount);
    void deleteDiscount(Long id);
    Discount getDiscountById(Long id) throws DiscountNotFoundException;
    void updateDiscount(Discount discount);
    DiscountPageResponse findAllDiscounts(int page, int size);
    boolean existsBookOnDiscount(Long idDiscount, Long id, Date endDate, Date startDate);
}
