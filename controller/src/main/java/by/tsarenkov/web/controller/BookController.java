package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.impl.BookServiceImpl;
import by.tsarenkov.web.controller.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class BookController {

    private static final String BOOK_MAPPING = "/books";
    private static final String BOOK_MAPPING_BY_ID = "/books/{id}";
    private BookService service;

    @Autowired
    public void setService(BookServiceImpl service) {
        this.service = service;
    }

    @GetMapping(BOOK_MAPPING)
    public List<Book> getBooks() {
        List<Book> books = service.getAllBook();
        return books;
    }

    @GetMapping(BOOK_MAPPING_BY_ID)
    public Book getOne(@PathVariable Long id) {
        Book book = service.getBook(id);
        return book;
    }

    @DeleteMapping(BOOK_MAPPING_BY_ID)
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }

    @PostMapping(value = BOOK_MAPPING,consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBook(@RequestPart(value = "image", required = false) MultipartFile image,
                                     @RequestPart("book") Book book) {
        service.saveBook(book, image);
        return ResponseEntity.ok(new MessageResponse("book is created"));
    }

    @PostMapping(value = BOOK_MAPPING_BY_ID, consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateBook(@RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart("book") Book book) {
        service.updateBook(book, image);
        return ResponseEntity.ok("book is updated");
    }
}
