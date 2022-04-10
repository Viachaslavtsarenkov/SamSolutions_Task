package by.tsarenkov.db.repository;


import by.tsarenkov.common.model.entity.AuthorImage;
import by.tsarenkov.common.model.entity.BookImage;
import by.tsarenkov.db.config.JpaTestConfig;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = { JpaTestConfig.class })
@WebAppConfiguration
public class BookImageRepositoryTest {

    @Autowired
    private BookImageRepository imageRepository;


    private final BookImage image = BookImage.builder()
            .imageContent("image")
            .build();

    @Test
    public void ShouldSaveAuthorImage() {
        imageRepository.save(image);
        Assertions.assertEquals(image.getId(),
                imageRepository.findById(image.getId()).get().getId());
    }

    @Test
    public void ShouldUpdateAuthorImage() {
        String newImage = "new image";
        image.setImageContent(newImage);
        imageRepository.save(image);
        Assertions.assertEquals(image.getImageContent(),
                imageRepository.findById(image.getId()).get().getImageContent());
    }
}
