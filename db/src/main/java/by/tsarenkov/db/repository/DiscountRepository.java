package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.Discount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.Set;

@Repository
public interface DiscountRepository extends CrudRepository<Discount, Long> {
    Page<Discount> findAll(Pageable pageable);
    boolean existsDiscountByBooksContainingAndStartDateLessThanEqualAndEndDateGreaterThanEqual
            (Book books, Date startDate, Date endDate);
    boolean existsDiscountByBooksContaining
            (Book books);
}
