package by.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.db.repository.AuthorRepository;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.exception.AuthorAlreadyExistsException;
import by.tsarenkov.service.impl.BookServiceImpl;
import by.tsarenkov.service.util.PictureLoader;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.exceptions.base.MockitoException;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;

@MockitoSettings(strictness = Strictness.LENIENT)
public class BookServiceImplTest {

    @InjectMocks
    private BookServiceImpl bookService;
    @Mock
    private PictureLoader pictureLoader;
    @Mock
    private BookRepository bookRepository;

    private final MultipartFile image =  new MockMultipartFile(
            "file",
            "hello.txt",
            MediaType.TEXT_PLAIN_VALUE,
            "Hello, World!".getBytes()
    );


    private Long id = 1L;
    private static final String DEFAULT_FILE_PATH = "/images/default.jpg";
    private static final String IMAGE_FILE_PATH = "/images/SDGFDDGSG.jpg";

    private Book book = Book.builder()
            .name("Nineteen Eighty-Four")
            .description("This article is about the 1949 novel by George Orwell")
            .amountPages(123)
            .price(11.11)
            .materialCover("soft")
            .publishedYear(2012)
            .build();

    @Test
    void shouldSetBookDefaultImageName() {
        given(pictureLoader.loadPicture(null, book.getImageName()))
                .willReturn(DEFAULT_FILE_PATH);
        when(bookRepository.save(book)).thenReturn(book);
        bookService.saveBook(book, null);
        assertThat(book.getImageName()).isEqualTo(DEFAULT_FILE_PATH);
    }

    @Test
    void shouldSetBookImageName() {
        given(pictureLoader.loadPicture(image, book.getImageName())).willReturn(IMAGE_FILE_PATH);
        when(bookRepository.save(book)).thenReturn(book);
        bookService.saveBook(book, image);
        assertThat(book.getImageName()).isEqualTo(IMAGE_FILE_PATH);
    }

}
