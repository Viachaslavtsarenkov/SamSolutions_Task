package by.tsarenkov.common.model.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "book")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Book implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_book")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description", length = 1700)
    private String description;
    @Column(name = "price")
    private Double price;
    @Transient
    private Double discountPrice;
    @Column(name="weight")
    private double weight;
    @Column(name="published_year")
    private int publishedYear;
    @Column(name = "in_stock")
    private boolean inStock;
    @Column(name = "material_cover")
    private String materialCover;
    @Column(name = "amount_pages")
    private int amountPages;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE, orphanRemoval = true)
    @JoinColumn(name = "id_image")
    private BookImage image;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("books")
    @JoinTable(
            name = "author_book",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_author")
    )
    private Set<Author> authors = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "genre_books",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_genre")
    )
    private Set<BookGenre> genres = new HashSet<>();
    @ManyToMany(mappedBy = "books", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("books")
    private Set<Discount> discounts = new HashSet<>();
    @ManyToMany(mappedBy = "orderBooks")
    @JsonIgnore
    private Set<Order> orders = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return Double.compare(book.weight, weight) == 0 &&
                publishedYear == book.publishedYear &&
                inStock == book.inStock &&
                amountPages == book.amountPages &&
                id.equals(book.id) && name.equals(book.name) &&
                Objects.equals(description, book.description) &&
                price.equals(book.price) &&
                Objects.equals(discountPrice, book.discountPrice) &&
                Objects.equals(materialCover, book.materialCover);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description,
                price, discountPrice, weight, publishedYear,
                inStock, materialCover, amountPages);
    }
}
