package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.Discount;
import by.tsarenkov.common.model.payload.DiscountPageResponse;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.db.repository.DiscountRepository;
import by.tsarenkov.service.DiscountService;
import by.tsarenkov.service.exception.DiscountNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.Optional;

import static by.tsarenkov.service.constants.LogMessage.*;

@Service
@RequiredArgsConstructor
public class DiscountServiceImpl implements DiscountService {

    private static final Logger LOGGER = LoggerFactory.getLogger(DiscountServiceImpl.class);

    private final DiscountRepository discountRepository;
    private final BookRepository bookRepository;

    @Override
    @Transactional
    public Discount saveDiscount(Discount discount) {
        discountRepository.save(discount);
        LOGGER.warn(String.format(LOG_CREATED_MSG, "Discount", discount.getId()));
        return discount;
    }

    @Override
    @Transactional
    public void deleteDiscount(Long id) {
        discountRepository.deleteById(id);
        LOGGER.warn(String.format(LOG_DELETED_MSG, "Sale", id));
    }

    @Transactional
    @Override
    public Discount getDiscountById(Long id) throws DiscountNotFoundException {
        Discount discount = Optional.of(discountRepository.findById(id)).get()
                .orElseThrow(DiscountNotFoundException::new);
        return discount;
    }

    @Override
    @Transactional
    public void updateDiscount(Discount discount) {
        discountRepository.save(discount);
        LOGGER.warn(String.format(LOG_UPDATED_MSG, "Sale", discount.getId()));
    }

    @Override
    public DiscountPageResponse findAllDiscounts(int page, int size) {
        Page<Discount> discounts = discountRepository
                .findAll(PageRequest.of(page, size));
        return new DiscountPageResponse(discounts.getContent(), discounts.getTotalPages());
    }

    @Override
    public boolean existsBookOnDiscount(Long idDiscount, Long id, Date startDate, Date endDate) {
        Book book = Optional.of(bookRepository.findById(id))
                .get()
                .orElseThrow();
        return discountRepository
                .existsDiscountByIdIsNotAndBooksContainingAndStartDateLessThanEqualAndEndDateGreaterThanEqual
                (idDiscount, book, endDate, startDate);
    }
}
