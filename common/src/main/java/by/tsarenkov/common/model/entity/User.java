package by.tsarenkov.common.model.entity;

import by.tsarenkov.common.model.enumeration.UserStatus;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

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
    private char[] password;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart cart;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "books_cart",
            joinColumns = @JoinColumn(name = "id_book"),
            inverseJoinColumns = @JoinColumn(name = "id_cart")
    )
    private Collection<Book> books;
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "id_role")
    private UserRole role;
    @OneToMany
    private Collection<Payment> payments;
    @Column(name = "status")
    private UserStatus status;
}
