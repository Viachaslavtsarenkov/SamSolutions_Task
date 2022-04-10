package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.payload.OrderPageResponse;
import by.tsarenkov.service.exception.OrderNotFoundException;
import com.paypal.base.rest.PayPalRESTException;

import java.util.Set;

public interface OrderService {
    Order saveOrder(Order order) throws PayPalRESTException;
    Order findOrderById(Long id) throws OrderNotFoundException;
    void updateOrder(Order order);
    OrderPageResponse getOrderPage(int page);
    Order createOrder(Set<Long> ids) ;
    Order executeOrder(String paymentId, String payerId) throws PayPalRESTException;
}
