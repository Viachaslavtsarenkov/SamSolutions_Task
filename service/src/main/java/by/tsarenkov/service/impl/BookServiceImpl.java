package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.payload.BookPageResponse;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.exception.BookNotFountException;
import by.tsarenkov.service.util.PictureLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static by.tsarenkov.service.constants.LogMessage.LOG_CREATED_MSG;
import static by.tsarenkov.service.constants.LogMessage.LOG_UPDATED_MSG;

@Service
public class BookServiceImpl implements BookService {


    private static final Logger LOGGER = LoggerFactory.getLogger(BookServiceImpl.class);

    private BookRepository bookRepository;
    @Autowired
    private PictureLoader pictureLoader;

    @Autowired
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    @Transactional
    public Book saveBook(Book book, MultipartFile image) {
        String fileName = pictureLoader.loadPicture(image, book.getImageName());
        book.setImageName(fileName);
        bookRepository.save(book);
        LOGGER.warn(String.format(LOG_CREATED_MSG, "Book", book.getId()));
        return book;
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {
        //todo change flag
        bookRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateBook(Book book, MultipartFile image) {
        String fileName = pictureLoader.loadPicture(image, book.getImageName());
        book.setImageName(fileName);
        bookRepository.save(book);
        LOGGER.warn(String.format(LOG_UPDATED_MSG, "Book", book.getId()));
    }

    @Override
    @Transactional
    public Book getBook(Long id) throws BookNotFountException {
        Book book = null;
        book = Optional.of(bookRepository.findById(id)).get()
                .orElseThrow(BookNotFountException::new);
        return book;
    }

    @Override
    @Transactional
    public BookPageResponse getAllBook(int page, Sort sort) {
        Page<Book> books = bookRepository.findAll(PageRequest.of(page, 10, sort));
        return new BookPageResponse(books.getContent(), books.getTotalPages());
    }

    @Override
    public List<Book> findBooksByNameOrId(String searchString) {
        return bookRepository
                .findBookByNameContaining(searchString);
    }

}
