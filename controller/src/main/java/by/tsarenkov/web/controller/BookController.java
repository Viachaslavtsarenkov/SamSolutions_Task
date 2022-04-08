package by.tsarenkov.web.controller;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.payload.BookPageResponse;
import by.tsarenkov.common.model.specification.builder.BookSpecificationBuilder;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.exception.BookNotFoundException;
import by.tsarenkov.web.controller.response.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class BookController {

    private static final String BOOK_MAPPING = "/books";
    private static final String BOOK_MAPPING_BY_ID = "/books/{id}";
    private static final String PRICE_SORT_FIELD = "price";
    private final BookService service;
    private final BookRepository repository;


    @GetMapping(BOOK_MAPPING)
    public ResponseEntity<?> getBooks(@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
                                      @RequestParam(value = "order", required = false) String order,
                                      @RequestParam(value = "size", required = false, defaultValue = "10") Integer size,
                                      @RequestParam(value = "sortby", required = false, defaultValue = "price") String sortBy,
                                      @RequestParam(value = "search", required = false) String search) {

        BookSpecificationBuilder builder = new BookSpecificationBuilder();
        Pattern pattern = Pattern.compile("(\\w+?)(:|<>|~)(\\w+?),");
        Matcher matcher = pattern.matcher(search + ",");
        while (matcher.find()) {
            builder.with(matcher.group(1), matcher.group(2), matcher.group(3));
        }

        Specification<Book> spec = builder.build();
        List<Sort.Order> sorts = new ArrayList<>();
        String sortField;

        if (sortBy != null) {
            sortField = sortBy;
        } else {
            sortField = PRICE_SORT_FIELD;
        }
        if (order == null || order.equals("ASC")) {
            sorts.add(new Sort.Order(Sort.Direction.ASC, sortField));
        } else {
            sorts.add(new Sort.Order(Sort.Direction.DESC, sortField));
        }
        BookPageResponse books = service.findAllBook(spec, page, Sort.by(sorts));
        return ResponseEntity.ok().body(
                books);
    }

    @GetMapping(BOOK_MAPPING_BY_ID)
    public Book getOne(@PathVariable Long id)
            throws BookNotFoundException {
        return service.getBook(id);
    }

    @DeleteMapping(BOOK_MAPPING_BY_ID)
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
    }

    @PostMapping(value = BOOK_MAPPING, consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createBook(@RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart("book") Book book) {

        book = service.saveBook(book, image);
        return ResponseEntity.ok(new MessageResponse(book.getId().toString()));
    }

    @PostMapping(value = BOOK_MAPPING_BY_ID, consumes = {"multipart/form-data"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateBook(@RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart("book") Book book) {
        service.updateBook(book, image);
        return ResponseEntity.ok("book is updated");
    }

    @GetMapping("/books/search")
    public ResponseEntity<?> findBookByAuthorOrId(@RequestParam("searchString") String searchString) {
        return ResponseEntity.ok()
                .body(service.findBooksByNameOrId(searchString));
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCart(@RequestParam("books") String books) {
        Set<Long> bookList = Arrays.stream(books.split("\\*"))
                .filter(s -> !s.equals(""))
                .mapToLong(Long::parseLong)
                .boxed()
                .collect(Collectors.toSet());
        return ResponseEntity.ok().body(service.getCart(bookList));
    }
}
