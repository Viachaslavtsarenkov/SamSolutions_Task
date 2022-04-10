package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.BookImage;
import by.tsarenkov.common.model.entity.Discount;
import by.tsarenkov.common.model.payload.BookPageResponse;
import by.tsarenkov.db.repository.BookImageRepository;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.exception.BookNotFoundException;
import by.tsarenkov.service.util.PictureLoader;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Date;
import java.util.*;
import java.util.stream.Collectors;

import static by.tsarenkov.service.constants.LogMessage.LOG_CREATED_MSG;
import static by.tsarenkov.service.constants.LogMessage.LOG_UPDATED_MSG;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BookServiceImpl.class);

    private final BookRepository bookRepository;
    private final BookImageRepository bookImageRepository;
    private final PictureLoader pictureLoader;


    @Override
    @Transactional
    public Book saveBook(Book book, MultipartFile image) {
        BookImage bookImage;
        if(image != null) {
            String file = pictureLoader.loadPicture(image);
            bookImage = BookImage.builder()
                    .imageContent(file)
                    .build();
        } else {
            bookImage = BookImage.builder()
                    .build();
        }
        bookImage = bookImageRepository.save(bookImage);
        book.setImage(bookImage);
        book = bookRepository.save(book);
        LOGGER.warn(String.format(LOG_CREATED_MSG, "Book", book.getId()));
        return book;
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {
        bookRepository.changeInStockStatus(false, id);
    }

    @Override
    @Transactional
    public void updateBook(Book book, MultipartFile image) {
        if(image != null) {
            BookImage bookImage = book.getImage();
            String file = pictureLoader.loadPicture(image);
            bookImage.setImageContent(file);
            bookImageRepository.save(bookImage);
            System.out.println("sadfghjkgfdsafghykjljhgfdsfghjkljhgfdsafgjk");
        }
        bookRepository.save(book);
        LOGGER.warn(String.format(LOG_UPDATED_MSG, "Book", book.getId()));
    }

    @Override
    @Transactional
    public Book getBook(Long id) throws BookNotFoundException {
        Book book = Optional.of(bookRepository.findById(id)).get()
                .orElseThrow(BookNotFoundException::new);
        checkActualDiscount(book);
        return book;
    }

    @Override
    @Transactional
    public BookPageResponse findAllBook(Specification<Book> spec, int page, Sort sort) {
        Page<Book> books = bookRepository.findAll(spec, PageRequest.of(page, 8, sort));
        books.getContent()
                .forEach(this::checkActualDiscount);
        return new BookPageResponse(books.getContent(), books.getTotalPages());
    }

    @Override
    public List<Book> findBooksByNameOrId(String searchString) {
        List<Book> bookList = bookRepository
                .findBookByNameIgnoreCaseContaining(searchString);
        bookList.forEach(this::checkActualDiscount);
        return  bookList;
    }

    private void checkActualDiscount(Book book) {
        Date date = new Date(Calendar
                .getInstance()
                .getTime()
                .getTime());
        Set<Discount> discounts = book.getDiscounts()
                .stream()
                .filter(discount -> discount.getStartDate().getTime() < date.getTime()
                        && date.getTime() < discount.getEndDate().getTime())
                .collect(Collectors.toSet());
        if(discounts.size() > 0) {
            book.setDiscountPrice(BigDecimal.valueOf(book.getPrice()
                    * (1 - discounts.stream().findFirst().get()
                    .getDiscountFactor())).setScale(2, RoundingMode.HALF_UP)
                    .doubleValue());
        }
        book.setDiscounts(discounts);
    }

    @Override
    @Transactional
    public List<Book> getCart(Set<Long> books) {
        List<Book> bookList = bookRepository.findAllByIdIn(books);
        bookList.forEach(this::checkActualDiscount);
        return bookList;
    }
}
