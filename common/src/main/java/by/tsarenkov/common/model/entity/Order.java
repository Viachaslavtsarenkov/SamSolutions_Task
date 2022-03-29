package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.OrderStatus;
import by.tsarenkov.common.model.enumeration.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.paypal.api.payments.Payment;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;
import java.util.*;

@Entity
@Table(name = "orders")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_order")
    private Long id;
    @Column(name = "amount")
    private Double amount;
    @Column(name = "count")
    private long count;
    @Column(name = "date")
    private Date date;
    @Column(name = "status")
    @NotNull
    private OrderStatus status;
    @NotNull
    private String address;
    @Column(name="paymentUrl",  length = 1500)
    @NotNull
    private String paymentUrl;
    @Column(name="paymentStatus")
    private PaymentStatus paymentStatus;
    @Column(name = "paymentId")
    private String paymentId;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_user", nullable=false)
    @JsonIgnoreProperties("orders")
    @ToString.Exclude
    private User user;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @ToString.Exclude
    @JoinTable(name = "order_books",
            joinColumns = @JoinColumn(name = "id_order"),
            inverseJoinColumns = @JoinColumn(name = "id_book")
    )
    private Set<Book> orderBooks = new HashSet<>();
}
