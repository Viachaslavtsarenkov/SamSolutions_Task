package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.entity.UserRole;
import by.tsarenkov.common.model.enumeration.OrderStatus;
import by.tsarenkov.common.model.enumeration.PaymentStatus;
import by.tsarenkov.common.model.enumeration.UserStatus;
import by.tsarenkov.db.config.JpaTestConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
public class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    private final Order order = Order.builder()
            .address(" 221b, Baker Street, London, NW1 6XE, UK")
            .status(OrderStatus.NEW)
            .paymentStatus(PaymentStatus.NO_PAID)
            .paymentId("payment_id")
            .paymentUrl("https://payment.com")
            .date(new java.sql.Date(new java.util.Date().getTime()))
            .amount(22.44)
            .build();

    @Test
    public void ShouldSaveOrder() {
        User user = User.builder()
                .surname("Tsarankou")
                .name("Viachaslau")
                .code("activation code")
                .email("tsarenkovslava@yandex.ru")
                .status(UserStatus.NO_ACTIVATED)
                .password("password")
                .build();
        userRepository.save(user);
        order.setUser(user);
        orderRepository.save(order);
        assertThat(order.getId()).isNotEqualTo(0);
    }
}
