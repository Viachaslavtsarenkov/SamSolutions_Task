package by.tsarenkov.web.controller;

import by.tsarenkov.service.CartService;
import by.tsarenkov.service.exception.BookNotFountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/cart")
    public ResponseEntity<?> getCart(@RequestParam("books") String books) {
        long[] array = Arrays.stream(books.split("\\*"))
                .mapToLong(Long::parseLong).toArray();
        List<Long> bookList =  new ArrayList<>();
        for(int i = 0; i < array.length; ++i) {
            bookList.add(array[i]);
        }
        System.out.println(books);
        return ResponseEntity.ok().body(cartService.getCart(bookList));
    }

}
