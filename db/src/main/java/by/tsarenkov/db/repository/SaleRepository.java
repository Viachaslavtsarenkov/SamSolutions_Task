package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Repository
public interface SaleRepository extends CrudRepository<Sale, Long> {
    Page<Sale> findAll(Pageable pageable);
}
