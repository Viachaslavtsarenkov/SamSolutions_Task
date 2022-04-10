package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Order;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.service.AccountService;
import by.tsarenkov.service.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> findUserProfile() throws UserNotFoundException {
        User user = accountService.getUserProfile();
        return ResponseEntity.ok()
                .body(user);
    }

    @GetMapping("/profile/order/{id}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> findUserOrders(@PathVariable(value = "id") Long idOrder) {
        Order order = accountService.getUserOrder(idOrder);
        return ResponseEntity.ok()
                .body(order);
    }
}
