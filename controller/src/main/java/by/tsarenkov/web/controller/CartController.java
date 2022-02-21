package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.Cart;
import by.tsarenkov.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {


    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart() {
        //todo getting id
        return ResponseEntity.ok().body(cartService.getCart(1L));
    }

    @PostMapping()
    public Cart saveBookToCart(@RequestBody Book book) {
        //todo change after logging in
        return null;
    }

    @DeleteMapping()
    @PreAuthorize("hasRole('CUSTOMER')")
    public Cart removeBookFromCart(@RequestBody Book book) {
        //todo
        return null;
    }

    @GetMapping()
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<?> checkBookIntoCart(@Param(value = "book_id") Long id) {
        return null;
    }

}
