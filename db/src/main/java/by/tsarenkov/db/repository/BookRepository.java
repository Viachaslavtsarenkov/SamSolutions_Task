package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository<Book, Long> {
}
