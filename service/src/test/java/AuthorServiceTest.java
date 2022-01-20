import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.service.AuthorService;
import by.tsarenkov.service.impl.AuthorServiceImpl;
import org.junit.BeforeClass;
import org.junit.Test;


public class AuthorServiceTest {

    static AuthorService authorService = new AuthorServiceImpl();
    static Author author;

    @BeforeClass
    public static void initList() {
        author = Author.builder().name("Александр")
                .patronymic("Сергеевич")
                .surname("Пушкин").build();
    }

    @Test
    public void saveAuthor() {
        //authorService.saveAuthor(author);
    }
}
