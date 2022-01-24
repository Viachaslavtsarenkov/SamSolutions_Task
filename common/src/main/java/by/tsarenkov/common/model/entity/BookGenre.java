package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Genre;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_genre")
    private int id;
    @Column(name = "genre")
    private Genre genre;
    @ManyToMany
    @JoinTable(name = "book_genre",
            joinColumns = @JoinColumn(name = "id_genre"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private Collection<Book> books;
}
