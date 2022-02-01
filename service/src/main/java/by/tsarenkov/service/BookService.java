package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.Book;

import java.util.List;

public interface BookService {
    void saveBook(Book book);
    void deleteBook(Long id);
    void updateBook(Book book);
    Book getBook(Long id);
    List<Book> getAllBook();
}
