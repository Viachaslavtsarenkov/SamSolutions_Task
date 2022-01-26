package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
