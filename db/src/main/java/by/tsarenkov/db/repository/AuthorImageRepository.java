package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.AuthorImage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorImageRepository extends CrudRepository<AuthorImage, Long> {
}
