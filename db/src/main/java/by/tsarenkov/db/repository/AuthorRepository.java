package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
