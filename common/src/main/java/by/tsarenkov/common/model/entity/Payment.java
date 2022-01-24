package by.tsarenkov.common.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Collection;

@Entity
@Table(name = "payment")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_payment")
    private Long idPayment;
    @Column(name = "amount")
    private long amount;
    @Column(name = "count")
    private long count;
    @Column(name = "date")
    private Calendar calendar;
    @ManyToOne
    private User user;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "payment_books",
            joinColumns = @JoinColumn(name = "id_payment"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private Collection<Book> books;
}
