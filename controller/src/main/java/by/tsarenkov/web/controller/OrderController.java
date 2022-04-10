package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.payload.OrderPageResponse;
import by.tsarenkov.service.OrderService;
import by.tsarenkov.service.exception.OrderNotFoundException;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
public class OrderController {


    private static final String ORDER_MAPPING = "/orders";
    private static final String ORDER_MAPPING_BY_ID = "/orders/{id}";

    private final OrderService orderService;

    @PostMapping(ORDER_MAPPING)
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> saveNewOrder(@RequestBody Order order)
            throws PayPalRESTException {
        return ResponseEntity.ok().body(orderService.saveOrder(order));
    }

    @PatchMapping(ORDER_MAPPING_BY_ID)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateOrder(@PathVariable Long id,
                                         @RequestBody Order order) {
        System.out.println(order.getStatus());
        orderService.updateOrder(order);
        return null;
    }

    @GetMapping(ORDER_MAPPING_BY_ID)
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<?> getOrder(@PathVariable Long id)
            throws OrderNotFoundException {
        return ResponseEntity.ok().body(orderService.findOrderById(id));
    }

    @GetMapping(ORDER_MAPPING)
    @PreAuthorize("hasRole('ADMIN')")
    public OrderPageResponse getAllOrder(@RequestParam(value = "page",
            required = false,
            defaultValue = "0") Integer page) {
        return orderService.getOrderPage(page);
    }

    @GetMapping("/orders/books")
    public ResponseEntity<?> getOrderBooks(@RequestParam Set<Long> books) {
        Order order = orderService.createOrder(books);
        return ResponseEntity
                .ok().body(order);
    }

    @GetMapping("/orders/payment")
    public ResponseEntity<?> executePayment(@RequestParam(value = "paymentId") String paymentId,
                                         @RequestParam(value = "payerId") String payerId)
            throws PayPalRESTException {
            orderService.executeOrder(paymentId, payerId);
        return null;
    }

}
