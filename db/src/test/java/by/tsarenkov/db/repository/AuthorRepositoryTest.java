package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.db.config.JpaTestConfig;
import junit.framework.Assert;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Optional;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
@WebAppConfiguration
public class AuthorRepositoryTest {

    @Autowired
    private AuthorRepository authorRepository;

    private Author author = Author.builder()
            .pseudonym("Pushkin")
            .description("Russian poet")
            .build();


    @Test
    public void ShouldSaveAuthor() {
        authorRepository.save(author);
        Long id = author.getId();
        Author insertAuthor = authorRepository.findById(id).get();
        Assertions.assertEquals(author.getPseudonym(), insertAuthor.getPseudonym());
    }

    @Test
    public void ShouldCheckExistingAuthorByPseudonym() {
        Assertions.assertTrue(authorRepository.
                existsByPseudonym(author.getPseudonym()));
    }

    @Test
    public void ShouldCheckExistingAuthorPseudonym() {
        Assertions.assertTrue(authorRepository
                .existsByPseudonymAndIdIsNot(author.getPseudonym()
                , 2L));
    }
}
