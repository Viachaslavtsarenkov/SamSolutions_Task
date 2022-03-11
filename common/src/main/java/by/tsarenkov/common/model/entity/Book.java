package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Genre;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CollectionId;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "book")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
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
    private double price;
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
    @Column(name="image")
    private String imageName;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "author_book",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_author")
    )
    private Set<Author> authors = new HashSet<>();
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "book_genre",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_genre")
    )
    private Set<BookGenre> genres = new HashSet<>();
    @ManyToMany(mappedBy = "saleBooks")
    @ToString.Exclude
    @JsonIgnore
    private Set<Sale> sales = new HashSet<>();
    @ManyToMany(mappedBy = "paymentBooks")
    @ToString.Exclude
    @JsonIgnore
    private Set<Payment> payments = new HashSet<>();

}
