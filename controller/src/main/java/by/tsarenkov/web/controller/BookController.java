package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.payload.BookPageResponse;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.exception.BookNotFountException;
import by.tsarenkov.service.impl.BookServiceImpl;
import by.tsarenkov.web.controller.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BookController {

    private static final String BOOK_MAPPING = "/books";
    private static final String BOOK_MAPPING_BY_ID = "/books/{id}";
    private BookService service;
    private static final String PRICE_SORT_FIELD = "price";

    @Autowired
    public void setService(BookServiceImpl service) {
        this.service = service;
    }

    @GetMapping(BOOK_MAPPING)
    public ResponseEntity<?> getBooks(@RequestParam(value = "page", required = false) Integer page,
                               @RequestParam(value = "order", required = false) String order,
                               @RequestParam(value = "size", required = false) Integer size,
                               @RequestParam(value = "sortby", required = false) String sortBy) {
        List<Sort.Order> sorts= new ArrayList<>();
        String sortField = null;
        if(sortBy != null) {
            sortField = sortBy;
        } else {
            sortField = PRICE_SORT_FIELD;
        }
        if(order == null || order.equals("ASC")) {
            sorts.add(new Sort.Order(Sort.Direction.ASC, sortField));
        } else {
            sorts.add(new Sort.Order(Sort.Direction.DESC, sortField));
        }
        BookPageResponse books = service.getAllBook(page, Sort.by(sorts));
        return ResponseEntity.ok().body(books);
    }

    @GetMapping(BOOK_MAPPING_BY_ID)
    public Book getOne(@PathVariable Long id)
            throws BookNotFountException {
        Book book = service.getBook(id);
        return book;
    }

    @DeleteMapping(BOOK_MAPPING_BY_ID)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }

    @PostMapping(value = BOOK_MAPPING,consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBook(@RequestPart(value = "image", required = false) MultipartFile image,
                                     @RequestPart("book") Book book) {
        System.out.println(book);
        service.saveBook(book, image);
        return ResponseEntity.ok(new MessageResponse("book is created"));
    }

    @PostMapping(value = BOOK_MAPPING_BY_ID, consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBook(@RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart("book") Book book) {
        service.updateBook(book, image);
        return ResponseEntity.ok("book is updated");
    }
    @GetMapping("/books/search")
    public ResponseEntity<?> getBookByAuthorOrId(@RequestParam("searchString") String searchString) {
        return ResponseEntity.ok().body(service.findBooksByNameOrId(searchString));
    }
}
