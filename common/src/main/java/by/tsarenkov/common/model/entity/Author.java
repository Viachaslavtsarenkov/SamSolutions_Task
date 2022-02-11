package by.tsarenkov.common.model.entity;

import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "author")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Author  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_author", unique = true)
    private Long id;
    @Column(name = "pseudonym")
    private String pseudonym;
    @Column(name = "description")
    private String description;
    @Column(name="image_name")
    private String imageName;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "author_book",
            joinColumns = @JoinColumn(name = "id_author"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private List<Book> books = new ArrayList<>();;
}
