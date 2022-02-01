package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Sale;
import by.tsarenkov.db.repository.SaleRepository;
import by.tsarenkov.service.SaleService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class SaleServiceImpl implements SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Override
    public void saveSale(Sale sale) {
        saleRepository.save(sale);
    }

    @Override
    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }

    @Override
    public void changeSale(Sale sale) {
        saleRepository.save(sale);
    }
}
