package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.User;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    AuthorRepository authorRepository;

    @Override
    public void saveAuthor(Author author) {
        System.out.println("from service");
        System.out.println(authorRepository.save(author));
    }

    @Override
    public void deleteAuthor(Author author) {
       // repository.delete(author);
    }

    @Override
    public void updateAuthor(Author author) {
      //  repository.saveAndFlush(author);
    }

    @Override
    public Author getAuthor(long id) {
      //  return repository.getOne(id);
        return null;
    }
}
