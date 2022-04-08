package by.tsarenkov.common.model.entity;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.util.Date;
import java.util.*;

@Entity
@Table(name ="discount")
@Proxy(lazy = false)
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_discount")
    private Long id;
    @Column(name = "start_date")
    private Date startDate;
    @Column(name = "end_date")
    private Date endDate;
    @Column(name = "name")
    private String name;
    @Column(name = "discount_factor")
    private double discountFactor;
    @ManyToMany(fetch = FetchType.EAGER)
    @ToString.Exclude
    @JsonIgnoreProperties("discounts")
    @JoinTable(name = "discount_books",
            joinColumns = @JoinColumn(name = "id_discount"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private Set<Book> books = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Discount discount = (Discount) o;
        return Double.compare(discount.discountFactor, discountFactor) == 0
                && Objects.equals(id, discount.id)
                && Objects.equals(startDate, discount.startDate)
                && Objects.equals(endDate, discount.endDate)
                && Objects.equals(name, discount.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, startDate, endDate, name, discountFactor);
    }
}
