package by.tsarenkov.common.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "image_book")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BookImage implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_image")
    private Long id;
    @Column(name = "image", length = 6681200)
    private String imageContent;
    @OneToOne(mappedBy = "image")
    @JsonIgnore
    private Book book;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookImage bookImage = (BookImage) o;
        return Objects.equals(id, bookImage.id)
                && Objects.equals(imageContent, bookImage.imageContent);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, imageContent);
    }
}
