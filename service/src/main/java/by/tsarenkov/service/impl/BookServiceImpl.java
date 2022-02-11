package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;

    @Autowired
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public void saveBook(Book book) {

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
        //return bookRepository.findById(id);
        return null;
    }

    @Override
    public List<Book> getAllBook() {
        return (List<Book>) bookRepository.findAll();
    }
}
