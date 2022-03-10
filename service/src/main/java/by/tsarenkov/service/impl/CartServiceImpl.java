package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.db.repository.UserRepository;
import by.tsarenkov.service.CartService;
import by.tsarenkov.service.exception.AuthorNotFoundException;
import by.tsarenkov.service.exception.BookNotFountException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;


    @Override
    @Transactional
    public List<Book> getCart(List<Long> books) {
        List<Book> bookList = bookRepository.findAllByIdIn(books);
       return bookList;
    }

}
