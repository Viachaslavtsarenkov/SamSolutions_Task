package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
    Page<Book> findAll(Pageable pageable);
    List<Book> findBookByNameContaining(String name);
    List<Book> findAllByIdIn(List<Long> ids);
}
