package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {
    List<Author> findAuthorByPseudonymContaining(String pseudonym);
    boolean existsByPseudonym(String pseudonym);
    Page<Author> findAll(Pageable pageable);
    Author findAuthorByPseudonym(String pseudonym);
    boolean existsByPseudonymAndIdIsNot(String pseudonym, Long id);
}
