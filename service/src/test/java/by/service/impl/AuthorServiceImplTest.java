package by.service.impl;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.AuthorImage;
import by.tsarenkov.db.repository.AuthorImageRepository;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import by.tsarenkov.service.util.PictureLoader;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

@MockitoSettings(strictness = Strictness.LENIENT)
public class AuthorServiceImplTest {

    @InjectMocks
    private AuthorServiceImpl authorService;
    @Mock
    private PictureLoader pictureLoader;
    @Mock
    private AuthorRepository authorRepository;
    @Mock
    private AuthorImageRepository imageRepository;

    private Long id = 1L;

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

    private AuthorImage authorImage = AuthorImage.builder()
            .id(1L)
            .imageContent("image_code")
            .build();

    @Test
    void shouldThrowAuthorAlreadyExistsExceptionDuringSaving() {
        given(authorRepository.existsByPseudonym(author.getPseudonym()))
                .willReturn(true);
        assertThatThrownBy(() -> authorService.saveAuthor(author, null))
                .isInstanceOf(AuthorAlreadyExistsException.class);
    }

    @Test
    void shouldSaveAuthorWithImage()
            throws AuthorAlreadyExistsException {
        given(authorRepository.existsByPseudonym(author.getPseudonym())).willReturn(false);
        given(pictureLoader.loadPicture(image)).willReturn(authorImage.getImageContent());
        given(imageRepository.save(authorImage)).willReturn(authorImage);
        given(authorRepository.save(author)).willReturn(author);
        authorService.saveAuthor(author, image);
        assertThat(author.getImage()
                .getImageContent()).isEqualTo(authorImage.getImageContent());
    }

    @Test
    void shouldSaveAuthorWithoutImage()
            throws AuthorAlreadyExistsException {
        given(authorRepository.existsByPseudonym(author.getPseudonym())).willReturn(false);
        given(imageRepository.save(authorImage)).willReturn(authorImage);
        given(authorRepository.save(author)).willReturn(author);
        authorService.saveAuthor(author, null);
        assertThat(author.getImage().getImageContent()).isNull();
    }

    @Test
    void shouldUpdateAuthorWithImage()
            throws AuthorAlreadyExistsException{
        author.setImage(authorImage);
        author.setId(id);
        String newImage = "new Image";
        given(authorRepository.existsByPseudonymAndIdIsNot(author.getPseudonym(), id)).willReturn(false);
        given(pictureLoader.loadPicture(image)).willReturn(newImage);
        given(imageRepository.save(authorImage)).willReturn(authorImage);
        given(authorRepository.save(author)).willReturn(author);
        authorService.updateAuthor(author, image);
        assertThat(author.getImage().getImageContent()).isEqualTo(newImage);
    }

    @Test
    void shouldThrowAuthorAlreadyExistsExceptionDuringUpdating() {
        author.setId(id);
        given(authorRepository.existsByPseudonymAndIdIsNot(author.getPseudonym(), id))
                .willReturn(true);
        assertThatThrownBy(() -> authorService.updateAuthor(author, null))
                .isInstanceOf(AuthorAlreadyExistsException.class);
    }
}
