package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.UserStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    boolean existsByEmail(String email);
    @Modifying
    @Query("update User user set user.status = :newStatus where user.id = :id")
    void changeUserStatus(@Param(value = "id") Long id, @Param(value = "newStatus")UserStatus newStatus);
}
