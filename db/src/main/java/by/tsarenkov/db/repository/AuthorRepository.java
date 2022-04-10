package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {
    List<Author> findAuthorByPseudonymIgnoreCaseContaining(String pseudonym);
    boolean existsByPseudonym(String pseudonym);
    Page<Author> findAll(Pageable pageable);
    boolean existsByPseudonymIgnoreCaseAndIdIsNot(String pseudonym, Long id);
}
