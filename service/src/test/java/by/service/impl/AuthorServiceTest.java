package by.service.impl;

import by.tsarenkov.common.model.dto.AuthorDto;
import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

@RunWith(MockitoJUnitRunner.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class AuthorServiceTest {

    @InjectMocks
    private AuthorServiceImpl authorService;
    @Mock
    private AuthorRepository authorRepository;



    private Long id = 1L;
    private static final String DEFAULT_FILE_PATH = "/images/default.jpg";

    private Author author = Author.builder()
            .pseudonym("Pushkin")
            .description("He was born in 1799")
            .build();

    private final MultipartFile image =  new MockMultipartFile(
            "file",
            "hello.txt",
            MediaType.TEXT_PLAIN_VALUE,
            "Hello, World!".getBytes()
    );


    @Test()
    void shouldThrowAuthorAlreadyExistsException()
            throws AuthorAlreadyExistsException {
        given(authorRepository.existsByPseudonym(author.getPseudonym()))
                .willReturn(true);
        assertThatThrownBy(() -> authorService.saveAuthor(author, null))
                .isInstanceOf(AuthorAlreadyExistsException.class);

    }

    @Test
    void shouldThrowAuthorAlreadyExistExceptionUpdate()
            throws AuthorAlreadyExistsException {
     /*          .willReturn(true);
        author.setImageName(DEFAULT_FILE_PATH);
        assertThatThrownBy(() -> authorService.updateAuthor(author, null))
                .isInstanceOf(AuthorAlreadyExistsException.class);
        Assertions.assertNotEquals(author.getImageName(), DEFAULT_FILE_PATH);*/
    }

    @Test
    void shouldSetAuthorDefaultImageName()
            throws AuthorAlreadyExistsException {
        given(authorRepository.existsByPseudonym(author.getPseudonym())).willReturn(false);
        authorService.saveAuthor(author, null);
        assertThat(author.getImageName()).isEqualTo(DEFAULT_FILE_PATH);
    }

    @Test
    void shouldSaveAuthorWithImage()
            throws AuthorAlreadyExistsException {
        given(authorRepository.existsByPseudonym(author.getPseudonym())).willReturn(false);
        authorService.saveAuthor(author, image);
        assertThat(author.getImageName()).isNotEqualTo(DEFAULT_FILE_PATH);
    }

}
