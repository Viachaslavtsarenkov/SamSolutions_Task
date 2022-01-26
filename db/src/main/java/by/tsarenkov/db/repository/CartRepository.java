package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Cart;
import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<Cart, Long> {
}
