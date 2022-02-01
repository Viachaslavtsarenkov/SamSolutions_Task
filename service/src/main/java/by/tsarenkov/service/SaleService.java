package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Sale;

public interface SaleService {
    void saveSale(Sale sale);
    void deleteSale(Long id);
    void changeSale(Sale sale);
}
