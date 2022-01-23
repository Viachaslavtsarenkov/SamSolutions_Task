package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.db.AuthorRepository;
import by.tsarenkov.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {

    @Autowired
    private AuthorRepository repository;

    @Override
    public void saveAuthor(Author author) {
        repository.save(author);
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
