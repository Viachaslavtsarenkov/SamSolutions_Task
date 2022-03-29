package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Book;

import java.util.List;
import java.util.Set;

public interface CartService {
    List<Book> getCart(Set<Long> ids);
}
