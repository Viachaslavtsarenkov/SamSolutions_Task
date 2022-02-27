package by.tsarenkov.service;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.service.exception.AuthorAlreadyExists;
import by.tsarenkov.service.exception.NoSuchAuthorException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface AuthorService {
    void saveAuthor(AuthorDto authorDto, MultipartFile image) throws AuthorAlreadyExists;
    void deleteAuthor(Long id);
    void updateAuthor(Author author, MultipartFile image);
    Author getAuthor(Long id) throws NoSuchAuthorException;
    List<Author> getAllAuthors();
    List<Author> findAuthor(String name);
}
