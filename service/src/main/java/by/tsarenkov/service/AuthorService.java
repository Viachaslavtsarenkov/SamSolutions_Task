package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Author;
import org.springframework.stereotype.Service;

@Service
public interface AuthorService {
    void saveAuthor(Author author);
    void deleteAuthor(Author author);
    void updateAuthor(Author author);
    Author getAuthor(long id);
}
