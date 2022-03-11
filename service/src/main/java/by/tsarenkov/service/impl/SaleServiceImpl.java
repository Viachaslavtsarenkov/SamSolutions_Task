package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.Sale;
import by.tsarenkov.common.model.payload.SalePageResponse;
import by.tsarenkov.db.repository.SaleRepository;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.SaleService;
import by.tsarenkov.service.exception.BookNotFountException;
import by.tsarenkov.service.exception.SaleNotFoundException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static by.tsarenkov.service.constants.LogMessage.*;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class SaleServiceImpl implements SaleService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SaleServiceImpl.class);

    @Autowired
    private SaleRepository saleRepository;

    @Override
    @Transactional
    public Sale saveSale(Sale sale) {
        saleRepository.save(sale);
        LOGGER.warn(String.format(LOG_CREATED_MSG, "Sale", sale.getIdSale()));
        return sale;
    }

    @Override
    @Transactional
    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
        LOGGER.warn(String.format(LOG_DELETED_MSG, "Sale", id));
    }

    @Transactional
    @Override
    public Sale getSaleById(Long id) throws SaleNotFoundException {
        Sale sale = Optional.of(saleRepository.findById(id)).get()
                .orElseThrow(SaleNotFoundException::new);
        return sale;
    }

    @Override
    @Transactional
    public void updateSale(Sale sale) {
        saleRepository.save(sale);
        LOGGER.warn(String.format(LOG_UPDATED_MSG, "Sale", sale.getIdSale()));
    }

    @Override
    public SalePageResponse getSales(int page) {
        Page<Sale> sales = saleRepository.findAll(PageRequest.of(page, 10));
        return new SalePageResponse(sales.getContent(), sales.getTotalPages());
    }
}
