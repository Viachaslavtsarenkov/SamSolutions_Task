package by.service.impl;

import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.BookImage;
import by.tsarenkov.db.repository.BookImageRepository;
import by.tsarenkov.db.repository.BookRepository;
import by.tsarenkov.service.impl.BookServiceImpl;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@MockitoSettings(strictness = Strictness.LENIENT)
public class BookServiceImplTest {

    @InjectMocks
    private BookServiceImpl bookService;
    @Mock
    private PictureLoader pictureLoader;
    @Mock
    private BookRepository bookRepository;
    @Mock
    private BookImageRepository imageRepository;

    private final MultipartFile image =  new MockMultipartFile(
            "file",
            "hello.txt",
            MediaType.TEXT_PLAIN_VALUE,
            "Hello, World!".getBytes()
    );


    private Long id = 1L;

    private Book book = Book.builder()
            .name("Nineteen Eighty-Four")
            .description("This article is about the 1949 novel by George Orwell")
            .amountPages(123)
            .price(11.11)
            .materialCover("soft")
            .publishedYear(2012)
            .build();

    private BookImage bookImage = BookImage.builder()
            .imageContent("picture_code").build();

    @Test
    void shouldSaveBookWithoutImage() {
        bookImage.setImageContent(null);
        given(imageRepository.save(any())).willReturn(bookImage);
        given(bookRepository.save(book)).willReturn(book);
        bookService.saveBook(book, null);
        verify(bookRepository).save(book);
        assertThat(book.getImage().getImageContent()).isNull();
    }

    @Test
    void shouldSaveBookWithImage() {
        given(pictureLoader.loadPicture(image)).willReturn(bookImage.getImageContent());
        given(imageRepository.save(any())).willReturn(bookImage);
        given(bookRepository.save(book)).willReturn(book);
        bookService.saveBook(book, image);
        verify(pictureLoader).loadPicture(image);
        verify(imageRepository).save(any());
        verify(bookRepository).save(book);
        assertThat(book.getImage().getImageContent()).isEqualTo(bookImage.getImageContent());
    }

    @Test
    void shouldUpdateBookWithoutImage() {
        book.setImage(bookImage);
        bookImage.setImageContent(null);
        given(imageRepository.save(any())).willReturn(bookImage);
        given(bookRepository.save(book)).willReturn(book);
        bookService.updateBook(book, null);
        verify(bookRepository).save(book);
        assertThat(book.getImage().getImageContent()).isNull();
    }

    @Test
    void shouldUpdateBookWithImage() {
        book.setId(id);
        book.setImage(bookImage);
        String newImage = "encode_new_image";
        given(pictureLoader.loadPicture(image)).willReturn(newImage);
        given(bookRepository.save(book)).willReturn(book);
        bookService.updateBook(book, image);
        verify(pictureLoader).loadPicture(image);
        verify(bookRepository).save(book);
        assertThat(book.getImage().getImageContent()).isEqualTo(bookImage.getImageContent());
    }

}
