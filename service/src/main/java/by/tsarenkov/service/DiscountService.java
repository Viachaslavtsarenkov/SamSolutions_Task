package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Discount;
import by.tsarenkov.common.model.payload.DiscountPageResponse;
import by.tsarenkov.service.exception.DiscountNotFoundException;

import java.sql.Date;

public interface DiscountService {
    Discount saveSale(Discount discount);
    void deleteSale(Long id);
    Discount getSaleById(Long id) throws DiscountNotFoundException;
    void updateSale(Discount discount);
    DiscountPageResponse findAllDiscounts(int page, int size);
    boolean existsBookOnDiscount(Long id, Date endDate, Date startDate);
}
