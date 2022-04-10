package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.payload.BookPageResponse;
import by.tsarenkov.service.exception.BookNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface BookService {
    Book saveBook(Book book, MultipartFile image);
    void deleteBook(Long id);
    void updateBook(Book book, MultipartFile image);
    Book getBook(Long id) throws BookNotFoundException;
    BookPageResponse findAllBook(Specification<Book> spec, int page, Sort sort);
    List<Book> findBooksByNameOrId(String searchString);
    List<Book> getCart(Set<Long> ids);
}
