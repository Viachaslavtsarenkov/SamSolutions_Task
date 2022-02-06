package by.tsarenkov.common.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name ="sale")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_sale")
    private Long idSale;
    @Column(name = "start_date")
    private Calendar startDate;
    @Column(name = "end_date")
    private Calendar endDate;
    @Column(name = "name")
    private String name;
    @Column(name = "discount_factor")
    private double discountFactor;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "sale_books",
            joinColumns = @JoinColumn(name = "id_sale"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private List<Book> books = new ArrayList<>();
}
