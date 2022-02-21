package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Author;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {
    List<Author> findAuthorByPseudonymContaining(String pseudonym);
}
