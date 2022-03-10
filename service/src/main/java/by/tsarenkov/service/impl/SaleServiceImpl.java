package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Sale;
import by.tsarenkov.db.repository.SaleRepository;
import by.tsarenkov.service.SaleService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class SaleServiceImpl implements SaleService {

    private SaleRepository saleRepository;

    @Override
    @Transactional
    public void saveSale(Sale sale) {
        //todo checking by date
        saleRepository.save(sale);
    }

    @Override
    @Transactional
    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void changeSale(Sale sale) {
        saleRepository.save(sale);
    }
}
