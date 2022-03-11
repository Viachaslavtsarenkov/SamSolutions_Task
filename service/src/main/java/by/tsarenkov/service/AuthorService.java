package by.tsarenkov.service;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.payload.AuthorPageResponse;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.exception.AuthorNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface AuthorService {
    Author saveAuthor(Author author, MultipartFile image) throws AuthorAlreadyExistsException;
    void deleteAuthor(Long id);
    void updateAuthor(Author author, MultipartFile image)  throws AuthorAlreadyExistsException;
    Author getAuthor(Long id) throws AuthorNotFoundException;
    AuthorPageResponse getAllAuthors(int page, Sort sort);
    List<Author> findAuthor(String name);
}
