package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Genre;
import lombok.*;
import org.hibernate.annotations.CollectionId;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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
    @Column(name = "description")
    private String description;
    @Column(name = "price")
    private double price;
    @Column(name = "in_stock")
    private boolean inStock;
    @ManyToMany
    @JoinTable(name = "author_book",
            joinColumns = @JoinColumn(name = "id_author"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private List<Author> authors = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "book_genre",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_genre")
    )
    private List<BookGenre> genre = new ArrayList<>();
    @ManyToMany
    @JoinTable(name = "books_cart",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_cart")
    )
    private List<BookGenre> cart = new ArrayList<>();
    @ManyToMany
    @JoinTable(name = "sale_books",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_sale")
    )
    private List<Sale> sales = new ArrayList<>();
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "payment_books",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_payment")
    )
    private List<Payment> payments = new ArrayList<>();
}
