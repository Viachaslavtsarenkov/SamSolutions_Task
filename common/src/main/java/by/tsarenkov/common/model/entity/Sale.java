package by.tsarenkov.common.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Collection;

@Entity
@Table(name ="sale")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Sale {
    @Id
    @Column(name = "id_sale")
    private long idSale;
    @Column(name = "start_date")
    private Calendar startDate;
    @Column(name = "end_date")
    private Calendar endDate;
    @Column(name = "name")
    private String name;
    @Column(name = "discount_factor")
    private double discountFactor;
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "sale_books",
            joinColumns = @JoinColumn(name = "id_sale"),
            inverseJoinColumns = @JoinColumn(name = "id_sale")
    )
    private Collection<Book> books;
}