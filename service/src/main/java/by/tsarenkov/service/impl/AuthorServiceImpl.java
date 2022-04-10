package by.tsarenkov.service.impl;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.AuthorImage;
import by.tsarenkov.common.model.payload.AuthorPageResponse;
import by.tsarenkov.db.repository.AuthorImageRepository;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.constants.MessageResponse;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.exception.AuthorNotFoundException;
import by.tsarenkov.service.util.CodeGenerator;
import by.tsarenkov.service.util.PictureLoader;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import static by.tsarenkov.service.constants.LogMessage.*;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final AuthorImageRepository authorImageRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthorService.class);
    private final PictureLoader pictureLoader;

    @Override
    @Transactional
    public Author saveAuthor(Author author, MultipartFile image) throws AuthorAlreadyExistsException {

        if(authorRepository.existsByPseudonym(author.getPseudonym())) {
            throw new AuthorAlreadyExistsException(MessageResponse.AUTHOR_ALREADY_EXIST);
        }

        AuthorImage authorImage;

        if(image != null) {
            String fileName = pictureLoader.loadPicture(image);
            authorImage = AuthorImage.builder()
                    .imageContent(fileName)
                    .build();
        } else {
            authorImage = new AuthorImage();
        }
        authorImageRepository.save(authorImage);
        author.setImage(authorImage);
        authorRepository.save(author);
        LOGGER.warn(String.format(LOG_CREATED_MSG, "Author", author.getId()));
        return author;
    }

    @Override
    @Transactional
    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
        LOGGER.warn(String.format(LOG_DELETED_MSG, "Author", id));
    }

    @Override
    @Transactional
    public void updateAuthor(Author author, MultipartFile image)
            throws AuthorAlreadyExistsException {

        if(authorRepository.existsByPseudonymIgnoreCaseAndIdIsNot(author.getPseudonym(), author.getId())) {
            throw new AuthorAlreadyExistsException(MessageResponse.AUTHOR_ALREADY_EXIST);
        }

        if(image != null) {
            String file = pictureLoader.loadPicture(image);
            AuthorImage authorImage = author.getImage();
            authorImage.setImageContent(file);
            authorImageRepository.save(authorImage);
        }

        authorRepository.save(author);
        LOGGER.warn(String.format(LOG_UPDATED_MSG, "Author", author.getId()));
    }

    @Override
    @Transactional
    public Author getAuthor(Long id) throws AuthorNotFoundException {
        Author author = Optional.of(authorRepository.findById(id)).get()
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
        return authorRepository.findAuthorByPseudonymIgnoreCaseContaining(pseudonym);
    }
}
