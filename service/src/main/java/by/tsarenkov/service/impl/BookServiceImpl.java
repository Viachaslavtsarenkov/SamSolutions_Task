package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.BookService;
import by.tsarenkov.service.exception.NoSuchAuthorException;
import by.tsarenkov.service.util.CodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    private String FILE_PATH = "/images/%s.jpg";
    private String DEFAULT_FILE_PATH = "/images/default.jpg";

    @Autowired
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void saveBook(Book book, MultipartFile image) {
        File dest;
        try {
            if(image.getSize() == 0L) {
                book.setImageName(DEFAULT_FILE_PATH);
            } else {
                String fileBookName = CodeGenerator.generateCode();
                book.setImageName(String.format(FILE_PATH, fileBookName));
                dest = new File(book.getImageName());
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
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public void updateBook(Book book) {
        bookRepository.save(book);
    }

    @Override
    public Book getBook(Long id) {
        Book book = null;
        try {
            book = Optional.of(bookRepository.findById(id)).get().orElseThrow();
        } catch (NoSuchElementException e ) {
            //throw new NoSuchBookException();
            e.printStackTrace();
        }
        return book;
    }

    @Override
    public List<Book> getAllBook() {
        return (List<Book>) bookRepository.findAll();
    }
}
