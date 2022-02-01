package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.impl.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    private BookService service;

    @Autowired
    public void setService(BookServiceImpl service) {
        this.service = service;
    }

    @GetMapping("")
    public List<Book> getBooks() {
        List<Book> books = service.getAllBook();
        return books;
    }

    @GetMapping("/{id}")
    public Book getOne(@PathVariable Long id) {
        Book book = service.getBook(id);
        return book;
    }

    @DeleteMapping("/{id}")
    public void deleteAuthor(@PathVariable Long id) {
        service.deleteBook(id);
    }

    @PostMapping()
    public void createBook(@RequestBody Book book) {
        service.saveBook(book);
    }

    @PatchMapping("/{id}")
    public void updateAuthor(@RequestBody Book book, @PathVariable Long id) {
        service.updateBook(book);
    }
}
