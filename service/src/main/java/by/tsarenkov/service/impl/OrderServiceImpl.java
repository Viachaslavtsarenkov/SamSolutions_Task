package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.enumeration.PaymentStatus;
import by.tsarenkov.payment.impl.PaypalService;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.common.model.enumeration.OrderStatus;
import by.tsarenkov.common.model.payload.OrderPageResponse;
import by.tsarenkov.db.repository.OrderRepository;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.OrderService;
import by.tsarenkov.service.exception.OrderNotFoundException;
import by.tsarenkov.service.security.SecurityContextService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final SecurityContextService securityContextService;
    private final PaypalService paymentService;
    private final BookService bookService;
    private final MailServiceImpl mailService;

    @Override
    @Transactional
    public Order saveOrder(Order order) throws PayPalRESTException {
        Long userId = securityContextService.getCurrentUserId();

        Payment payment = paymentService
                .createPayment(order.getAmount(),
                        "USD",
                        "paypal",
                        "order",
                        userId.toString());

        for(Links link:payment.getLinks()) {
            if(link.getRel().equals("approval_url")) {
                order.setPaymentUrl(link.getHref());
            }
        }

        Date date = new java.sql.Date(Calendar
                .getInstance()
                .getTime()
                .getTime());

        User user = new User();
        user.setId(userId);
        order.setStatus(OrderStatus.NEW);
        order.setUser(user);
        order.setDate(date);
        order.setPaymentStatus(PaymentStatus.NO_PAID);
        order.setPaymentId(payment.getId());
        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Order findOrderById(Long id) throws OrderNotFoundException {
        return Optional.of(orderRepository.findById(id))
                .get().orElseThrow(OrderNotFoundException::new);
    }

    @Override
    @Transactional
    public void updateOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    @Transactional
    public OrderPageResponse getOrderPage(int page) {
        Page<Order> orderPage = orderRepository
                .findAll(PageRequest.of(page, 10));
        return new OrderPageResponse(orderPage.getContent(), orderPage.getTotalPages());
    }

    @Override
    public Order createOrder(Set<Long> books) {
        List<Book> orderBooks = bookService.getCart(books);
        Order order = new Order();
        order.setOrderBooks(new HashSet<>(orderBooks));
        putForwardAccount(order);
        return order;
    }

    @Override
    public Order executeOrder(String paymentId, String payerId) throws PayPalRESTException{
        paymentService.executePayment(paymentId, payerId);
        orderRepository.changePaymentStatus(PaymentStatus.PAID, paymentId);
        //todo change
        return null;
    }

    private void putForwardAccount(Order order) {
        order.setAmount(order.getOrderBooks().stream()
                .mapToDouble((book) ->  book.getDiscounts().size() == 0
                        ? book.getPrice()
                        : book.getDiscountPrice())
                .sum());
    }
}
