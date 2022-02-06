package by.tsarenkov.common.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "cart")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Cart {
    @Id
    @Column(name = "id_cart")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCard;
    @OneToOne
    @JoinColumn(name = "id_user")
    private User user;
    @ManyToMany
    @JoinTable(name = "books_cart",
            joinColumns = @JoinColumn(name = "id_cart"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private List<Book> books = new ArrayList<>();
}
