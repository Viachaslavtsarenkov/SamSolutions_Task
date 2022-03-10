package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.payload.BookPageResponse;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.exception.BookNotFountException;
import by.tsarenkov.service.util.CodeGenerator;
import by.tsarenkov.service.util.PictureLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;
    @Autowired
    private PictureLoader pictureLoader;

    private String FILE_PATH = "/images/%s.jpg";
    private String DEFAULT_FILE_PATH = "/images/default.jpg";

    @Autowired
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    @Transactional
    public void saveBook(Book book, MultipartFile image) {
        String fileName = pictureLoader.loadPicture(image, book.getImageName());
        book.setImageName(fileName);
        bookRepository.save(book);
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateBook(Book book, MultipartFile image) {
        File dest;
        try {
            if(image != null) {
                String fileName;
                if(book.getImageName().equals(DEFAULT_FILE_PATH)) {
                    fileName = String.format(FILE_PATH, CodeGenerator.generateCode());
                } else {
                    fileName = book.getImageName();
                }

                dest = new File(fileName);
                book.setImageName(fileName);
                image.transferTo(dest);
            }
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        bookRepository.save(book);
    }

    @Override
    @Transactional
    public Book getBook(Long id) throws BookNotFountException {
        Book book = null;
        book = Optional.of(bookRepository.findById(id)).get()
                .orElseThrow(BookNotFountException::new);
        System.out.println(book);
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
