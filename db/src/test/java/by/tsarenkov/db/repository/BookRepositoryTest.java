package by.tsarenkov.db.repository;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.AuthorImage;
import by.tsarenkov.common.model.entity.Book;
import by.tsarenkov.common.model.entity.BookImage;
import by.tsarenkov.db.config.JpaTestConfig;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.HashSet;
import java.util.Set;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
@WebAppConfiguration
public class BookRepositoryTest {

    @Autowired
    private BookRepository bookRepository;

    private final Book testBook = Book.builder()
            .name("The queen's Gambit")
            .description("")
            .amountPages(12)
            .inStock(true)
            .materialCover("soft")
            .price(123.45)
            .weight(123.3)
            .build();

    @Test
    public void ShouldSaveBook() {
        Set<Author> authorsList = new HashSet<>();
        BookImage image = BookImage.builder()
                .id(1L).imageContent("image")
                .build();
        image.setImageContent("image");
        testBook.setImage(image);
        testBook.setAuthors(authorsList);
        bookRepository.save(testBook);
        Assertions.assertEquals(testBook.getId(),
                bookRepository.findById(testBook.getId()).get().getId());
    }
}
