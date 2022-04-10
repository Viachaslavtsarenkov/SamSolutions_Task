package by.tsarenkov.common.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.sun.istack.NotNull;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "author")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Author  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_author", unique = true)
    private Long id;
    @Column(name = "pseudonym")
    @NotNull
    private String pseudonym;
    @Column(name = "description", length = 1200)
    @NotNull
    private String description;
    @ManyToMany(mappedBy = "authors", fetch = FetchType.EAGER)
    @ToString.Exclude
    @JsonIgnoreProperties(value = {"authors", "discounts, image"}, allowSetters = true)
    private Set<Book> books = new HashSet<>();
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, orphanRemoval = true)
    @JoinColumn(name = "id_image")
    private AuthorImage image;
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Author author = (Author) o;
        return id.equals(author.id) && pseudonym.equals(author.pseudonym)
                && Objects.equals(description, author.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, pseudonym, description);
    }
}
