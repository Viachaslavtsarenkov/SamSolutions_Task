package by.tsarenkov.common.model.payload;

import by.tsarenkov.common.model.entity.Author;
import by.tsarenkov.common.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserPageResponse {
    private List<User> user;
    private Integer totalPages;
}
