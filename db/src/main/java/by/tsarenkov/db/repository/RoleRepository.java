package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.UserRole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<UserRole, Long> {
}
