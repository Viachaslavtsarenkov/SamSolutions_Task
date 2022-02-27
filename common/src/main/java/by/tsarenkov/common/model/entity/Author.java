package by.tsarenkov.common.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @ManyToMany(mappedBy = "authors", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Book> books = new ArrayList<>();
}
