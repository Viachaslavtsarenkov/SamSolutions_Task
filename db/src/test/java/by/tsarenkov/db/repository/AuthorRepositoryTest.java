package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.AuthorImage;
import by.tsarenkov.db.config.JpaTestConfig;
import junit.framework.Assert;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
public class AuthorRepositoryTest {

    @Autowired
    private AuthorRepository authorRepository;

    private final AuthorImage image = AuthorImage.builder()
            .id(1L)
            .imageContent("image")
            .build();

    private final Author author = Author.builder()
            .pseudonym("Pushkin")
            .description("Russian poet")
            .build();


    @Test
    public void ShouldSaveAuthor() {
        authorRepository.save(author);
        Long id = author.getId();
        author.setImage(image);
        Author insertAuthor = authorRepository.findById(id).get();
        Assertions.assertEquals(author.getPseudonym(), insertAuthor.getPseudonym());
    }

    @Test
    public void ShouldUpdateAuthor() {
        String newDescription = "He was born in 1799";
        author.setDescription(newDescription);
        authorRepository.save(author);
        Assertions.assertEquals(authorRepository
                .findById(author.getId()).get().getDescription(), newDescription);
    }

    @Test
    public void ShouldCheckExistingAuthorByPseudonym() {
        Assertions.assertTrue(authorRepository.
                existsByPseudonym(author.getPseudonym()));
    }

    @Test
    public void ShouldCheckNotExistingAuthorByPseudonym() {
        Assertions.assertFalse(authorRepository.
                existsByPseudonym("King"));
    }

    @Test
    public void ShouldCheckExistingAuthorPseudonym() {
        authorRepository.save(author);
        Assertions.assertTrue(authorRepository
                .existsByPseudonymIgnoreCaseAndIdIsNot(author.getPseudonym()
                , author.getId()));
    }

    @Test
    public void ShouldCheckNotExistingAuthorPseudonym() {
        authorRepository.save(author);
        Assertions.assertTrue(authorRepository
                .existsByPseudonymIgnoreCaseAndIdIsNot(author.getPseudonym()
                        , author.getId() + 1));
    }
}
