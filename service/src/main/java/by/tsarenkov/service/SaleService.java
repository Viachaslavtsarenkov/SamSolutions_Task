package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Sale;
import by.tsarenkov.common.model.payload.SalePageResponse;
import by.tsarenkov.service.exception.SaleNotFoundException;

import java.util.List;

public interface SaleService {
    Sale saveSale(Sale sale);
    void deleteSale(Long id);
    Sale getSaleById(Long id) throws SaleNotFoundException;
    void updateSale(Sale sale);
    SalePageResponse getSales(int page);
}
