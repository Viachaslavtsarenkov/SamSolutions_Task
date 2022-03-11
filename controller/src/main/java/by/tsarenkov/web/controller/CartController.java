package by.tsarenkov.web.controller;

import by.tsarenkov.service.CartService;
import by.tsarenkov.service.exception.BookNotFountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/cart")
    public ResponseEntity<?> getCart(@RequestParam("books") String books) {
        List<Long> bookList = Arrays.stream(books.split("\\*"))
                .filter(s -> !s.equals(""))
                .mapToLong(Long::parseLong)
                .boxed()
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(cartService.getCart(bookList));
    }

}
