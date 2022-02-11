package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.Role;
import by.tsarenkov.common.model.enumeration.UserStatus;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class User implements Serializable {

    @Id
    @Column(name = "id_user")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "surname")
    private String surname;
    @Column(name = "patronymic")
    private String patronymic;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;
    //todo chagne address
    @Column(name = "address")
    private String address;
    @Column(name = "password")
    private String password;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "books_cart",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_cart")
    )
    private List<Book> books = new ArrayList<>();
    @Enumerated(EnumType.ORDINAL)
    private Role role;
    @OneToMany
    private List<Payment> payments = new ArrayList<>();
    @Column(name = "status")
    private UserStatus status;
    @Column(name = "code")
    private String code;
}
