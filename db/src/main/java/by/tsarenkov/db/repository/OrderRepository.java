package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.enumeration.PaymentStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
    Page<Order> findAll(Pageable pageable);
    @Modifying
    @Transactional
    @Query("update Order o set o.paymentStatus = :newStatus where o.paymentId = :id")
    void changePaymentStatus(@Param(value = "newStatus") PaymentStatus newStatus,
                          @Param(value = "id") String paymentId);
    Order findByIdAndUserId(Long idOrder, Long idUser);
}
