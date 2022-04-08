package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.BookImage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookImageRepository extends CrudRepository<BookImage, Long> {
}
