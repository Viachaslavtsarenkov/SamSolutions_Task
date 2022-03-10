package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.payload.AuthorPageResponse;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.constants.MessageResponse;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.exception.AuthorNotFoundException;
import by.tsarenkov.service.util.CodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    private AuthorRepository authorRepository;
    private String FILE_PATH = "/images/%s.jpg";
    private String DEFAULT_FILE_PATH = "/images/default.jpg";

    @Autowired
    public void setAuthorRepository(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    @Override
    @Transactional
    public Author saveAuthor(Author author, MultipartFile image) throws AuthorAlreadyExistsException {

        if(authorRepository.existsByPseudonym(author.getPseudonym())) {
            throw new AuthorAlreadyExistsException(MessageResponse.AUTHOR_ALREADY_EXIST);
        }

        File dest;
        try {
            if(image == null) {
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

        return authorRepository.save(author);
    }

    @Override
    @Transactional
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateAuthor(Author author, MultipartFile image)
            throws AuthorAlreadyExistsException {

        File dest;

        if(authorRepository.existsByPseudonymAndIdIsNot(author.getPseudonym(), author.getId())) {
            throw new AuthorAlreadyExistsException(MessageResponse.AUTHOR_ALREADY_EXIST);
        }
        try {
            if(image != null) {
                String fileName;
                if(author.getImageName().equals(DEFAULT_FILE_PATH)) {
                    fileName = String.format(FILE_PATH, CodeGenerator.generateCode());
                } else {
                    fileName = author.getImageName();
                }

                dest = new File(fileName);
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
    @Transactional
    public Author getAuthor(Long id) throws AuthorNotFoundException {
        Author author;
        author = Optional.of(authorRepository.findById(id)).get()
                .orElseThrow(AuthorNotFoundException::new);
        return author;
    }

    @Override
    @Transactional
    public AuthorPageResponse getAllAuthors(int page, Sort sort) {
        Page<Author> authors = authorRepository.findAll(PageRequest.of(page, 10, sort));
        return new AuthorPageResponse(authors.getContent(), authors.getTotalPages());
    }

    @Override
    @Transactional
    public List<Author> findAuthor(String pseudonym) {
        return authorRepository.findAuthorByPseudonymContaining(pseudonym);
    }
}
