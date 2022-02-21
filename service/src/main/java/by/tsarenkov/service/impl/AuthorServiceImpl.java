package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.UserDetailsImpl;
import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.exception.NoSuchAuthorException;
import by.tsarenkov.service.security.SecurityContextService;
import by.tsarenkov.service.util.CodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    private AuthorRepository authorRepository;
    private String FILE_PATH = "/images/%s.jpg";
    private String DEFAULT_FILE_PATH = "/images/default.jpg";
    @Autowired
    SecurityContextService securityContextService;

    @Autowired
    public void setAuthorRepository(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    public void saveAuthor(AuthorDto authorDto, MultipartFile image) {

        Author author = Author.builder()
                .pseudonym(authorDto.getPseudonym())
                .description(authorDto.getDescription())
                .build();
        File dest;
        try {
            if(image.getSize() == 0L) {
                author.setImageName(DEFAULT_FILE_PATH);
            } else {
                String fileName = CodeGenerator.generateCode();
                author.setImageName(String.format(FILE_PATH, fileName));
                dest = new File(author.getImageName());
                image.transferTo(dest);
            }
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        authorRepository.save(author);
    }

    @Override
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }

    @Override
    public void updateAuthor(Author author, MultipartFile image) {

        File dest;
        try {
            if(image.getSize() != 0L) {
                String fileName = CodeGenerator.generateCode();
                dest = new File(String.format(FILE_PATH, fileName));
                author.setImageName(fileName);
                image.transferTo(dest);
            }
        } catch (IllegalStateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        authorRepository.save(author);
    }

    @Override
    public Author getAuthor(Long id) throws NoSuchAuthorException {
        Author author;
        try {
            author = Optional.of(authorRepository.findById(id)).get().orElseThrow();
        } catch (NoSuchElementException e ) {
            throw new NoSuchAuthorException();
        }

        return author;
    }

    @Override
    public List<Author> getAllAuthors() {
        List<Author> authors = new ArrayList<>();
        authorRepository.findAll().forEach(authors::add);
        return authors;
    }

    @Override
    public List<Author> findAuthor(String pseudonym) {
        return  authorRepository.findAuthorByPseudonymContaining(pseudonym);
    }
}
