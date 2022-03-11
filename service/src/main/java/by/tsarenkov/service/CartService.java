package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.service.exception.BookNotFountException;

import java.util.List;

public interface CartService {
    List<Book> getCart(List<Long> ids);
}
