package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Genre;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "genre")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class BookGenre {
    @Id
    @Enumerated
    @Column(name = "genre")
    private Genre genre;
    @ManyToMany(mappedBy = "genres", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Book> genreBooks = new ArrayList<>();
}
