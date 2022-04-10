package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Genre;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "genre")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BookGenre {

    @Id
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "id_genre")
    private Genre id;
    @Column(name = "genre")
    private Genre genre;
    @ManyToMany(mappedBy = "genres")
    @JsonIgnore
    @ToString.Exclude
    private List<Book> books = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BookGenre bookGenre = (BookGenre) o;
        return id == bookGenre.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
