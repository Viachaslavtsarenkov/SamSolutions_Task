package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.impl.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }

    @PostMapping()
    @PreAuthorize("hasRole('ADMIN')")
    public void createBook(@RequestPart("image") MultipartFile image,
                           @RequestPart("author") Book book) {
        service.saveBook(book, image);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateBook(@RequestBody Book book, @PathVariable Long id) {
        service.updateBook(book);
    }
}
