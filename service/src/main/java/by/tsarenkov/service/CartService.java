package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.Cart;

import java.util.List;

public interface CartService {
    void saveBookToCart(Long bookId, Long userId);
    void deleteBookFromCart(Long bookId, Long userId);
    Cart getCart(Long idUser);
}
