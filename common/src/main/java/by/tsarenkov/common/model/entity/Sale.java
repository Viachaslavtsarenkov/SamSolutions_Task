package by.tsarenkov.common.model.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
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
@ToString
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_sale")
    private Long idSale;
    @Column(name = "start_date")
    private Date startDate;
    @Column(name = "end_date")
    private Date endDate;
    @Column(name = "name")
    private String name;
    @Column(name = "discount_factor")
    private double discountFactor;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "sale_books",
            joinColumns = @JoinColumn(name = "id_sale"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private List<Book> saleBooks = new ArrayList<>();
}
