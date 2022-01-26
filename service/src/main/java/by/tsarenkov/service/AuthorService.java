package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Author;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AuthorService {
    void saveAuthor(Author author);
    void deleteAuthor(Long id);
    void updateAuthor(Author author);
    Author getAuthor(Long id);
    List<Author> getAllAuthors();
}
