package by.service.impl;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.enumeration.OrderStatus;
import by.tsarenkov.common.model.enumeration.PaymentStatus;
import by.tsarenkov.db.repository.OrderRepository;
import by.tsarenkov.payment.PaymentService;
import by.tsarenkov.payment.impl.PaypalService;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.impl.OrderServiceImpl;
import by.tsarenkov.service.security.SecurityContextService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@MockitoSettings(strictness = Strictness.LENIENT)
public class OrderServiceTestImpl {

    @InjectMocks
    private OrderServiceImpl orderService;
    @Mock
    private SecurityContextService securityContextService;
    @Mock
    private PaypalService paymentService;
    @Mock
    private OrderRepository orderRepository;

    private final Book book = Book.builder()
            .name("Nineteen Eighty-Four")
            .description("This article is about the 1949 novel by George Orwell")
            .amountPages(123)
            .price(11.11)
            .materialCover("soft")
            .publishedYear(2012)
            .build();

    private final Order order = new Order();
    private final Payment payment = new Payment();
    private final Long ID = 1L;

    @Test
    void shouldSaveOrder() throws PayPalRESTException {
        Links link = new Links("approved.com","approval_url");
        List<Links> linksList = new ArrayList<>();
        linksList.add(link);
        payment.setLinks(linksList);

        Set<Book> books = new HashSet<>();
        books.add(book);
        order.setOrderBooks(books);

        payment.setId(ID.toString());
        given(securityContextService.getCurrentUserId()).willReturn(ID);
        given(paymentService.createPayment(order.getAmount(),
                "USD",
                "paypal",
                "order",
                ID.toString()))
                .willReturn(payment);
        orderService.saveOrder(order);
        assertThat(order.getUser().getId()).isEqualTo(ID);
        assertThat(order.getDate()).isNotNull();
        assertThat(order.getPaymentId()).isEqualTo(ID.toString());
        assertThat(order.getPaymentStatus()).isEqualTo(PaymentStatus.NO_PAID);
        assertThat(order.getStatus()).isEqualTo(OrderStatus.NEW);
        verify(orderRepository).save(order);
    }

}
