package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorServiceImpl implements AuthorService {

    private AuthorRepository authorRepository;
    @Autowired
    public void setAuthorRepository(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public void saveAuthor(Author author) {
        authorRepository.save(author);
    }

    @Override
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }

    @Override
    public void updateAuthor(Author author) {
        authorRepository.save(author);
    }

    @Override
    public Author getAuthor(Long id) {
      //return  authorRepository.findById(id);
        return null;
    }

    @Override
    public List<Author> getAllAuthors() {
        List<Author> authors = new ArrayList<>();
        authorRepository.findAll().forEach(authors::add);
        return authors;
    }
}
