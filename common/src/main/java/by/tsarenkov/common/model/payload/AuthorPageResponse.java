package by.tsarenkov.common.model.payload;

import by.tsarenkov.common.model.entity.Author;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class AuthorPageResponse {
    private List<Author> authors;
    private Integer totalPages;
}
