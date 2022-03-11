package by.tsarenkov.common.model.payload;

import by.tsarenkov.common.model.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class BookPageResponse {
    List<Book> books;
    Integer totalPages;
}
