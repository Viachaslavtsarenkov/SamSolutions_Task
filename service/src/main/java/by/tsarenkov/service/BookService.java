package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.payload.BookPageResponse;
import by.tsarenkov.service.exception.BookNotFountException;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BookService {
    void saveBook(Book book, MultipartFile image);
    void deleteBook(Long id);
    void updateBook(Book book, MultipartFile image);
    Book getBook(Long id) throws BookNotFountException;
    BookPageResponse getAllBook(int page, Sort sort);
    List<Book> findBooksByNameOrId(String searchString);
}
