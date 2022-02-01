package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.Cart;
import by.tsarenkov.service.CartService;

import java.util.List;

public class CartServiceImpl implements CartService {


    @Override
    public void saveBookToCart(Long bookId, Long userId) {

    }

    @Override
    public void deleteBookFromCart(Long boodId, Long userId) {

    }

    @Override
    public Cart getCart(Long idUser) {
        return null;
    }

    @Override
    public List<Author> getAllAuthors() {
        return null;
    }
}
